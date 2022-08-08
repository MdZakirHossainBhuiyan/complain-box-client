import React, { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser(null);
        navigate('/userSignIn', {
            replace: true,
        });
    }

    return (
        <section className='header-section'>
            <div className='header-div'>
                <div className='header-user'>
                    <h5>hello, <span>{loggedInUser?.userName}</span></h5>
                </div>
                <div className='header-nav'>
                    <Link to="/home"><button className='header-navButton'>Home</button></Link>
                    <Link to="/dashboard"><button className='header-navButton'>Dashboard</button></Link>
                    <Link to="/staffList"><button className='header-navButton'>Staff List</button></Link>
                    <Link to="#"><button className='header-navButton'>Emergency Contact</button></Link>
                    <Link to="/contact"><button className='header-navButton'>Contact Us</button></Link>
                    <button onClick={handleLogout} className='logoutButton'>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Header;