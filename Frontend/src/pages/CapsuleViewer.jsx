import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import '../styles/CapsuleViewer.css';

function CapsuleViewer() {
    const { id } = useParams();
    const [capsule, setCapsule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [enteredPasscode, setEnteredPasscode] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const fetchCapsule = async () => {
            try {
                const res = await API.get(`/capsules/${id}`);
                setCapsule(res.data);
                if (!res.data.isPrivate) {
                    setIsAuthorized(true);
                }
                setLoading(false);
            } catch (err) {
                setError('Capsule not found.');
                setLoading(false);
            }
        };
        fetchCapsule();
    }, [id]);

    const handleVerifyPasscode = () => {
        if (enteredPasscode === capsule.passcode) {
            setIsAuthorized(true);
        } else {
            alert('Incorrect passcode.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!capsule) return null;

    return (
        <div className="capsule-viewer">
            {capsule.isPrivate && !isAuthorized ? (
                <div className="passcode-section">
                    <h3>This capsule is private 🔒</h3>
                    <input
                        type="text"
                        placeholder="Enter passcode"
                        value={enteredPasscode}
                        onChange={(e) => setEnteredPasscode(e.target.value)}
                    />
                    <button onClick={handleVerifyPasscode}>Unlock</button>
                </div>
            ) : (
                <div className="capsule-content">
                    <h2>{capsule.title}</h2>
                    <p>{capsule.message}</p>
                    {capsule.mediaUrls.length > 0 && (
                        <div className="media-gallery">
                            {capsule.mediaUrls.map((url, i) =>
                                url.includes('video') ? (
                                    <video key={i} src={url} controls />
                                ) : (
                                    <img key={i} src={url} alt="capsule-media" />
                                )
                            )}
                        </div>
                    )}
                    <p><strong>Unlocks on:</strong> {new Date(capsule.unlockDate).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default CapsuleViewer;
