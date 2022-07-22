import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import ComplainAndDisplay from './Components/ComplainAndDisplay/ComplainAndDisplay';
import UserSignIn from './Components/UserSignIn/UserSignIn';
import { createContext, useState } from 'react';
import ContactFormMain from './Components/ContactForm/ContactFormMain';
import DashBoard from './Components/Dashboard/DashBoard';
import PrivateOutlet from "./Components/PrivateOutlet/PrivateOutlet";
import StaffListForUser from "./Components/StaffListForUser/StaffListForUser";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<UserSignIn />} />
          <Route exact path="/signUpPage" element={<SignUp />} />
          <Route exact path="/userSignIn" element={<UserSignIn />} />
          <Route path="/*" element={<PrivateOutlet />} >
            <Route path="home" element={<ComplainAndDisplay />} />
            <Route path="staffList" element={<StaffListForUser />} />
            <Route path="contact" element={<ContactFormMain />} />
            <Route path="dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
