import React from "react";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import SuccessStories from "../components/SucessStories";
import HowItWorks from "../components/HowItWorks";
import PremimumMembership from"../components/PremimumMembership";
import Plans from "../components/Plan";

// import MobileAppPromo from "../components/MobileAppPromo";


const LandingPage = () => (
  <div>
    <HeroSection />
    <WhyChooseUs />
    <SuccessStories />
    <HowItWorks />
   <PremimumMembership />
    <Plans />
    {/* <MobileAppPromo /> */}
  </div>
);

export default LandingPage;
