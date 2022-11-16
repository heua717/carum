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
  const buildTarget = "build3";
  const {
    isLoaded,
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "build/"+buildTarget+".loader.js",
    dataUrl: "build/"+buildTarget+".data",
    frameworkUrl: "build/"+buildTarget+".framework.js",
    codeUrl: "build/"+buildTarget+".wasm",
  });
  const navigate = useNavigate();
  // 첫번째 방법
  useImperativeHandle(ref, () => ({
    enterCloseUp,
    exitCloseUp,
    petConversation,
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
        petType: userInfo.petType,
        dailyFace: userInfo.dailyFace,
        dailyColor: userInfo.dailyColor,
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
      <button onClick={()=>reactCall["sendTokenToUnity"]()}>Send Token</button> */}
      <button onClick={()=>handleClick()}>requestFullscreen</button>
    </div>
  );
}

export default forwardRef(UnityCarum);
