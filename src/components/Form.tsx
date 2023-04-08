import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { passwordStrength } from "check-password-strength";
import * as generatePassword from "generate-password-browser";

type FormTypes = {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

type PasswordOptionsTypes = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

enum Strength {
  Empty = "",
  TooWeak = "too weak!",
  Weak = "weak",
  Medium = "medium",
  Strong = "strong",
}

const Form = ({ length, setLength, setPassword }: FormTypes) => {
  const [strength, setStrength] = useState<Strength>(Strength.Empty);
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptionsTypes>({
    length,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setLength(newValue);
      setPasswordOptions({
        ...passwordOptions,
        length: newValue,
      });
    }
  };

  const updateStrengthDisplay = () => {
    const ratingBars = document.querySelector(".rating__bars");
    let children: Element[] = [];

    if (ratingBars !== null) {
      children = [...ratingBars.children];
    }
    const updateTooWeak = () => {
      if (ratingBars !== null) {
        children.forEach((child) => {
          child.classList.remove("weak");
          child.classList.remove("medium");
          child.classList.remove("strong");
        });
        ratingBars.children[0].classList.add("too-weak");
      }
    };

    const updateWeak = () => {
      if (ratingBars !== null) {
        children.forEach((child) => {
          child.classList.remove("too-weak");
          child.classList.remove("medium");
          child.classList.remove("strong");
        });
        ratingBars.children[0].classList.add("weak");
        ratingBars.children[1].classList.add("weak");
      }
    };

    const updateMedium = () => {
      if (ratingBars !== null) {
        children.forEach((child) => {
          child.classList.remove("weak");
          child.classList.remove("too-weak");
          child.classList.remove("strong");
        });
        ratingBars.children[0].classList.add("medium");
        ratingBars.children[1].classList.add("medium");
        ratingBars.children[2].classList.add("medium");
      }
    };

    const updateStrong = () => {
      if (ratingBars !== null) {
        children.forEach((child) => {
          child.classList.remove("weak");
          child.classList.remove("medium");
          child.classList.remove("too-weak");
          child.classList.add("strong");
        });
      }
    };

    return { updateTooWeak, updateWeak, updateMedium, updateStrong };
  };

  const checkPasswordStrength = (pass: string) => {
    const strengthCheck = passwordStrength(pass);

    switch (strengthCheck.value) {
      case "Too weak":
        setStrength(Strength.TooWeak as Strength);
        updateStrengthDisplay().updateTooWeak();
        break;
      case "Weak":
        setStrength(Strength.Weak as Strength);
        updateStrengthDisplay().updateWeak();
        break;
      case "Medium":
        setStrength(Strength.Medium as Strength);
        updateStrengthDisplay().updateMedium();
        break;
      case "Strong":
        setStrength(Strength.Strong as Strength);
        updateStrengthDisplay().updateStrong();
        break;
      default:
        setStrength(Strength.Empty as Strength);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pass = generatePassword.generate(passwordOptions);

    setPassword(pass);

    checkPasswordStrength(pass);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="length">
        <p className="length__text">Character Length</p>
        <span className="length__number">{length}</span>
      </div>
      <Slider min={0} max={20} value={length} onChange={handleSliderChange} />
      <div className="checks">
        <label htmlFor="uppercase">
          <input
            onChange={() =>
              setPasswordOptions({
                ...passwordOptions,
                uppercase: !passwordOptions.uppercase,
              })
            }
            name="uppercase"
            className="checkbox"
            type="checkbox"
            id="uppercase"
          />
          Include Uppercase Letters
        </label>
        <label htmlFor="lowercase">
          <input
            onChange={() =>
              setPasswordOptions({
                ...passwordOptions,
                lowercase: !passwordOptions.lowercase,
              })
            }
            className="checkbox"
            type="checkbox"
            id="lowercase"
          />
          Include Lowercase Letters
        </label>
        <label htmlFor="numbers">
          <input
            onChange={() =>
              setPasswordOptions({
                ...passwordOptions,
                numbers: !passwordOptions.numbers,
              })
            }
            className="checkbox"
            type="checkbox"
            id="numbers"
          />
          Include Numbers
        </label>
        <label htmlFor="symbols">
          <input
            onChange={() =>
              setPasswordOptions({
                ...passwordOptions,
                symbols: !passwordOptions.symbols,
              })
            }
            className="checkbox"
            type="checkbox"
            id="symbols"
          />
          Include Symbols
        </label>
      </div>
      <div className="strength">
        <p className="strength__text">Strength</p>
        <div className="rating">
          <p className="rating__text">{strength}</p>
          <div className="rating__bars">
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
            <div className="rating__bar"></div>
          </div>
        </div>
      </div>
      <button className="button" type="submit">
        Generate
      </button>
    </form>
  );
};

export default Form;
