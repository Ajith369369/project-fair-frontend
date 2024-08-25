import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editResponseContext } from "../context/Contextshare";
import { editUserProjectApi } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";

function EditProject({ project }) {
  console.log("project: ", project);

  // EditProject.jsx is the child of MyProject.jsx which is changing the state, i.e., when EditProject.jsx edits the user project item in the list.
  const { setEditResponse } = useContext(editResponseContext);
  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    // projectImg: project.projectImage - not used to prevent complications
    projectImg: "",
  });

  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose1 = () => {
    setProjectDetails({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImg: "",
    });
    setPreview("");
    if (key == false) {
      setKey(true);
    } else {
      setKey(false);
    }
  };
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handleFile = (e) => {
    console.log(e);
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] });
  };
  console.log("projectDetails: ", projectDetails);

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

  const handleEdit = async () => {
    const { title, language, github, website, overview, projectImg } =
      projectDetails;
    console.log("projectDetails: ", projectDetails);
    // if (!projectDetails.title ||!projectDetails.language ||!projectDetails.github ||!projectDetails.website ||!projectDetails.overview ||!projectDetails.projectImg)
    if (!title || !language || !github || !website || !overview) {
      alert("Please fill the form completely.");
    } else {
      // A FormData object is created, which is used to construct a set of key/value pairs representing form fields and their values. This is particularly useful for sending data that includes files (like images) via HTTP requests.
      const reqBody = new FormData();

      // append() - add data to the object
      // Each line appends a piece of data to the FormData object. This includes the form field names (title, language, etc.) and their corresponding values.
      // The append() method adds key-value pairs to the FormData object, where the key is the form field name and the value is the content of the field.
      reqBody.append("title", title); // Postman Body > form-data
      reqBody.append("language", language); // Postman Body > form-data
      reqBody.append("github", github); // Postman Body > form-data
      reqBody.append("website", website); // Postman Body > form-data
      reqBody.append("overview", overview); // Postman Body > form-data
      preview
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", project.projectImage); // Postman Body > form-data

      // Retrieves a token from the browser's sessionStorage.
      // The token is used for authentication, verifying that the user is allowed to perform the action (adding a project).
      const token = sessionStorage.getItem("token");

      // This checks whether the token was successfully retrieved from sessionStorage.
      // If the token exists, it proceeds to set the request headers and send the data.
      if (token) {
        if (preview) {
          const reqHeader = {
            // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
            // Select form-data in body section in Postman.
            // Bearer - No other certificate is required to verify this token.
            // iat : Time atwhich token is generated.
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };
          const result = await editUserProjectApi(
            project._id,
            reqBody,
            reqHeader
          );
          console.log(
            "Result of the editUserProjectApi call to the console: ",
            result
          );
          if (result.status == 200) {
            alert("Project updated successfully.");
            handleClose();
            setEditResponse(result.data);
          } else {
            alert("Something went wrong.");
            handleClose();
          }
        } else {
          const reqHeader = {
            // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
            // Select form-data in body section in Postman.
            // Bearer - No other certificate is required to verify this token.
            // iat : Time atwhich token is generated.
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await editUserProjectApi(
            project._id,
            reqBody,
            reqHeader
          );
          console.log(
            "Result of the editUserProjectApi call to the console: ",
            result
          );
          if (result.status == 200) {
            alert("Project updated successfully.");
            handleClose();
            setEditResponse(result.data);
          } else {
            alert("Something went wrong.");
            handleClose();
          }
        }
      }
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="text-info"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projImg">
                <input
                  type="file"
                  id="projImg"
                  style={{ display: "none" }}
                  key={key}
                  onChange={(e) => handleFile(e)}
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${serverUrl}/uploads/${project?.projectImage}`
                  }
                  alt=""
                  className="w-100"
                />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={projectDetails?.title}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  className="form-control"
                  value={projectDetails?.language}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      language: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="GitHub"
                  className="form-control"
                  value={projectDetails?.github}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      github: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Website"
                  className="form-control"
                  value={projectDetails?.website}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      website: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Overview"
                  rows={4}
                  className="form-control"
                  value={projectDetails?.overview}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overview: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
