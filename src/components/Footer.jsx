import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="container-fluid bg-success p-4">
        <div className="row">
          <div className="col-md-4">
            <h4 className="text-light mb-4">
              <FontAwesomeIcon icon={faStackOverflow} className="me-2" />{" "}
              Project Fair
            </h4>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              consequatur quas ipsum enim repellendus ipsa harum provident
              sapiente, autem natus repellat porro nesciunt et veritatis
              excepturi consectetur incidunt temporibus officiis.
            </p>
          </div>
          <div className="col-md-2 d-md-flex justify-content-center">
            <div>
              <h4 className="text-light mb-4">Links</h4>
              <div className="d-flex flex-column justify-content-center">
                <Link to={"/"} style={{color:'black'}}>
                  <p>Home</p>
                </Link>
                <Link to={"/project"} style={{color:'black'}}>
                  <p>Project</p>
                </Link>
                <Link to={"/dashboard"} style={{color:'black'}}>
                  <p>Dashboard</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 ">
            <div>
              <h4 className="mb-4 text-light">Guides</h4>
              <div>
                <p>React</p>
                <p>React Bootstrap</p>
                <p>Bootswatch</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-md-flex justify-content-center">
            <div>
              <h4 className="text-light">Contact Us</h4>
              <div className="d-flex mt-4">
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Email ID"
                />
                <button className="btn btn-warning rounded-0">
                  Subscribe
                </button>
              </div>
              <div className="d-flex justify-content-between mt-4 text-light">
                <FontAwesomeIcon icon={faLinkedin} className="fa-2x" />
                <FontAwesomeIcon icon={faWhatsapp} className="fa-2x" />
                <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
                <FontAwesomeIcon icon={faTwitter} className="fa-2x" />
                <FontAwesomeIcon icon={faFacebook} className="fa-2x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
