import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"
import HomePageImg from '../../assets/HomePageImg.png';
import Instagram from '../../assets/instagram.png';

function Home() {

    

    return (
        <div className='Home'>

            <div className="slogansContainer">
                <h1 className="slogan1">Leave the thinking to us.</h1>
                <h1 className="slogan2">Brain Bank, your personalized project repository</h1>
            </div>
            

            <div className="getStartedButtonD">
                <p class="getStartedButton" role="button" onClick={getStartedButton}>Get Started</p>
            </div>


            <div className="socialsContainer">
                <img src={Instagram} alt="Instagram Image" />
            </div>

            <img className="homePageContainer" src={HomePageImg} alt="Home Page Image" />
        </div>  
    )

    function getStartedButton(e) {
        // load up the main page when created
        e.preventDefault()
        alert('get Started button was clicked');
      }


      
}

export default Home;