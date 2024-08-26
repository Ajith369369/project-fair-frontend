import React, { createContext, useState } from "react";

// Create context component
export const addResponseContext = createContext({});
export const editResponseContext = createContext({});
export const isLoginAuthContext = createContext({});

function Contextshare({ children }) {
  // Response to be shared
  const [addResponse, setAddResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});
  const [isLoginStatus, setIsLoginStatus] = useState(false);

  return (
    // Wrapping with the created context component
    // Provider tag to share the data. Shared data should be placed inside the "value" attribute as key: value pairs.
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
        <isLoginAuthContext.Provider
          value={{ isLoginStatus, setIsLoginStatus }}
        >
          {children}
        </isLoginAuthContext.Provider>
      </editResponseContext.Provider>
    </addResponseContext.Provider>
  );
}

export default Contextshare;
