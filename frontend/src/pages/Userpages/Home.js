import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import logo from '../../assets/1.jpg';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `url(${logo}) no-repeat center center fixed`,
  backgroundSize: 'cover',
};
function Home() {
    return (
        <div style={containerStyle} className="w-full">
        
            <h1>Home Page me thiyenne page wala</h1>
            <nav>
           <NavbarComponent/>
              
            </nav>
        </div>
    );
}

export default Home;
