import "./App.css";
import Header from "./components/Header";
import HamburgerMenu from "./components/HamburgerMenu";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routes
import Classes from "./components/routes/Classes";
import NumericalClasses from "./components/routes/NumericalClasses";
import ProbabilityContexts from "./components/routes/ProbabilityContexts";
import SavedOutputs from "./components/routes/SavedOutputs";

function App() {
  let [title, setTitle] = React.useState("The Randomizer");
  let [isHamShown, setIsHamShown] = React.useState(false);

  function handleHamburgerIconClick() {
    setIsHamShown((prevIsHamShown) => !prevIsHamShown);
  }

  return (
    <Router>
      <div className='App'>
        <Header
          title={title}
          handleHamClick={handleHamburgerIconClick}
          isHamShown={isHamShown}
        />
        {isHamShown && (
          <HamburgerMenu handleHamClick={handleHamburgerIconClick} />
        )}

        <Routes>
          <Route path='/' element={<Classes setTitle={setTitle} />} />
          <Route
            path='/ProbabilityContexts'
            element={<ProbabilityContexts setTitle={setTitle} />}
          />
          <Route
            path='/SavedOutputs'
            element={<SavedOutputs setTitle={setTitle} />}
          />
          <Route
            path='/Classes/:urlId'
            element={<Classes setTitle={setTitle} />}
          />
          <Route path='/Classes' element={<Classes setTitle={setTitle} />} />
          <Route
            path='/NumericalClasses'
            element={<NumericalClasses setTitle={setTitle} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
