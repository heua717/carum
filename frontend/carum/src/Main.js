import { useMediaQuery } from "react-responsive"
function Main() {
  const isPc = useMediaQuery({
    query : "(min-width:1024px)"
  });
  const isTablet = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023px)"
  });
  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  return (
  <div className="Main">
    메인입니당
    <div>
    {isPc && <p>HI PC</p>}
    {isTablet && <p>HI Tablet</p>}
    {isMobile && <p>HI Mobile</p>}
  </div>
  </div>
  );
}
export default Main;
