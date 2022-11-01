import logo from "../assets/logo.png";

function Header() {
  return (
    <div
      style={{
        width: "100%",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B2AAE3",
      }}
    >
      <img
        src={logo}
        style={{ width: "32px", height: "32px" }}
        alt="logo"
      ></img>
    </div>
  );
}

export default Header;
