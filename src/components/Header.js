import React from "react";

export default function Header(prop) {
  function getClasses() {
    return prop.isHamShown
      ? "change hamburger-container"
      : "hamburger-container";
  }

  return (
    <header className='header'>
      <div className={getClasses()} onClick={prop.handleHamClick}>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>
      <div className='header--title'>{prop.title}</div>
      <div className='header--triple_dot'></div>
    </header>
  );
}
