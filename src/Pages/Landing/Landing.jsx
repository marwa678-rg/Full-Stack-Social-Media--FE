
import React from "react"
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { PublicNavbar } from "../../Components/Navbar/PublicNavbar/PublicNavbar";
import { Footer } from "../../Components/Footer/Footer";
import { useTheme } from "../../context/ThemeContext";


export function Landing() {
  //custom hook of theme Dark / light mode
  const{theme,toggleTheme}= useTheme();
//navigate
const go = useNavigate();

//handle get started
function handleGetStarted(){
 go("/register")
}




  return (
    <>
  <section className="landing">
  <div className="landing-wrapper">

    {/* Dark mode Button🌛 */}
    <button className="landing-theme-toggle"
            onClick={toggleTheme}
    >
      {theme ==="dark" ? "🌞" :"🌛"}
    </button>

    <div className="landing-content">
      <h1>
        Connect. Share. <br /> Be Social.
      </h1>

      <p>
        Join our social platform and stay connected with friends,
        stories, and moments that matter.
      </p>
    </div>

    <div className="landing-image">
      <img
        src="/images/undraw_global-team_8jok.png"
        alt="community"
      />
    </div>
<div className="landing-actions">
 <button
      className="btn-primary"
      onClick={handleGetStarted}
    >
      Get Started
    </button>


</div>

{/* social cards */}
   <section className="social-cards-section">
  <h2 className="section-title">How Connecta Works</h2>

  <div className="social-cards">

    <div className="social-card">
      <img src="/images/undraw_group-selfie_uih0.png" alt="share" />
      <h3>Share Moments</h3>
      <p>Post photos, stories, and updates with your friends.</p>
    </div>

    <div className="social-card">
      <img src="/images/undraw_intense-feeling_4i8u.png" alt="interact" />
      <h3>React & Interact</h3>
      <p>Like, comment, and engage with posts you care about.</p>
    </div>

    <div className="social-card">
      <img src="/images/undraw_welcoming_42an.png" alt="community" />
      <h3>Build Community</h3>
      <p>Connect with people who share your interests.</p>
    </div>

  </div>
</section>


  </div>
</section>

   <Footer /> 
    </>
  );
}
