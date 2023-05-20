import React, { useEffect } from "react";
import "./ScrollToTopButton.css";
import PropTypes from "prop-types";

function ScrollToTopButton({ setIsVisible, isVisible }) {
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <img src="/assets/toTopButton.png" alt="to top button" />
    </button>
  );
}

ScrollToTopButton.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ScrollToTopButton;
