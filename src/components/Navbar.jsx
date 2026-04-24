import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-dad">DAD</span>
          <span className="navbar-logo-sub">ARCHITECTS</span>
        </Link>
        <nav className="navbar-nav">
          <Link to="/work" className="navbar-link">WORKS</Link>
          <Link to="/about" className="navbar-link">ABOUT US</Link>
          <Link to="/contact" className="navbar-link">CONTACT</Link>
        </nav>
      </div>

      <div className="navbar-taglines hide-mobile">
        <span className="navbar-tagline">ARCHITECTURE  • INTERIOR DESIGN</span>
      </div>
    </header>
  );
};

export default Navbar;
