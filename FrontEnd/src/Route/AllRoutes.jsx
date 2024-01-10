import { Route, Routes  } from "react-router-dom";
import Login from "../Components/Login";
import Feedpage from "../Page/Feedpage";

function ErrorMessage() {
    return (
      <h1 style={{color:"red" , marginTop:"100px" , fontWeight:"600" , textAlign:"center"}}>404! Page Not Found Error</h1>
    )
  }

export default function AllRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Feed" element={<Feedpage/>} />
          <Route path="*" element={<ErrorMessage/>} />
        </Routes>
      );
}
