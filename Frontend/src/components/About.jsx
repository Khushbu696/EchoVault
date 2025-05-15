import '../styles/About.css'
import Navbar from "./Navbar"
import Footer from "./Footer"

function About(){
    return(
        <>
        <Navbar/>
        <div className="about">
            <h2>About Us</h2>
            <p>
                EchoVault is dedicated to helping you preserve your memories in a unique and meaningful way. We stand for creating emotional connections through time capsules.
            </p>
        </div>

        <div className="about-mission">
            <h2>Our Mission</h2>

            <div id="content-1">
                    <h3>Empower Connections</h3>
                    <p>
                        Our mission is to empower individuals to connect with their emotions, past, and future through personalized digital time capsules.
                    </p>
                </div>

            <div className="about-mission-contianer">
                <div className="content-2">
                    <h3>Preserve Memories</h3>
                    <p>
                        We are dedicated to helping people preserve their most cherished memories and experiences in a secure and accessible way.
                    </p>
                </div>

                <div className="content-2">
                    <h3>Create Lasting Moments</h3>
                    <p>
                        At EchoVault, we believe in creating lasting moments that transcend time, allowing people to revisit special memories whenever they desire.
                    </p>
                </div>
            </div>
        </div>

        <div className="about-vision">
            <h2>Our Vision</h2>
            <p>
                To become the leading platform for capturing and sharing meaningful moments through digital time capsules, enriching lives and creating lasting legacies.
            </p>
        </div>
        <Footer/>
        </>
    )
}

export default About