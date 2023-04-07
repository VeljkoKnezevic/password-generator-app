import { useState } from "react";
import "./styles/styles.scss";
import { passwordStrength } from "check-password-strength";
import Form from "./components/Form";
import Display from "./components/Display";

const App = () => {
  const [length, setLength] = useState<number>(0);
  const [password, setPassword] = useState<string>("P4$5W0rD!");

  return (
    <main className="main">
      <h1 className="heading">Password Generator</h1>
      <Display password={password} />
      <Form setPassword={setPassword} setLength={setLength} length={length} />
    </main>
  );
};

export default App;
