import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button.jsx"; // Ensure the path matches the actual structure

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      Hi Mars
      <Button onClick={() => setCount(count + 1)}>Marsuui</Button>
      <p>Count: {count}</p>
    </>
  );
}

export default App;
