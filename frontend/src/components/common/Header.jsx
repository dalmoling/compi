import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <Link to="/" className="no-decoration logo navbar-brand">
            SASC_
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
