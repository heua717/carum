import { useLocation, useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, {
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./UnityCarum.module.css";
import { useAppSelector } from "stores/store";

function UnityCarum({}, ref) {
  const buildTarget = "build3";
  const {
    isLoaded,
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "build/" + buildTarget + ".loader.js",
    dataUrl: "build/" + buildTarget + ".data",
    frameworkUrl: "build/" + buildTarget + ".framework.js",
    codeUrl: "build/" + buildTarget + ".wasm",
  });
  const navigate = useNavigate();
  const location = useLocation();
  // 첫번째 방법
  useImperativeHandle(ref, () => ({
    enterCloseUp,
    exitCloseUp,
    petConversation,
    petCreate,
    sendDiaryWriteSignal,
    sendChangeRoomSignal,
    handleUnityStart,
    handleUnityLogout,
  }));

  const { nowRoomId } = useAppSelector((state) => state.roomInfo);
  const { userInfo } = useAppSelector((state) => state.user);

  async function enterCloseUp() {
    sendMessage("Connector", "PetCloseUp");
  }
  async function exitCloseUp() {
    sendMessage("Connector", "PetEndCloseUp");
  }
  async function petConversation(json) {
    sendMessage("Connector", "PetConversation", JSON.stringify(json));
  }
  async function petCreate(json) {
    sendMessage("Connector", "PetCreate", JSON.stringify(json));
  }

  async function sendDiaryWriteSignal() {
    sendMessage("Connector", "DiaryWrite");
  }

  async function sendChangeRoomSignal(json) {
    sendMessage("Connector", "ChangeRoom", JSON.stringify(json));
  }

  function handleSceneTransition(sceneName) {
    sendMessage("TestCanvas", "MoveSceneTo", sceneName);
  }

  const handleReactRouting = useCallback((to) => {
    navigate(to);
  }, []);

  const handleUnityStart = (json) => {
    sendMessage("Connector", "StartUnity", JSON.stringify(json));
  };

  const handleUnityLogout = () => {
    sendMessage("Connector", "Logout");
  };

  const ReactCall = function () {
    this.sendTokenToUnity = function () {
      if (!!sessionStorage.getItem("access-token")) {
        const token = {
          accessToken: sessionStorage.getItem("access-token"),
          refreshToken: sessionStorage.getItem("refresh-token"),
        };

        const storedNowRoomId = JSON.parse(localStorage.getItem("nowRoomId"));
        const storedPetInfo = JSON.parse(localStorage.getItem("petInfo"));

        const param = {
          mainRoomId: storedNowRoomId,
          token,
          petType: storedPetInfo.petType ? storedPetInfo.petType : "NONE",
          dailyFace: storedPetInfo.dailyFace,
          dailyColor: storedPetInfo.dailyColor,
        };
        sendMessage("Connector", "StartUnity", JSON.stringify(param));
      }
    };
    this.checkLogin = function () {
      if (!!sessionStorage.getItem("access-token")) {
        sendMessage("Connector", "MoveScene", "SceneD");
      }
    };
  };

  const reactCall = new ReactCall();

  useEffect(() => {
    if (!isLoaded) return;

    addEventListener("ReactRouting", handleReactRouting);
    addEventListener("handleUnityCall", (functionName) => {
      reactCall[functionName]();
    });

    return () => {
      removeEventListener("ReactRouting", handleReactRouting);
      removeEventListener("handleUnityCall");
    };
  }, [
    addEventListener,
    removeEventListener,
    handleReactRouting,
    reactCall,
    isLoaded,
  ]);

  function handleClick() {
    requestFullscreen(true);
  }

  return (
    <div
      className={
        location.pathname !== "/signup"
          ? styles.unityCarumMain
          : location.pathname === "/signup"
          ? styles.unitySignup
          : null
      }
    >
      <Unity
        className={
          location.pathname !== "/signup"
            ? `${styles.unityMain}`
            : location.pathname === "/login"
            ? `${styles.unityLogin}`
            : styles.unitySignup
        }
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
        unityProvider={unityProvider}
      />

      {/* <button onClick={()=>handleSceneTransition("SceneA")}>SceneA</button>
      <button onClick={()=>handleSceneTransition("SceneB")}>SceneB</button>
      <button onClick={()=>reactCall["sendTokenToUnity"]()}>Send Token</button> */}
      {/* <button onClick={() => handleClick()}>requestFullscreen</button> */}
    </div>
  );
}

export default forwardRef(UnityCarum);
