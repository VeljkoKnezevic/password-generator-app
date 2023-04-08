import { useState } from "react";
import "./styles/styles.scss";
import Form from "./components/Form";
import Display from "./components/Display";
import { PasswordEnum } from "./PasswordEnum";

const App = () => {
  const [length, setLength] = useState<number>(0);
  const [password, setPassword] = useState<string>(PasswordEnum.Empty);

  return (
    <main className="main">
      <h1 className="heading">Password Generator</h1>
      <Display password={password} />
      <Form setPassword={setPassword} setLength={setLength} length={length} />
    </main>
  );
};

export default App;
