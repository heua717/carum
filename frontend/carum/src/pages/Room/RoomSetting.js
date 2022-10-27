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
        //방 변경 실행
    }


    const [values, setValues] = useState({
        roomName: props.roomInfo.roomName,
        emotion:props.roomInfo.emotionTag,
      })
    
      //console.log(values.emotion);
      const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
      }

      
      useEffect(()=>{

      },[])
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
        onChange={handleChange('id')} 
      />
      
      <div className={styles.header}>
        <span>감정</span>
      </div>
      <div className={styles.emotionTag}>
      <Grid  container spacing={{ xs: 2}} columns={{ xs: 2 }}>
    <Grid xs={2}  >
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("angry") ? null : styles.unchecked}`} src={angryImg} alt="emotion"></img>
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("sad") ? null : styles.unchecked}`} src={sadImg} alt="emotion"></img>
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("happy") ? null : styles.unchecked}`} src={happyImg} alt="emotion"></img>
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("worry") ? null : styles.unchecked}`} src={worryImg} alt="emotion"></img>
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("peace") ? null : styles.unchecked}`} src={peaceImg} alt="emotion"></img>
      <img className={`${styles.emotionImg} ${
                values.emotion.includes("surprise") ? null : styles.unchecked}`} src={surpriseImg} alt="emotion"></img>
    </Grid>
</Grid>
</div>
      <Button onClick={roomSettingChange} size={"big"} variant={"primary"} text={"수정"} />
    </div>
    )
}


export default RoomSetting;