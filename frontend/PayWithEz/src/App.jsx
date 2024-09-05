import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import PayementGateway from "./components/PayementGateway";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/transfer" element={<PayementGateway/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
