import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({state}) => {
    const {userName} = state.userLoadData;

    return (
        <section className='header-section'>
            <div className='header-div'>
                <div className='header-user'>
                    <h5>hello, <span>{userName}</span></h5>
                </div>
                <div className='header-nav'>
                    <button className='header-navButton'>Dashboard</button>
                    <button className='header-navButton'>Staff List</button>
                    <button className='header-navButton'>Contact Us</button>
                </div>
                <div className='header-nav logoutButton'>
                    <Link to="/userSignIn"><button>Logout</button></Link>
                </div>
            </div>
        </section>
    );
};

export default Header;