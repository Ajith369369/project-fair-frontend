import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import proImg1 from "../assets/profile-image.png";
import { profileUpdateApi } from "../services/allApi";
import { serverUrl } from "../services/serverUrl";

function Profile() {
  const [open, setOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: "",
  });

  // Conditionally render the profile image.
  const [existingImage, setExistingImage] = useState("");

  const [preview, setPreview] = useState("");
  const [updateStatus, setUpdateStatus] = useState({});

  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const { username, email, password, github, linkedin, profile } =
      userDetails;
    if (!github || !linkedin) {
      toast.info("Please fill the form completely.");
    } else {
      // A FormData object is created, which is used to construct a set of key/value pairs representing form fields and their values. This is particularly useful for sending data that includes files (like images) via HTTP requests.
      const reqBody = new FormData();

      // append() - add data to the object
      // Each line appends a piece of data to the FormData object. This includes the form field names (username, email, etc.) and their corresponding values.
      // The append() method adds key-value pairs to the FormData object, where the key is the form field name and the value is the content of the field.
      reqBody.append("username", username); // Postman Body > form-data
      reqBody.append("email", email); // Postman Body > form-data
      reqBody.append("password", password); // Postman Body > form-data
      reqBody.append("github", github); // Postman Body > form-data
      reqBody.append("linkedin", linkedin); // Postman Body > form-data
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingImage); // Postman Body > form-data

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
            // iat : Time at which token is generated.
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };
          const result = await profileUpdateApi(reqBody, reqHeader);
          console.log(
            "Result of the profileUpdateApi call to the console: ",
            result
          );
          if (result.status == 200) {
            toast.success("Profile updated successfully.");
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));
            setUpdateStatus(result.data);
            // handleClose();
          } else {
            toast.error("Something went wrong.");
            // handleClose();
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
          const result = await profileUpdateApi(reqBody, reqHeader);
          console.log(
            "Result of the profileUpdateApi call to the console: ",
            result
          );
          if (result.status == 200) {
            toast.success(
              "Profile updated successfully (Without uploaded image)."
            );
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));
            setUpdateStatus(result.data);
            // handleClose();
          } else {
            toast.error("Something went wrong.");
            // handleClose();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    }
  }, [userDetails.profile]);

  console.log("preview: ", preview);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        ...userDetails,
        username: user.username,
        email: user.email,
        password: user.password,
        github: user.github,
        linkedin: user.linkedin,
      });
      setExistingImage(user.profile);
    }
  }, [updateStatus]);

  console.log("userDetails: ", userDetails);
  console.log("userDetails.profile: ", userDetails.profile);

  return (
    <>
      <div
        className="shadow p-4 mb-5"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="d-flex mt-3">
          <h4>Profile</h4>
          <div className="ms-auto">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-outline-primary"
            >
              {open ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} />
              )}
            </button>
          </div>
        </div>

        <Collapse in={open}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor="profileImg">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profileImg"
                  onChange={(e) => handleFile(e)}
                />
                {existingImage == "" ? (
                  <img
                    src={preview ? preview : proImg1}
                    alt=""
                    width={"180px"}
                    height={"180px"}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src={
                      preview
                        ? preview
                        : `${serverUrl}/uploads/${existingImage}`
                    }
                    alt=""
                    width={"180px"}
                    height={"180px"}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="GitHub"
                className="form-control"
                value={userDetails.github}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, github: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="LinkedIn"
                className="form-control"
                value={userDetails.linkedin}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, linkedin: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success w-100" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </Collapse>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default Profile;
