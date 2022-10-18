import "./App.css";
import { BrouserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrouserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrouserRouter>
    </div>
  );
}

export default App;
