import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";


import Home from "./app/home/home";
import Alerts from "./app/alerts/alerts";
import Corecareplan from "./app/corecareplan/corecareplan";
import Doctorconnect from "./app/doctorconnect/doctorconnect";
import Medibot from "./app/medibot/medibot";
import Mothercare360 from "./app/mothercare360/mothercare360";
import Wellnessinsights from "./app/wellnessinsights/wellnessinsights";
import Notfound from "./app/notfound/notfound";
import { ReactNode } from "react";
import Authentication from "./components/authentication/authentication";
import Loading from "./components/Loading/Loading";


export default function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading/>;
  }

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/authentication" element={<Authentication/>} />

          <Route path="/alerts" element={<PrivateRoute><Alerts/></PrivateRoute>}/>
          <Route path="/corecareplan" element={<PrivateRoute><Corecareplan/></PrivateRoute>}/>
          <Route path="/doctorconnect" element={<PrivateRoute><Doctorconnect/></PrivateRoute>}/>
          <Route path="/medibot" element={<PrivateRoute><Medibot/></PrivateRoute>}/>
          <Route path="/mothercare360" element={<PrivateRoute><Mothercare360/></PrivateRoute>}/>
          <Route path="/wellnessinsights" element={<PrivateRoute><Wellnessinsights/></PrivateRoute>}/>


          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </Router>
    </>
  );
}


function PrivateRoute({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/authentication" />;
  }
  return children;
}

