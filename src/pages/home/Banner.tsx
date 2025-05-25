import { Carousel, Button, Typography } from "antd";
import { motion } from "framer-motion"; // For animations
import type { Variants } from "framer-motion";
import "antd/dist/reset.css"; // Ant Design styles

// import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner4.jpg";
import banner1 from "../../assets/images/banner3.jpg";

const { Title, Paragraph } = Typography;

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    height: "70vh", 
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000", 
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 51, 102, 0.6), rgba(0, 153, 51, 0.4))", // Blue-green gradient for vibrant look
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start", 
    color: "#fff",
    padding: "50px 80px",
    zIndex: 2,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%", 
    height: "65vh",
    objectFit: "cover", 
    objectPosition: "center",
    // position: "absolute",
    top: "-5%",   
    left: "-15%", 
  };

  const titleStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "64px",
    fontWeight: 800,
    marginBottom: "20px",
    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)", 
    letterSpacing: "1.5px",
  };

  const paragraphStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "20px", 
    marginBottom: "40px",
    maxWidth: "550px", 
    lineHeight: "1.6",
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: "10px",
    padding: "12px 40px", 
    height: "auto",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  };

  // Animation variants for text and button
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -150 }, // Increased slide distance
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" }, // Smoother transition
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.6, type: "spring" },
    },
  };

  // Enhanced parallax effect for images
  const imageVariants: Variants = {
    initial: { scale: 1.1, x: 0, y: 0 },
    animate: {
      scale: 1.3, 
      x: "-15%",
      y: "-5%", 
      transition: {
        duration: 6, 
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <Carousel
      autoplay
      autoplaySpeed={4000} 
      draggable
      effect="fade" 
      style={{
        position: "relative",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
        width: "100%", 
      }}
    >
      {/* Slide 1 */}
      <div style={contentStyle}>
        <motion.img
          src={banner1}
          alt="Cyclist in urban setting"
          style={imageStyle}
          variants={imageVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          style={overlayStyle}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.div variants={textVariants}>
            <Title level={1} style={titleStyle}>
              Cycle Your City
            </Title>
          </motion.div>
          <motion.div variants={textVariants}>
            <Paragraph style={paragraphStyle}>
              Transform your urban rides with our sleek, high-performance city
              bikes built for style and speed.
            </Paragraph>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Button
              type="primary"
              color="default"
              variant="solid"
              size="large"
              style={buttonStyle}
              href="/all-product"
            >
              Shop City Bikes
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide 2 */}
      <div style={contentStyle}>
        <motion.img
          src={banner2}
          alt="Mountain bike on scenic trail"
          style={imageStyle}
          variants={imageVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          style={overlayStyle}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.div variants={textVariants}>
            <Title level={1} style={titleStyle}>
              Blaze New Trails
            </Title>
          </motion.div>
          <motion.div variants={textVariants}>
            <Paragraph style={paragraphStyle}>
              Conquer rugged terrains with our durable mountain bikes, crafted
              for epic adventures.
            </Paragraph>
          </motion.div>
          <motion.div>
            <Button
              type="primary"
              color="default"
              variant="solid"
              size="large"
              style={buttonStyle}
              href="/all-product"
            >
              Shop Mountain Bikes
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Carousel>
  );
};

export default Banner;

// import { Button, Carousel } from "antd";
// import banner1 from "../../assets/images/banner1.png";
// import banner2 from "../../assets/images/banner2.png";

// const Banner = () => {
//   return (
//     <div className="hero">
//       <Carousel autoplay autoplaySpeed={3000} effect="fade">
//         {/* Slide 1 */}
//         <div className="slide">
//           <img className="banner-img" src={banner1} alt="Adventure Awaits" />
//           <div className="overlay">
//             <h1 className="hero-title">🚴‍♂️ Find Your Next Ride!</h1>
//             <p className="hero-text">Premium bicycles for every journey.</p>
//             <Button
//               color="default"
//               variant="solid"
//               size="large"
//               className="cta-button"
//             >
//               Shop Now
//             </Button>
//           </div>
//         </div>

//         {/* Slide 2 */}
//         <div className="slide">
//           <img className="banner-img" src={banner2} alt="Ride Freely" />
//           <div className="overlay">
//             <h1 className="hero-title">🌍 Ride Towards Freedom!</h1>
//             <p className="hero-text">Best-in-class cycling experience.</p>
//             <Button
//               color="default"
//               variant="solid"
//               size="large"
//               className="cta-button"
//             >
//               Discover More
//             </Button>
//           </div>
//         </div>
//       </Carousel>

//       <style>{`
//         .hero {
//           position: relative;
//           width: 100%;
//           height: 70vh;
//           overflow: hidden;
//         }

//         .slide {
//           position: relative;
//           display: flex;
//           justify-content: center;
//           justify-item:center;
//           align-items: center;
//         }

//         .banner-img {
//           width: 100%;
//           height: 70vh;
//           object-fit: cover;
//           filter: brightness(0.85);
//           transition: transform 0.3s ease-in-out;
//         }

//         .slide:hover .banner-img {
//           transform: scale(1.05);
//         }

//         .overlay {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           text-align: center;
//           color: #fff;
//           width: 80%;
//           background: rgba(0, 0, 0, 0.4);
//           padding: 20px;
//           border-radius: 12px;
//           backdrop-filter: blur(8px);
//         }

//         .hero-title {
//           font-size: 2.8rem;
//           font-weight: bold;
//           animation: fadeIn 1.5s ease-in-out;
//         }

//         .hero-text {
//           font-size: 1.4rem;
//           margin-top: 10px;
//           animation: slideUp 1.5s ease-in-out;
//         }

//         .cta-button {
//           margin-top: 15px;
//           padding: 12px 20px;
//           // font-size: 1.2rem;
//           font-weight: bold;
//           // background: linear-gradient(45deg, #ff4d4d, #ff9100);
//           // color: #fff;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease-in-out;
//           box-shadow: 0px 4px 8px rgba(255, 77, 77, 0.3);
//         }

//         .cta-button:hover {
//           transform: scale(1.05);
//           box-shadow: 0px 6px 12px rgba(255, 77, 77, 0.5);
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
