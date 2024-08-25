import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //Remove existing user details from session storage.
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");

    //navigate to home
    navigate("/");
  };

  return (
    <>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className="text-light">
            <Link
              to={"/"}
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              <h4>
                <FontAwesomeIcon icon={faStackOverflow} className="fa-2x" />
                Project Fair
              </h4>
            </Link>
          </Navbar.Brand>
          <button onClick={handleLogout} className="btn btn-warning rounded-0">
            <FontAwesomeIcon icon={faPowerOff} className="me-2" />
            Logout
          </button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
