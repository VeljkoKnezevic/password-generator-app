import { useEffect, useState } from "react";
import { PasswordEnum } from "../PasswordEnum";

type DisplayTypes = {
  password: string;
};

const Display = ({ password }: DisplayTypes) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (password) {
      timeout = setTimeout(() => {
        if (clicked) setClicked(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [clicked]);

  const handleCopyButtonClick = () => {
    if (password !== PasswordEnum.Empty) {
      setClicked(true);
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="display">
      <p
        className={`display__text ${
          password === "P4$5W0rD!" ? "display__text--empty" : ""
        }`}
      >
        {password}
      </p>
      {clicked ? <div className="copied">Copied</div> : ""}
      <button onClick={handleCopyButtonClick} type="button">
        <img
          className="display__image"
          src="/assets/images/icon-copy.svg"
          alt="Copy password"
        />
      </button>
    </div>
  );
};

export default Display;
