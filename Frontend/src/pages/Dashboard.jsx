import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css'

function Dashboard() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const filteredCapsules = capsules.filter((capsule) => {
    if (filter === 'all') return true;
    return filter === 'delivered' ? capsule.isUnlocked : !capsule.isUnlocked;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this capsule?')) return;

    try {
      await API.delete(`/capsules/${id}`);
      setCapsules((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert('Failed to delete capsule.');
    }
  };

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await API.get('/capsules/my');
        setCapsules(res.data);
      } catch (err) {
        console.error('Failed to fetch capsules', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Capsules</h1>
        <Link to="/create" className="new-capsule-btn">
          + New Capsule
        </Link>
      </div>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="delivered">Delivered</option>
        <option value="scheduled">Scheduled</option>
      </select>

      {loading ? (
        <p>Loading capsules...</p>
      ) : capsules.length === 0 ? (
        <p>You haven't created any capsules yet.</p>
      ) : (
        <div className="capsules-grid">
          {filteredCapsules.map((capsule) => (
            <div key={capsule._id} className="capsule-card">
              <h4 className="capsule-title">{capsule.title}</h4>
              <p className="capsule-meta">
                <strong>To:</strong> {capsule.recipientEmail}
              </p>
              <p className="capsule-meta">
                <strong>Unlocks:</strong>{' '}
                {new Date(capsule.unlockDate).toLocaleString()}
              </p>
              <p className={capsule.isUnlocked ? 'delivered' : 'scheduled'}>
                Status: {capsule.isUnlocked ? 'Delivered' : 'Scheduled'}
              </p>

              <Link to={`/capsules/${capsule._id}`} className="view-link">
                View
              </Link>

              <button className='delete-btn' onClick={() => handleDelete(capsule._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;