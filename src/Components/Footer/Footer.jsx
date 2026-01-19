

import React from 'react'
import"./footer.css";
import { FaRegCopyright } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className='public-footer'>
      <div className='footer-container'>

        <div className='footer-brand'>
          <h3>Connecta.</h3>
          <p>
            Asocial platform to connect , share and build real communities.
          </p>
        </div>

<div className='footer-links'>
  <a href="#features">Features</a>
  <a href="#community">Community</a>
  <a href="#Login">Login</a>
  <a href="#Get Started">Get Started</a>
</div>


<div className='footer-bottom'>
  <FaRegCopyright />{new Date().getFullYear()} Connecta. All rights reserved
</div>

      </div>

    </footer>
  )
}
