import React from "react";
import { Link } from "react-router-dom";

export default function HamburgerMenu(prop) {
  return (
    <div className='hamburgerMenu'>
      <Link
        to='/Classes'
        className='hamburger-item'
        onClick={prop.handleHamClick}
      >
        Classes
      </Link>
      <Link
        to='/NumericalClasses'
        className='hamburger-item'
        onClick={prop.handleHamClick}
      >
        Numerical Classes
      </Link>
      <Link
        to='/ProbabilityContexts'
        className='hamburger-item'
        onClick={prop.handleHamClick}
      >
        Probability Contexts
      </Link>
      <Link
        to='/SavedOutputs'
        className='hamburger-item'
        onClick={prop.handleHamClick}
      >
        Saved Outputs
      </Link>
    </div>
  );
}
