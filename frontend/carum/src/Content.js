import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from './Main'
import Test from './Test'
function Content() {
    return (
    <div className="Test">
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
    );
  }
  export default Content;