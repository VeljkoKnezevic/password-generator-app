import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type FormTypes = {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ length, setLength, setPassword }: FormTypes) => {
  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setLength(newValue);
    }
  };

  return (
    <form className="form">
      <div className="length">
        <p className="length__text">Character Length</p>
        <span className="length__number">{length}</span>
      </div>
      <Slider min={0} max={20} value={length} onChange={handleSliderChange} />
      <div className="checks">
        <label htmlFor="uppercase">
          <input className="checkbox" type="checkbox" id="uppercase" />
          Include Uppercase Letters
        </label>
        <label htmlFor="lowercase">
          <input className="checkbox" type="checkbox" id="lowercase" />
          Include Lowercase Letters
        </label>
        <label htmlFor="numbers">
          <input className="checkbox" type="checkbox" id="numbers" />
          Include Numbers
        </label>
        <label htmlFor="symbols">
          <input className="checkbox" type="checkbox" id="symbols" />
          Include Symbols
        </label>
      </div>
      <div className="strength">
        <p className="strength__text">Strength</p>
        <div className="rating">
          <p className="rating__text"></p>
          <div className="rating__bars">
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
          </div>
        </div>
      </div>
      <button className="button" type="button">
        Generate
      </button>
    </form>
  );
};

export default Form;
