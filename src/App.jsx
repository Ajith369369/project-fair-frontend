import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { isLoginAuthContext } from "./context/Contextshare";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PagenotFound from "./pages/PagenotFound";
import Project from "./pages/Project";

function App() {
  const { isLoginStatus } = useContext(isLoginAuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/dashboard"
          element={isLoginStatus ? <Dashboard /> : <PagenotFound />}
        />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
