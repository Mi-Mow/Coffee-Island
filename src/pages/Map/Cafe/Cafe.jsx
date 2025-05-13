import { useLocation } from "react-router-dom";
import "./Cafe.scss";

function Cafe() {
  const location = useLocation();
  const { cafe } = location.state || {};
  return (
    <>
      <div className="cafe">
        <section className="cafe-info">{cafe.name_zh}</section>
        <section className="recommend"></section>
      </div>
    </>
  );
}

export default Cafe;
