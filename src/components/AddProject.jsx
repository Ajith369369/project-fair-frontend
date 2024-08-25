import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addResponseContext } from "../context/Contextshare";
import { addProjectApi } from "../services/allApi";

function AddProject() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: "",
  });
  console.log(projectDetails);
  const { setAddResponse } = useContext(addResponseContext);

  // This function is typically used in a file upload feature, where users select an image or document file, and the application needs to capture and store that file in its state for further processing, like previewing the image or uploading it to a server.
  // The function, handleFile, is designed to handle the event when a user selects a file (e.g., an image) through an input element in a form.
  // handleFile is an event handler function that takes an event object e as its parameter. This event object is automatically passed to the function when the user interacts with the file input.
  const handleFile = (e) => {
    // This logs the entire event object to the console. The event object contains a lot of information, including details about the event type, target element, and more.
    console.log(e);

    // e.target refers to the element that triggered the event, which in this case is an <input type="file"> element.
    // e.target.files is a FileList object that contains all the files selected by the user. If the input allows multiple files, this will be a list of files. If it allows only a single file, e.target.files will contain just one file. This logs the FileList object, showing all the files that were selected.
    console.log(e.target.files);

    // e.target.files[0] accesses the first file in the FileList. Since users can select multiple files, this would be the first file in the list.
    // This logs the first selected file object, which contains information like the file name, size, type, and other metadata about the file.
    console.log(e.target.files[0]);

    // This line updates the projectDetails state with the newly selected file.
    // The spread operator { ...projectDetails } creates a shallow copy of the current projectDetails state. This ensures that all existing properties in projectDetails are retained.
    // projectImg: e.target.files[0] adds or updates the projectImg property with the first selected file.
    // setProjectDetails is then called to update the state, replacing the old projectDetails with the new version that includes the selected image file.
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] });
  };

  // If the user selects the same file again, the onChange event might not trigger because the value hasn’t technically changed from the input's perspective.
  // This can be problematic if the user wants to reselect or cancel the file and select the same file again.
  const handleClose1 = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
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
    setShow(false), handleClose1();
  };

  // This function gathers user input from a form, packages it into a FormData object (including an image file), and sends it to a backend API.
  // It checks that all required fields are filled out and includes an authentication token in the request headers. If everything is correct, it submits the data to the backend and logs the response.
  const handleAdd = async () => {
    // Using object destructuring to extract the values for title, language, github, website, overview, and projectImg from the projectDetails object.
    const { title, language, github, website, overview, projectImg } =
      projectDetails;

    // if statement checks if any of the required fields (title, language, github, website, overview, projectImg) are empty. If any field is missing, it triggers an alert to inform the user to complete the form.
    if (
      !title ||
      !language ||
      !github ||
      !website ||
      !overview ||
      !projectImg
    ) {
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
      reqBody.append("projectImg", projectImg); // Postman Body > form-data

      // Retrieves a token from the browser's sessionStorage.
      // The token is used for authentication, verifying that the user is allowed to perform the action (adding a project).
      const token = sessionStorage.getItem("token");

      // This checks whether the token was successfully retrieved from sessionStorage.
      // If the token exists, it proceeds to set the request headers and send the data.
      if (token) {
        // This defines the headers for the HTTP request
        const reqHeader = {
          // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
          // Select form-data in body section in Postman.
          // Bearer - No other certificate is required to verify this token.
          // iat : Time atwhich token is generated.
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        // Calls the addProjectApi function, passing in the reqBody (form data) and reqHeader (headers).
        const result = await addProjectApi(reqBody, reqHeader);
        console.log(
          "Result of the addProjectApi call to the console: ",
          result
        );

        if (result.status == 200) {
          setAddResponse(result.data);
          alert("Project added successfully.");
          handleClose();
        } else {
          alert("Something went wrong.");
          handleClose();
        }
      }
    }
  };

  const handleShow = () => setShow(true);

  // The useEffect hook here is used to automatically generate and update a preview URL for an image whenever the projectDetails.projectImg value changes, allowing the user to see a preview of the image they've selected.
  // This pattern is often used in file upload components where users can select an image from their device, and the component provides a visual preview of the selected image before the form is submitted.
  // The useEffect hook is being used to update a preview image whenever the projectDetails.projectImg value changes.
  // Dependency Array [projectDetails.projectImg]: The useEffect hook runs whenever the value of projectDetails.projectImg changes. The dependency array ensures that the effect only runs when this specific value is updated.
  useEffect(() => {
    // This checks if projectDetails.projectImg has a truthy value (i.e., it is not null, undefined, or an empty value). If projectDetails.projectImg exists, it proceeds to create a preview URL for the image.
    if (projectDetails.projectImg) {
      // If projectDetails.projectImg contains an image file, URL.createObjectURL() is used to generate a temporary URL for that image. This URL is a string that represents the image, allowing it to be displayed in the browser.
      // setPreview is then called with this URL, updating the component's state to hold the preview image's URL.
      setPreview(URL.createObjectURL(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

  // key attribute can call onChange()

  return (
    <>
      <button className="btn btn-success rounded-0" onClick={handleShow}>
        Add Project
      </button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Add Project</Modal.Title>
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
                {/* This <img> element displays a preview image if one is available (preview). If no preview is available, it falls back to displaying a default image from a specified URL. The image is styled to take up the full width of its container.
                This pattern is useful for scenarios where you want to show a placeholder image until the user uploads or selects an image. */}
                <img
                  src={
                    preview
                      ? preview
                      : "https://clipart-library.com/data_images/308973.png"
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
                {/* 
                
                The <input> element you provided is a controlled input in a React component.

                type="text":
                  This specifies that the input field is a text input, meaning the user can type in any text.

                placeholder="Title":
                
                  This attribute provides a hint to the user of what the input is for. The word "Title" appears in the input field when it is empty, giving the user a clue that they should enter the project title here.

                className="form-control":
                  This adds the Bootstrap class form-control to the input field, which styles the input to look like a standard Bootstrap form input. It gives the input a consistent look and feel in line with Bootstrap's design system.

                value={projectDetails?.title}:
                  The value attribute is set to projectDetails?.title. This means the input field's current value is controlled by the title property of the projectDetails state.
                  The projectDetails?.title uses optional chaining (?.) to safely access title even if projectDetails is null or undefined. This helps prevent errors that might occur if projectDetails is not yet defined.
                  The input field will always display the current value of projectDetails.title. If projectDetails.title changes, the input field will update automatically to reflect that new value.

                onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}:
                  The onChange event handler is triggered whenever the user types into the input field.
                  The function takes the event object e as a parameter. e.target.value represents the current value of the input field (i.e., what the user has typed).
                  The setProjectDetails function is used to update the projectDetails state. It spreads the existing projectDetails object using { ...projectDetails } to copy all of its current properties.
                  The title property is then updated with the new value from the input field: title: e.target.value.
                  This effectively updates the projectDetails.title property with whatever the user types into the input field, keeping the state in sync with the input.

                */}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Language"
                  className="form-control"
                  value={projectDetails.language}
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
                  value={projectDetails.github}
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
                  value={projectDetails.website}
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
                  value={projectDetails.overview}
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
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
