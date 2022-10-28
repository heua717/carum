import styles from "./Room.module.css";
import TopNav from "components/TopNav";
import RoomCarousel from "./RoomCarousel";
import { useState } from "react";

function Room() {
  const [roomInfo,setRoomInfo]=useState({
    mainRoomId: 1,
    rooms : [
    {
      roomId:1,
      roomName:"안식처",
      color:"red",
      emotionTag:["sad","happy"],
      isDefault: true,
    },
    {
      roomId:2,
      roomName:"내방",
      color:"blue",
      emotionTag:["sad"],
      isDefault: false,
    },
    {
      roomId:3,
      roomName:"니방",
      color:"yellow",
      emotionTag:["happy"],
      isDefault: false,
    },
    {
      roomId:4,
      roomName:"분노에가득찬방",
      color:"red",
      emotionTag:["sad","happy","peace"],
      isDefault: false,
    },
  ]});
  return (
  <div>
    <TopNav text="방 이동" />
    <RoomCarousel roomInfo={roomInfo} setRoomInfo={setRoomInfo}/>
  </div>)
}

export default Room;
