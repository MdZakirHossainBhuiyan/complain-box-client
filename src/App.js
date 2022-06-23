import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import IdentityOption from './Components/IdentityOption/IdentityOption';
import Login from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import ComplainAndDisplay from './Components/ComplainAndDisplay/ComplainAndDisplay';
import UserSignIn from './Components/UserSignIn/UserSignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<IdentityOption />} />
        <Route exact path="/signInPage" element={<Login />} />
        <Route exact path="/signUpPage" element={<SignUp />} />
        <Route exact path="/userSignIn" element={<UserSignIn />} />
        <Route exact path="/home" element={<ComplainAndDisplay />} />
      </Routes>
      {/* <Switch>
        <Route exact path="/">
          <IdentityOption />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <SignUp />
        </Route>
        <Route exact path="/home">
          <ComplainAndDisplay />
        </Route>
      </Switch> */}
    </Router>
  );
}

export default App;
