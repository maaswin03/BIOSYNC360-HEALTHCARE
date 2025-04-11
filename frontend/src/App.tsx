import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/home/home";
import Alerts from "./app/alerts/alerts";
import Corecareplan from "./app/corecareplan/corecareplan";
import Doctorconnect from "./app/doctorconnect/doctorconnect";
import Medibot from "./app/medibot/medibot";
import Mothercare360 from "./app/mothercare360/mothercare360";
import Wellnessinsights from "./app/wellnessinsights/wellnessinsights";
import Notfound from "./app/notfound/notfound";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/alerts" element={<Alerts/>}/>
          <Route path="/corecareplan" element={<Corecareplan/>}/>
          <Route path="/doctorconnect" element={<Doctorconnect/>}/>
          <Route path="/medibot" element={<Medibot/>}/>
          <Route path="/mothercare360" element={<Mothercare360/>}/>
          <Route path="/wellnessinsights" element={<Wellnessinsights/>}/>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
