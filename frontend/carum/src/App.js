import "./App.css";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useEffect, useCallback} from "react";


function App() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/build2.loader.js",
    dataUrl: "build/build2.data",
    frameworkUrl: "build/build2.framework.js",
    codeUrl: "build/build2.wasm",
  });
  const navigate = useNavigate();
  function handleSceneTransition(sceneName) {
    console.log("move to "+sceneName)
    sendMessage("TestCanvas", "MoveSceneTo", sceneName);
  }

  const handleReactRouting = useCallback((to) => {
    console.log("move to :"+to);
    navigate(to)
  }, []);

  useEffect(() => {
    addEventListener("ReactRouting", handleReactRouting);
    return() => {
      removeEventListener("ReactRouting", handleReactRouting);
      console.log("remove")
    }
  }, [addEventListener, removeEventListener, handleReactRouting]);

  return (
  <div className="App">
      <Unity style={{
        width:'100%',
        height:'35vh',
        justifySelf:'center'
      }} unityProvider={unityProvider} />
      <button onClick={()=>handleSceneTransition("SceneA")}>SceneA</button>
      <button onClick={()=>handleSceneTransition("SceneB")}>SceneB</button>

  </div>
  );
}
// function App() {
//   return <div className="App"></div>;
// }

export default App;
