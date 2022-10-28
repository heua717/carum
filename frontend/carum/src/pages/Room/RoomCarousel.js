import Carousel from "react-material-ui-carousel"
import styles from "./RoomCarousel.module.css"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import doorImg from "assets/door.png"
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import starImg from "assets/star.png";
import starOutlineImg from "assets/star-outline.png"
import { useNavigate } from "react-router-dom";
import Modal from "components/modal/Modal"
import RoomSetting from "./RoomSetting"

function RoomCarousel(props){
  //console.log(props.mainRoomId);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRoom, setSelectedRoom]=useState(0);
    const [selectedRoomInfo, setSelectedRoomInfo]=useState(
        {
            roomName:"default",
            emotionTag:[],
        }
    );
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    useEffect(()=>{
        props.roomInfo.rooms.forEach(element => {
            if(element.roomId===selectedRoom){
                setSelectedRoomInfo(
                    {
                        roomName: element.roomName,
                        emotionTag: element.emotionTag,
                    }
                )

                openModal();
            }
            
        });


    },[selectedRoom,props.roomInfo.rooms])
    return  (
        <div className={styles.carousel}>
      <Carousel  
      animation="slide"
      navButtonsAlwaysVisible={true}
      indicators={false}
      autoPlay={false}
      fullHeightHover={false}
      >
        {props.roomInfo.rooms.map((item, i) => (
          <Item key={i} item={item} openModal={openModal} setSelectedRoom={setSelectedRoom} mainRoomId={props.roomInfo.mainRoomId} setRoomInfo={props.setRoomInfo} roomInfo={props.roomInfo} />
        ))}
      </Carousel>
      <Modal open={modalOpen} close={closeModal} header="방 설정" ><RoomSetting roomId={selectedRoom} selectedRoomInfo={selectedRoomInfo} roomInfo={props.roomInfo} setRoomInfo={props.setRoomInfo}/></Modal>
    </div>
    )
}

function Item(props) {
    const navigate = useNavigate();
    const changeRoom = (roomId) => {
        //roomId에 따라 유니티 방 바꿔주기 실행하가
        console.log(roomId)
        //끝나면 main으로 돌아가라
        navigate(`/main`)
      };
    
      const mainRoomChange=()=>{
        props.setRoomInfo({...props.roomInfo, mainRoomId:props.item.roomId})
      }
    return (
      <div >
        <div>
        <img
          className={styles.starImage}
          src={props.item.roomId===props.mainRoomId? starImg:starOutlineImg}
          alt={props.item.roomName}
          onClick={mainRoomChange}
        />
        </div>
        <img
          className={styles.doorImage}
          src={doorImg}
          alt={props.item.roomName}
          onClick={() => changeRoom(props.item.roomId)}
        />
        <div className={styles.roomInfo}>
        <div><Emotion emotionTag ={props.item.emotionTag} /></div>
        <div className={styles.roomDiv}>
            <div></div>
            <div className={styles.roomName}>
            {props.item.roomName}
            </div>
            <div className={styles.button}>
            <Button
            variant="contained"
            size="medium"
            onClick={()=>{
                props.setSelectedRoom(props.item.roomId);
                
            }}
          >정보 수정</Button>
          </div>
        </div>
        </div>
      </div>
    )
  }

  function Emotion(props) {
    const emotionLink= props.emotionTag.map(function(item){ 
        if (item==="sad")
            return sadImg;
            else if(item==="worry")
            return worryImg;
            else if(item==="angry")
            return angryImg;
            else if(item==="happy")
            return happyImg;
            else if(item==="surprise")
            return surpriseImg;
            else if(item==="peace")
            return peaceImg;
    })
    return (
      <div >
       {emotionLink.map((item, i) => (
        <img key={i} src={item} alt="빈이미지" className={styles.emotionImage} />
        //<img src={angryImg} alt="빈이미지" className={styles.emotionImage} />
        ))}
      </div>
    )
  }
  
export default RoomCarousel;