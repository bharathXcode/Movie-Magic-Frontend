import React from "react";
import { Link } from "react-router-dom";
import pizzalanding1 from "../images/pizzalanding1.png";
import restaurant_eating from "../images/restaurant_eating.jpg";
import restaurant_eating2 from "../images/restaurant_eating2.jpg";
import pizza from "../images/Pizza.png";
import burger from "../images/Burger.png";
import drinks from "../images/Drinks.png";
import combo from "../images/Combo.png";
import chicken from "../images/Chicken.png";
import puff from "../images/Puff.png";
import delivery1 from "../images/delivery1.jpeg";
import delivery2 from "../images/delivery2.jpg";
import cinema from "../images/cinema.png";
import cinema2 from "../images/cinema2.png";
import popcorn from "../images/popcorn.png";
import coke from "../images/coke.png";
import movie1 from "../images/movie1.png";
import movie2 from "../images/movie2.png";

import cinemaseating1 from "../images/cinemaseating1.png";
import cinemaseating2 from "../images/cinemaseating2.png";

const LandingPage = () => {
  const foodImages = {
    Pizza: pizza,
    Burger: burger,
    Drinks: drinks,
    Chicken: chicken,
    Combo: combo,
    Puff: puff,
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div
        className="hero-section text-white d-flex align-items-center custom-bg"
        style={{
          minHeight: "90vh",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left Text Content */}
            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">
                Book Movie Shows at Your Favorite Theatres Instantly
              </h1>
              <p className="lead mt-3">
                Discover the latest blockbusters, exclusive shows, and seamless
                ticket booking — all in one magical platform.
              </p>
              <Link
                to="/theatres"
                className="btn btn-danger px-4 py-2 mt-4 fw-bold rounded-pill shadow-sm"
              >
                Explore Theatres
              </Link>
            </div>

            {/* Right Image */}
            <div className="col-md-6 text-center">
              <img
                src={cinema2}
                alt="Pizza"
                className="img-fluid rounded-4"
                style={{ maxWidth: "650px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="restaurant-section py-5 text-dark">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side Images */}
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src={movie1}
                    alt="Restaurant 1"
                    className="img-fluid rounded-4 shadow"
                  />
                </div>
                <div className="col-6">
                  <img
                    src={movie2}
                    alt="Restaurant 2"
                    className="img-fluid rounded-4 shadow"
                  />
                </div>
              </div>
            </div>

            {/* Right Side Text */}
            <div className="col-md-6 text-center text-md-start ps-md-5">
              <h2 className="fw-bold mb-3 h2">
                Discover Movies at Top Theatres Near You
              </h2>
              <p className="fs-5 text-muted">
                Explore the latest blockbusters, timeless classics, and
                exclusive shows playing in your local theatres. With seamless
                booking, real-time showtimes, and verified ratings — Movie Magic
                makes your cinema experience effortless and exciting.
              </p>

              <Link
                to="/theatres"
                className="btn btn-outline-danger fw-bold px-4 py-2 rounded-pill mt-3"
              >
                Explore Theatres
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        {/* Section Title */}
        <div className="common-title-area text-center mb-5">
          <h3
            style={{
              fontFamily: "Caveat, cursive",

              fontWeight: "bold",
            }}
            className="h3 text-color-second"
          >
            <i> Theatre Food Items</i>
          </h3>
        </div>

        {/* Cards */}
        <div className="row justify-content-center">
          {["Pizza", "Burger", "Drinks", "Chicken", "Combo", "Puff"].map(
            (item, index) => (
              <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
                <div className="card text-center shadow-sm border-0 p-2 h-100 category-card">
                  <img
                    src={foodImages[item]}
                    className="card-img-top mx-auto"
                    alt={item}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title mt-2"
                      style={{ color: "rgb(42, 67, 93)", fontWeight: "bold" }}
                    >
                      {item}
                    </h6>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="restaurant-section py-5 text-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start ps-md-5">
            <h2 className="fw-bold mb-3 h2">Seamless Show Booking, Anytime</h2>
<p className="fs-5 text-muted">
  Ready for movie night? Book your favorite shows in just a few clicks! With our smart scheduling, real-time seat availability, and instant confirmations, Movie Magic ensures a smooth, stress-free cinema experience — whether it’s a weekend blockbuster or a spontaneous evening plan.
</p>

              <Link
                to="/theatres"
                className="btn btn-outline-danger fw-bold px-4 py-2 rounded-pill mt-3"
              >
                Explore Theatres
              </Link>
            </div>

            <div className="col-md-6 mb-4 mb-md-0">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src={cinemaseating1}
                    alt="Restaurant 1"
                    className="img-fluid rounded-4 shadow"
                  />
                </div>
                <div className="col-6">
                  <img
                    src={cinemaseating2}
                    alt="Restaurant 2"
                    className="img-fluid rounded-4 shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
