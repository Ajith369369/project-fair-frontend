import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.gif";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import { allProjectApi } from "../services/allApi";

function Project() {
  const [isToken, setIsToken] = useState("");
  const [allProject, setAllProject] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getAllProject = async (searchKey) => {
    const result = await allProjectApi(searchKey);
    await setAllProject(result.data);
  };

  console.log(allProject);

  useEffect(() => {
    getAllProject(searchKey);
  }, [searchKey]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(sessionStorage.getItem("token"));
    }
    getAllProject();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <h1 className="text-center mt-5">All Projects</h1>
        {/* All projects when the user is logged in. */}
        {isToken ? (
          <div>
            <div className="row my-4">
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Technologies"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  rotation={90}
                  style={{
                    marginTop: "12px",
                    marginLeft: "-30px",
                    color: "grey",
                  }}
                />
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row my-5">
              {/* allProject?.length > 0 uses optional chaining. This prevents errors if allProject is null or undefined. If allProject is not defined, allProject?.length will return undefined rather than throwing an error.
              This is useful in cases where allProject might not be immediately available (e.g., while waiting for data to load). */}
              {allProject?.length > 0 ? (
                allProject?.map((item) => (
                  <div key={item._id} className="col-md-4 p-4">
                    <ProjectCard project={item} />
                  </div>
                ))
              ) : (
                <p className="text-danger ms-5">No projects to show.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="row mt-5 w-100">
            <div className="col-md-4"></div>
            <div className="col-md-4 p-4 d-flex flex-column justify-content-center align-items-center">
              <img src={loginImage} alt="" width={"70%"} height={"300px"} />
              <h4 className="mt-5 text-center">
                Please{" "}
                <Link to={"/login"} className="text-danger">
                  Login
                </Link>{" "}
                to Explore More Projects
              </h4>
            </div>
            <div className="col-md-4"></div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Project;
