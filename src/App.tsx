import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/index";

function App() {
  return (
    <div>
      <Navbar />
      <div className="py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
