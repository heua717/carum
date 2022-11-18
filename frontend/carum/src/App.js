import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Main from "./pages/Main/Main";
import CheckAuth from "components/CheckAuth";
import UnityCarum from "components/unity/UnityCarum";
import { useRef } from "react";
import styles from "./App.module.css";
import logoWithName from "assets/logoWithName.png";
import { useAppDispatch, useAppSelector } from "stores/store";

function App() {
  const childRef = useRef(null);

  const { curPage } = useAppSelector((state) => state.page);

  const enterCloseUp = () => {
    childRef.current.enterCloseUp();
  };
  const exitCloseUp = () => {
    childRef.current.exitCloseUp();
  };
  const petConversation = (json) => {
    childRef.current.petConversation(json);
  };

  const petCreate = (json) => {
    childRef.current.petCreate(json);
  };

  const sendDiaryWriteSignal = () => {
    childRef.current.sendDiaryWriteSignal();
  };

  const sendChangeRoomSignal = (json) => {
    childRef.current.sendChangeRoomSignal(json);
  };

  const handleUnityStart = (json) => {
    childRef.current.handleUnityStart(json);
  };

  return (
    <div
      className={
        curPage !== "login" && curPage !== "signup" ? styles.appContainer : null
      }
    >
      {curPage === "login" ? (
        <header className={styles.header}>
          <img className={styles.logoImg} src={logoWithName} alt="logo"></img>
        </header>
      ) : null}
      <Router>
        <div
          className={curPage === "login" ? styles.unityMobile : styles.unity}
        >
          <UnityCarum ref={childRef} />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <CheckAuth>
                <Main
                  exitCloseUp={exitCloseUp}
                  enterCloseUp={enterCloseUp}
                  petConversation={petConversation}
                  petCreate={petCreate}
                  childRef={childRef}
                  sendChangeRoomSignal={sendChangeRoomSignal}
                  sendDiaryWriteSignal={sendDiaryWriteSignal}
                  handleUnityStart={handleUnityStart}
                />
              </CheckAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
