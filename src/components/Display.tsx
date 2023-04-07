type DisplayTypes = {
  password: string;
};

const Display = ({ password }: DisplayTypes) => {
  return (
    <div className="display">
      <p
        className={`display__text ${
          password === "P4$5W0rD!" ? "display__text--empty" : ""
        }`}
      >
        {password}
      </p>
      <button type="button">
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
