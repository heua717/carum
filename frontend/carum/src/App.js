import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
