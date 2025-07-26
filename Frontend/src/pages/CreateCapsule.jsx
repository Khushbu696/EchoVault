import { useState } from 'react';
import API from '../services/api';
import { uploadToCloudinary } from '../services/cloudinary';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCapsule.css';

function CreateCapsule() {
    const [form, setForm] = useState({
        title: '',
        message: '',
        recipientEmail: '',
        unlockDate: '',
    });

    const [mediaFiles, setMediaFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleMediaChange = (e) => {
        setMediaFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const mediaUrls = [];

            for (const file of mediaFiles) {
                const url = await uploadToCloudinary(file);
                mediaUrls.push(url);
            }

            const capsuleData = { ...form, mediaUrls };
            await API.post('/capsules', capsuleData);
            navigate('/dashboard');
        } catch (err) {
            console.error("Error while creating capsule:", err);
            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while creating the capsule.";
            setError(message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="create-capsule-container">
            <h2>Create New Capsule</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Write your message here..."
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="email"
                    name="recipientEmail"
                    placeholder="Recipient Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="unlockDate"
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaChange}
                />

                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Create Capsule'}
                </button>
            </form>
        </div>
    );
}

export default CreateCapsule;