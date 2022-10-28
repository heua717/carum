import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import styles from "./RoomSetting.module.css"
import { useEffect, useState } from "react";
import sadImg from "assets/sad.svg";
import angryImg from "assets/angry.svg";
import worryImg from "assets/worry.svg";
import happyImg from "assets/happy.svg";
import surpriseImg from "assets/surprise.svg";
import peaceImg from "assets/peace.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function RoomSetting(props){
    const roomSettingChange=()=>{
      //감정 태그 변환
      const arr=[];
      if(emotionChecked.sad)arr.push("sad");
      if(emotionChecked.worry)arr.push("worry");
      if(emotionChecked.angry)arr.push("angry");
      if(emotionChecked.happy)arr.push("happy");
      if(emotionChecked.surprise)arr.push("surprise");
      if(emotionChecked.peace)arr.push("peace");
      setValues({...values, emotion: arr, send:true})
        //방 변경 실행
        //console.log(emotionChecked);
        //console.log(values);
        //방 변경은 setValues가 비동기라 useEffect로 처리해야할 것 같다

    }

    

    const [values, setValues] = useState({
        send:false,
        roomName: props.selectedRoomInfo.roomName,
        emotion:props.selectedRoomInfo.emotionTag,
      })
    
    
      
      const [emotionChecked,setEmotionChecked]=useState({
        send:false,
        sad:props.selectedRoomInfo.emotionTag.includes('sad'),
        angry:props.selectedRoomInfo.emotionTag.includes('angry'),
        worry:props.selectedRoomInfo.emotionTag.includes('worry'),
        happy:props.selectedRoomInfo.emotionTag.includes('happy'),
        surprise:props.selectedRoomInfo.emotionTag.includes('surprise'),
        peace:props.selectedRoomInfo.emotionTag.includes('peace'),
      })
      //console.log(values.emotion);
      const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
      }

      const emotionClick=(emotion)=>{
        //console.log(emotion+ emotionChecked[emotion]);
        setEmotionChecked({...emotionChecked,[emotion]:!emotionChecked[emotion]})
        
      }
      // useEffect(()=>{
      //   props.selectedRoomInfo.emotionTag.map((item,idx)=>{
      //     if (item==="sad")
      //       emotionChecked.sad=true;
      //       else if(item==="worry")
      //       emotionChecked.worry=true;
      //       else if(item==="angry")
      //       emotionChecked.angry=true;
      //       else if(item==="happy")
      //       emotionChecked.happy=true;
      //       else if(item==="surprise")
      //       emotionChecked.surprise=true;
      //       else if(item==="peace")
      //       emotionChecked.peace=true;
      //   })
      //   console.log(emotionChecked);
      //   //return () => {}
      // },[props.selectedRoomInfo.emotionTag,emotionChecked])

      useEffect(()=>{
        //console.log(emotionChecked);
        
      },[emotionChecked])

      useEffect(()=>{
        if(values.send){
          console.log(values);
          setValues({...values,send:false})
          return ()=>{}
        }
        //send 빼고 나머지 전부 보내면 된다
      },[values])
    return(
        <div className={styles.container}>
      <div className={styles.header}>
        <span>방 이름</span>
      </div>
      <TextField 
        className={styles.input} 
        required 
        label="방 이름" 
        id="outlined-required" 
        value={values.roomName} 
        onChange={handleChange('roomName')} 
      />
      
      <div className={styles.header}>
        <span>감정</span>
      </div>
      <div className={styles.emotionTag}>
      <Grid  container spacing={{ xs: 2}} columns={{ xs: 2 }}>
    <Grid xs={2}  >
      <img className={`${styles.emotionImg} ${
                emotionChecked.angry ? null : styles.unchecked}`} src={angryImg} alt="emotion" onClick={()=>{emotionClick("angry")}}></img>
      <img className={`${styles.emotionImg} ${
                emotionChecked.sad ? null : styles.unchecked}`} src={sadImg} alt="emotion" onClick={()=>{emotionClick("sad")}}></img>
      <img className={`${styles.emotionImg} ${
                emotionChecked.happy ? null : styles.unchecked}`} src={happyImg} alt="emotion" onClick={()=>{emotionClick("happy")}}></img>
      <img className={`${styles.emotionImg} ${
                emotionChecked.worry ? null : styles.unchecked}`} src={worryImg} alt="emotion" onClick={()=>{emotionClick("worry")}}></img>
      <img className={`${styles.emotionImg} ${
                emotionChecked.peace ? null : styles.unchecked}`} src={peaceImg} alt="emotion" onClick={()=>{emotionClick("peace")}}></img>
      <img className={`${styles.emotionImg} ${
                emotionChecked.surprise ? null : styles.unchecked}`} src={surpriseImg} alt="emotion" onClick={()=>{emotionClick("surprise")}}></img>
    </Grid>
</Grid>
</div>
      <Button onClick={roomSettingChange} size={"big"} variant={"primary"} text={"수정"} />
    </div>
    )
}


export default RoomSetting;