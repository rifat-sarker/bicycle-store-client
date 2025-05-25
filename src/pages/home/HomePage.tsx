import Banner from "./Banner";
import CategorySection from "./Category";
import FeaturedBicycles from "./FeaturedBicycles";
import Footer from "./Footer";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <FeaturedBicycles />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
