import { useState } from "react";
import Slider from "rc-slider";
import "./styles/styles.scss";
import "rc-slider/assets/index.css";

const App = () => {
  const [length, setLength] = useState<number>(0);

  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setLength(newValue);
    }
  };

  return (
    <main className="main">
      <h1 className="heading">Password Generator</h1>
      <div className="display">
        <p className="display__text">P4$5W0rD!</p>
        <button type="button">
          <img
            className="display__image"
            src="/assets/images/icon-copy.svg"
            alt="Copy password"
          />
        </button>
      </div>

      <form className="form">
        <div className="length">
          <p className="length__text">Character Length</p>
          <span className="length__number">{length}</span>
        </div>
        <Slider min={0} max={20} value={length} onChange={handleSliderChange} />
        <div className="checks">
          <label htmlFor="uppercase">
            <input type="checkbox" id="uppercase" />
            Include Uppercase Letters
          </label>
          <label htmlFor="lowercase">
            <input type="checkbox" id="lowercase" />
            Include Lowercase Letters
          </label>
          <label htmlFor="numbers">
            <input type="checkbox" id="numbers" />
            Include Numbers
          </label>
          <label htmlFor="symbols">
            <input type="checkbox" id="symbols" />
            Include Symbols
          </label>
        </div>
        <div className="strength">
          <p className="strength__text">Strength</p>
        </div>
        <button className="button" type="button">
          Generate
        </button>
      </form>
    </main>
  );
};

export default App;
