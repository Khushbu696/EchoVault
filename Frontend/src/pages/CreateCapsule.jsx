import { useState } from 'react';
import API from '../services/api';
import { uploadToCloudinary } from '../services/cloudinary';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCapsule.css'

function CreateCapsule() {
    const [form, setForm] = useState({
        title: '',
        message: '',
        recipientEmail: '',
        unlockDate: '',
        isPrivate: false,
        passcode: '',
    });

    const [mediaFiles, setMediaFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleMediaChange = (e) => {
        setMediaFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        console.log("Submitting capsule with form data:", form); 

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
            // setError('Failed to create capsule');
            console.error("Error while creating capsule:", err);

        // Try to extract meaningful error message
        const message =
            err.response?.data?.message || // Custom message from server
            err.message ||                 // Generic JS Error message
            "Something went wrong while creating the capsule."; // Fallback

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
            <div className="checkbox-group">
                <input
                    type="checkbox"
                    name="isPrivate"
                    checked={form.isPrivate}
                    onChange={handleChange}
                />
                <label>Make this capsule private (requires passcode)</label>
            </div>
            {form.isPrivate && (
                <input
                    type="text"
                    name="passcode"
                    placeholder="Set a passcode"
                    onChange={handleChange}
                />
            )}
            <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
            />

            {error && <p>{error}</p>}
            <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Create Capsule'}
            </button>
        </form>
    </div>
);


}

export default CreateCapsule;
