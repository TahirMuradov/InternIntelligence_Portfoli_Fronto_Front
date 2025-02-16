"use client"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BackToTopButton:React.FC=()=> {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return showButton ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 md:bottom-10 right-6 md:right-10 p-4 md:p-5 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md hover:shadow-lg transition-all ease-in-out duration-300 hover:-translate-y-1"
    >
      <FontAwesomeIcon icon={faArrowUp} size="lg" />
    </button>
  ) : null;
}
export default BackToTopButton;