import '../styles/Contact.css'
import Navbar from "./Navbar"
import Footer from "./Footer"

function Contact() {
    return (
        <>
            <Navbar />
            <div className="contact">
                <h2>Get in Touch with EchoVault</h2>
                <p>
                    Reach out to us for creating and scheduling your digital time capsules.
                </p>
            </div>

            <form className="contact-form">
                <div className="name-fields">
                    <input type="text" placeholder="First Name*" required />
                    <input type="text" placeholder="Last Name" />
                </div>
                <input type="email" placeholder="Email*" required />
                <textarea placeholder="Your Message*" required></textarea>
                <button type="submit">Join Us</button>
            </form>
            <Footer />
        </>
    )
}

export default Contact