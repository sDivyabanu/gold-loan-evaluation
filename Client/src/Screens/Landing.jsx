import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import Home from "../assets/Landing/Home.svg";
import Contact from "../assets/Landing/Contact.svg";
import phone from "../assets/Landing/phone-outline.svg";
import mail from "../assets/Landing/material-symbols_mail-outline.svg";
import imag from "../assets/Comments/Frame 4.svg";

function Landing() {
  function Signout() {
    localStorage.clear();
    window.location.href = "/Login";
  }

  return (
    <div className="relative font-sans text-gray-900 bg-white">
      {/* Navbar */}
      <nav className="h-16 bg-black text-white flex justify-between items-center px-4 shadow-md z-10 sticky top-0">
        <img src={Home} className="w-6" alt="Home" />
        <div className="flex items-center gap-6 text-sm">
          {localStorage.getItem("Role") === "USER" ? (
            <>
              <Link to="/Book">Book Appointment</Link>
              <Link to="/Dashboard">My Dashboard</Link>
              <span className="cursor-pointer">Contact Us</span>
              <span
                className="cursor-pointer hover:text-red-400"
                onClick={Signout}
              >
                Signout
              </span>
              <img src={Contact} className="w-5" alt="Contact" />
            </>
          ) : (
            <>
              <Link to="/Admin/Appointment">All Appointment</Link>
              <Link to="/Admin/loan">Loan Application</Link>
              <span className="cursor-pointer">Contact Us</span>
              <span
                className="cursor-pointer hover:text-red-400"
                onClick={Signout}
              >
                Signout
              </span>
              <img src={Contact} className="w-5" alt="Contact" />
            </>
          )}
        </div>
      </nav>

      
      <section className="flex flex-col items-center justify-center text-center gap-6 py-16 px-6 bg-gradient-to-br from-yellow-50 to-white">
        <h1 className="text-5xl font-semibold leading-tight max-w-4xl">
          Get your Gold evaluated with <span className="text-yellow-600">Trust</span> and <span className="text-yellow-600">Transparency</span>
        </h1>
        <p className="text-xl max-w-2xl">“Book an appointment today and get your gold professionally evaluated”</p>
        <Link to="/Book">
          <button className="px-10 py-3 bg-yellow-600 text-white text-lg rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105">
            Book an Appointment
          </button>
        </Link>
      </section>

    
      <section className="flex flex-col lg:flex-row px-10 py-16 gap-10">
    
        <div className="w-full lg:w-2/3 flex flex-col gap-14 relative translate-x-16 animate-fade-in-up">
          {[
            "Apply for a loan",
            "Book an Appointment",
            "Gold Evaluation",
            "View Evaluation",
            "Accept or Reject",
            "Apply for a loan"
          ].map((title, index) => (
            <div key={index} className="relative flex items-start gap-6 group">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold z-10 shadow-lg">
                {index + 1}
              </div>
              <div className="transition-transform duration-700 ease-in-out group-hover:scale-[1.02] group-hover:translate-x-1">
                <h3 className="text-3xl font-medium leading-tight tracking-tight group-hover:text-yellow-600 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-md text-gray-600 mt-1">{
                  index === 1 ? "Schedule your gold evaluation online"
                    : index === 3 ? "See the estimated value on your dashboard"
                    : index === 4 ? "Decide if you accept the value"
                    : "Visit your bank and apply for a loan"
                }</p>
              </div>
              
              {index < 5 && (
                <div className="absolute left-7 top-16 w-0.5 bg-black h-36 animate-pulse-slow rounded-full"></div>
              )}
            </div>
          ))}
        </div>

      
        <div className="w-full lg:w-1/3 bg-gray-100 rounded-3xl p-4 h-[60rem] flex flex-col items-center overflow-y-auto shadow-inner -translate-x-4 animate-fade-in-left">
          <h3 className="text-xl font-semibold mb-4 text-center">Customer Reviews</h3>
          <div className="flex flex-col gap-2 items-center w-full px-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <img
                src={imag}
                alt={`Review ${idx + 1}`}
                key={idx}
                className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

    
      <footer className="bg-black text-white text-sm py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <span>About Us</span>
          <span>|</span>
          <span>FAQ's</span>
          <span>|</span>
          <span>Terms & Conditions</span>
          <span>|</span>
          <span>Privacy Policy</span>
        </div>
        <div className="flex justify-center gap-10 mb-4">
          {[1, 2, 3].map((num) => (
            <div className="flex items-center gap-2" key={num}>
              <img src={phone} className="w-4" alt="Phone" />
              <span>+91 9899045677</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mb-2">
          <img src={mail} className="w-4" alt="Mail" />
          <span>helloworld123@gmail.com</span>
        </div>
        <p className="text-center text-xs mt-4">&copy; 2025 nameeeeeeee. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
