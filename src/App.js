import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
}

export default App;
