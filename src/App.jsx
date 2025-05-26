import { BrowserRouter } from "react-router-dom";
import Login from "./pages/public/login";
import Sidebar from "./components/ui/sidebar";
import Navbar from "./components/ui/navbar";
import Layout from "./pages/private/_layout";
import RoutesComponents from "./routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesComponents />
    </BrowserRouter>
  );
}

export default App;
