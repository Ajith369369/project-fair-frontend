import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/register`, reqBody, "");
};

// login
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody, "");
};

// add project
// uploaded content requests need header.
export const addProjectApi = async (reqBody, reqHeader) => {
  return await commonApi(
    "POST",
    `${serverUrl}/add-project`,
    reqBody,
    reqHeader
  );
};

// home project
export const homeProjectApi = async () => {
  return await commonApi("GET", `${serverUrl}/home-project`, "", "");
};

// all project
export const allProjectApi = async (searchKey) => {
  return await commonApi(
    "GET",
    `${serverUrl}/all-project?search=${searchKey}`,
    "",
    ""
  );
};

// user project
// reqHeader for getting token, userId
export const userProjectApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/user-project`, "", reqHeader);
};

// remove project
export const removeUserProjectApi = async (id) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/remove-user-project/${id}`,
    {},
    ""
  );
};

// edit project
export const editUserProjectApi = async (id, reqBody, reqHeader) => {
  return await commonApi(
    "PUT",
    `${serverUrl}/edit-project/${id}`,
    reqBody,
    reqHeader
  );
};

// update profile
export const profileUpdateApi = async (reqBody, reqHeader) => {
  console.log('Inside profileUpdateApi.')
  return await commonApi(
    "PUT",
    `${serverUrl}/update-profile`,
    reqBody,
    reqHeader
  );
};
