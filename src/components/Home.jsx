import React from "react";
import "../css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-container__content">
        <h1 className="home-container__title">Welcome to FleetCo</h1>
        <p className="home-container__description">
          Your trusted partner for reliable and efficient fuel delivery
          services. At FleetCo, we ensure that your fleet is always fueled and
          ready to go. Experience unmatched service and quality with every drop.
        </p>
      </div>
    </div>
  );
}

export default Home;
