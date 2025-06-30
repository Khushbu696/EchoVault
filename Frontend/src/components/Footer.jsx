import '../styles/Footer.css'

function Footer() {
    return (
        <>
            <div className="footer">
                <h3>EchoVault</h3>
                <div className="footer-items">
                    <div><a href="/" className="footer-link">HOME</a></div>
                    <div><a href="/about_us" className="footer-link">ABOUT US</a></div>
                    <div><a href="/contact_us" className="footer-link">CONTACT US</a></div>
                </div>
                <p>&copy; 2025 EchoVault. All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer