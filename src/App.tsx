import { Button } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const loc = useLocation();
  const route = loc.pathname.split("/")[1];

  return (
    <div className="App">
      <div className="fixed top-0 z-10 flex justify-between w-full px-2 py-4 overflow-y-auto bg-white sm:justify-center">
        <Link className="px-1 py-1" to="/">
          <Button variant={route === "" ? "contained" : "text"}>Home</Button>
        </Link>
        <Link className="px-1 py-1" to="/people">
          <Button variant={route === "people" ? "contained" : "text"}>
            People
          </Button>
        </Link>
        <Link className="px-1 py-1" to="/starships">
          <Button variant={route === "starships" ? "contained" : "text"}>
            Starships
          </Button>
        </Link>
        <Link className="px-1 py-1" to="/planets">
          <Button variant={route === "planets" ? "contained" : "text"}>
            Planets
          </Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
