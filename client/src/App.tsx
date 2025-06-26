import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import InputSearch from "./components/InputSearch";
import Navbar from "./components/NavBar";

function App() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Outlet />;
  }

  return (
    <>
      <InputSearch />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
