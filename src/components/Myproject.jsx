import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import EditProject from "../components/EditProject";
import {
  addResponseContext,
  editResponseContext,
} from "../context/Contextshare";
import { removeUserProjectApi, userProjectApi } from "../services/allApi";

function Myproject() {
  // Data which is to be changed in the parent MyProject.jsx by the child AddProject.jsx/EditProject.jsx.
  const { addResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);

  const [userProject, setUserProject] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token");
    // This defines the headers for the HTTP request
    const reqHeader = {
      // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
      // Select form-data in body section in Postman.
      // Bearer - No other certificate is required to verify this token.
      // iat : Time atwhich token is generated.
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const result = await userProjectApi(reqHeader);
    setUserProject(result.data);
  };
  console.log("userProject: ", userProject);

  const handleDelete = async (id) => {
    const result = await removeUserProjectApi(id);
    if (result.status == 200) {
      setDeleteStatus(true);
    }
  };

  // Whenever the values of addResponse, editResponse, or deleteStatus changes, getUserProject() is called.
  useEffect(() => {
    getUserProject();
    console.log("useEffect() called!");
    setDeleteStatus(false);
  }, [addResponse, editResponse, deleteStatus]);

  return (
    <>
      <div className="shadow p-md-5 p-3">
        <div className="d-flex mt-4">
          <h4 className="text-success me-auto">My Project</h4>
          <AddProject />
        </div>

        {userProject?.length > 0 ? (
          userProject?.map((item) => (
            <div
              key={item.id}
              className="p-3 mt-4 rounded-2 d-flex"
              style={{ backgroundColor: "lightgray" }}
            >
              <h5>{item.title}</h5>
              <div className="d-flex ms-auto align-items-center">
                <EditProject project={item} />
                <Link to={item.website} target="_blank">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="ms-3 text-warning"
                  />
                </Link>
                <Link to={item.github} target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="ms-3 text-success"
                  />
                </Link>
                <FontAwesomeIcon
                  onClick={() => handleDelete(item._id)}
                  icon={faTrash}
                  className="ms-3 text-danger"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">No project added yet</p>
        )}
      </div>
    </>
  );
}

export default Myproject;
