import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>MyMarket</h2>
          <p>Buy & Sell products easily at the best price.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/add-product">Sell Product</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <a href="/">Help Center</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MyMarket | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;