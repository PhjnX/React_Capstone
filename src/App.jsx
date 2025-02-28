import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
      <div>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Các thành phần khác của app */}

        
      </div>
    </>
  );
}

export default App;
