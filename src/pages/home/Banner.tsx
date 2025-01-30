import { Carousel } from "antd";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "80%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Banner = () => {
  
  return (
    <Carousel autoplay autoplaySpeed={2000}  draggable>
      <div>
        <h3 style={contentStyle}>
          <img style={{ width: "100%", height: "80vh" }} src={banner1} alt="" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img style={{ width: "100%", height: "80vh" }} src={banner2} alt="" />
        </h3>
      </div>
    </Carousel>
  );
};

export default Banner;
