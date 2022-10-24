import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Button from "../../components/Button";

function Signup() {
  return (
    <div>
      <div>
        <span>회원가입</span>
      </div>
      <TextField required label="아이디" id="outlined-required" />
      <TextField />
      <DesktopDatePicker />
      <TextField />
      <TextField />
      <div>
        <Checkbox />
        <Button size={"medium"} variant={"light"} text={"휴대폰 인증"} />
      </div>
      <Button size={"big"} variant={"primary"} text={"가입"} />
    </div>
  );
}

export default Signup;
