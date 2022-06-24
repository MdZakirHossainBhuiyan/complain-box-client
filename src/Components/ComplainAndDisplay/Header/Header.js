import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <section className='header-section'>
            <div className='header-div'>
                <div className='header-user'>
                    <h5>hello, <span>{loggedInUser?.userName}</span></h5>
                </div>
                <div className='header-nav'>
                    <Link to="/home"><button className='header-navButton'>Home</button></Link>
                    <Link to="/dashboard"><button className='header-navButton'>Dashboard</button></Link>
                    <button className='header-navButton'>Staff List</button>
                    <Link to="/contact"><button className='header-navButton'>Contact Us</button></Link>
                </div>
                <div className='header-nav logoutButton'>
                    <Link to="/userSignIn"><button>Logout</button></Link>
                </div>
            </div>
        </section>
    );
};

export default Header;