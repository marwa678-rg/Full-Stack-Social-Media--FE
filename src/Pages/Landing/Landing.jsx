
import React from "react"
import "./landing.css";
import { useNavigate } from "react-router-dom";


export function Landing() {
//navigate
const go = useNavigate();

//handle get started
function handleGetStarted(){
 go("/register")
}




  return (
    <section className="landing">
      <div className="landing-content">
        <h1>
          Connect. Share. <br /> Be Social.
        </h1>

        <p>
          Join our social platform and stay connected with friends,
          stories, and moments that matter.
        </p>

        <div className="landing-actions">
          <button  className="btn-primary"
          onClick={handleGetStarted}
          >
            Get Started
          </button>
          
        </div>
      </div>
    </section>
  );
}
