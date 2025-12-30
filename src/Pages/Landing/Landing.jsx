
import React from "react"
import "./landing.css";
import { useNavigate } from "react-router-dom";


export function Landing() {
//navigate
const go = useNavigate();
//get token to check
const token = localStorage.getItem("token");
//handle get started
function handleGetStarted(){
  if(token){
    go("/feed");
  }else{
    go("/register");
  }
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
