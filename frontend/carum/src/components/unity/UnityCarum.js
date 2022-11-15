import { useNavigate } from "react-router-dom";
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
  const {
    isLoaded,
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "build/build3.loader.js",
    dataUrl: "build/build3.data",
    frameworkUrl: "build/build3.framework.js",
    codeUrl: "build/build3.wasm",
  });
  const navigate = useNavigate();
  // 첫번째 방법
  useImperativeHandle(ref, () => ({
    enterCloseUp,
    exitCloseUp,
    petConversation,
  }));

  const { nowRoomId } = useAppSelector((state) => state.roomInfo);
  async function enterCloseUp() {
    sendMessage("Connector", "PetCloseUp");
  }
  async function exitCloseUp() {
    sendMessage("Connector", "PetEndCloseUp");
  }
  async function petConversation(json) {
    sendMessage("Connector", "PetConversation", JSON.stringify(json));
  }

  function handleSceneTransition(sceneName) {
    console.log("move to " + sceneName);
    sendMessage("TestCanvas", "MoveSceneTo", sceneName);
  }

  const handleReactRouting = useCallback((to) => {
    console.log("move to :" + to);
    navigate(to);
  }, []);

  const ReactCall = function () {
    this.sendTokenToUnity = function () {
      console.log("토큰보낸다");
      const token = {
        accessToken: sessionStorage.getItem("access-token"),
        refreshToken: sessionStorage.getItem("refresh-token"),
      };
      const param = {
        mainRoomId: nowRoomId,
        token,
      };

      sendMessage("Connector", "StartUnity", JSON.stringify(param));
    };

    this.closeUpPet = function () {
      alert("클로즈업");
    };
  };

  const reactCall = new ReactCall();

  useEffect(() => {
    if (!isLoaded) return;

    addEventListener("ReactRouting", handleReactRouting);
    addEventListener("handleUnityCall", (functionName) => {
      console.log("인자:" + functionName);
      reactCall[functionName]();
    });

    return () => {
      removeEventListener("ReactRouting", handleReactRouting);
      removeEventListener("handleUnityCall");
      console.log("remove");
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
    <div className={styles.unityCarum}>
      <Unity
        className={styles.unity}
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
        unityProvider={unityProvider}
      />

      {/* <button onClick={()=>handleSceneTransition("SceneA")}>SceneA</button>
      <button onClick={()=>handleSceneTransition("SceneB")}>SceneB</button>
      <button onClick={()=>reactCall["sendTokenToUnity"]()}>Send Token</button>
      <button onClick={()=>handleClick()}>requestFullscreen</button> */}
    </div>
  );
}

export default forwardRef(UnityCarum);
