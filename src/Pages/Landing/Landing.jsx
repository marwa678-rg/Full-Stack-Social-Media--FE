
import "./landing.css";
import { Link } from "react-router-dom";

export function Landing() {
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
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-outline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
