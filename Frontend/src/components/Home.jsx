import '../styles/Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <Navbar/>
      <div className="home">
        <h1>Send Messages to the Future</h1>
        <p>
          EchoVault lets you preserve memories, thoughts, and moments—
          delivered at just the right time.
        </p>

        <div className="btn">
          <Link to="/sign_up">Get Started</Link>
        </div>
      </div>

      <div className="home-features">
        <h2>Key Features</h2>
        <div className="home-features-container">
          <div className="home-features-content">
            <h3>Personalized Time Capsules</h3>
            <p>
              Create unique digital time capsules containing personal messages, photos, or videos, tailored to your liking. Share with loved ones or schedule for future delivery.
            </p>
          </div>

          <div className="home-features-content">
            <h3>Secure Storage</h3>
            <p>
              Your memories are safe with us. Echovault ensures secure storage and delivery of your digital time capsules, portecting your precious moments.
            </p>
          </div>

          <div className="home-features-content">
            <h3>Scheduled Deliveries</h3>
            <p>
              Set schedules for your digital time capsules to be securely delivered at defined future dates. Surprise yourself or others with heartfelt messages.
            </p>
          </div>
        </div>
      </div>

      <div className="home-experience">
        <h2>Experience EchoVault Today!</h2>
        <p id="home-exp">
          Discover the magic of creating unforgettable time capsules with EchoVault. Capture your emotions, share precious memories, and relive moments with secure sharing.
        </p>

        <div className="home-experience-container">
          <div className="home-experience-content">
            <div className="number">1</div>
            <p>
              Create emotional time capsules that preserve memories for a lifetime. Share with loved ones or save them as surprises for yourself.
            </p>
          </div>

          <div className="home-experience-content">
            <div className="number">2</div>
            <p>
              Personalize your messages, photos, and videos to create lasting connections and reminisce about special moments form the past.
            </p>
          </div>

          <div className="home-experience-content">
            <div className="number">3</div>
            <p>
              Schedule deliveries of your time capsules to mark important dates or events, ensuring that your messages reach the intended recipients on time.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home;
