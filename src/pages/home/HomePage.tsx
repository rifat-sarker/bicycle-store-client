import Banner from "./Banner";
import BlogSection from "./BlogSection";
import CategorySection from "./Category";
import FeaturedBicycles from "./FeaturedBicycles";
import Footer from "./Footer";
import NewsletterSection from "./NewsLetterSection";
import OfferSection from "./OfferSection";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      <FeaturedBicycles />
      <OfferSection />
      <BlogSection />
      <NewsletterSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
