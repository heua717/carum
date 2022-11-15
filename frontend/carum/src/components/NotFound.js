import { useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" ? (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          페이지가 없습니다.
        </h2>
      ) : null}
    </div>
  );
}

export default NotFound;
