import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import '../styles/CapsuleViewer.css';

function CapsuleViewer() {
    const { id } = useParams();
    const [capsule, setCapsule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCapsule = async () => {
            try {
                const res = await API.get(`/capsules/${id}`);
                setCapsule(res.data);
                setLoading(false);
            } catch (err) {
                setError('Capsule not found or has been deleted.');
                setLoading(false);
            }
        };
        fetchCapsule();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!capsule) return null;

    const currentTime = new Date();
    const unlockTime = new Date(capsule.unlockDate);
    const isUnlocked = unlockTime <= currentTime;

    return (
        <div className="capsule-viewer">
            {!isUnlocked ? (
                <div className="locked-message">
                    <h3>⏳ This capsule is scheduled to unlock on:</h3>
                    <p>{unlockTime.toLocaleString()}</p>
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

                    <p><strong>Unlocked on:</strong> {unlockTime.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default CapsuleViewer;