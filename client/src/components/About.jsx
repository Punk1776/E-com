import React from "react";
import "../components/About.css";
import "font-awesome/css/font-awesome.min.css";
export const About = () => {
  return (
    <div>
      <div className="About">
        <h2>About Us</h2>
        <p>
          QUANTUM THREADS CO. is dedicated to bringing you high-quality and
          Christian-friendly clothing with items featuring nice and funny slogans.
        </p>
      </div>

      <div className="Mission">
        <h2>Our Mission</h2>
        <p>
          QUANTUM THREADS CO. is on a mission to provide you with clothing that
          not only looks great but also reflects our commitment to quality and
          Christian values. Our mission is to bring joy and laughter through
          fashion.
        </p>
      </div>

      <div className="Meet">
        <h2>Meet the Team</h2>
        <p>
         Freddy Guerra , Matthew Miller, Samuel Narayan and Matthew Chappelle
        </p>
      </div>

      <div className="Touch">
        <h2>Get in Touch</h2>
        <p>
          We'd love to hear from you! Feel free to reach out to us via email or
          through our social media channels.
        </p>
      </div>

      <div className="with">
        <h2>Connect with Us</h2>
        {/* Add your connection section here with font-awesome icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61554475867695" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
          
          <a href="https://www.instagram.com/quantum_threads_co/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};