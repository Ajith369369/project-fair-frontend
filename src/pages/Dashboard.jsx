import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Myproject from "../components/Myproject";
import Profile from "../components/Profile";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {

    // Both key and value are strings in sessionStorage
    // This code checks if there is an existingUser stored in sessionStorage. If existingUser is found, it retrieves the username from the stored object and sets it in the component's state using setUsername.
    // sessionStorage is a web storage object that stores data for the duration of the page session (i.e., until the browser/tab is closed).
    // If existingUser is found, sessionStorage.getItem("existingUser") returns the stored value, which is a JSON string.
    // JSON.parse() converts this JSON string back into a JavaScript object.
    // After the JSON string is parsed into an object, .username accesses the username property of that object.
    if (sessionStorage.getItem("existingUser")) {
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);

    // JSON.stringify() is a method in JavaScript that converts a JavaScript object into a JSON string.
    // JSON.parse() is a method in JavaScript that converts a JSON string into a JavaScript object.
  }
  },[])

  return (
    <>
      <Header />
      <div className="container-fluid">
        <h3 className="my-4 ms-3">
          Welcome <span className="text-warning">{username}</span>
        </h3>
        <div className="row mt-5">
          <div className="col-md-8 px-md-5">
            <Myproject />
          </div>
          <div className="col-md-4 px-md-5">
            <Profile />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
