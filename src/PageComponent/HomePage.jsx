import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi"; // Bootstrap-style icon
import { GiFullPizza } from "react-icons/gi"; // Game Icons - Pizza!\
import { BiSearchAlt2 } from "react-icons/bi";

import axios from "axios";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import TheatreCard from "../UserComponent/TheatreCard";

const HomePage = () => {
  const [allLocations, setAllLocations] = useState([]);

  const [locationId, setLocationId] = useState("");

  const [tempLocationId, setTempLocationId] = useState("");

  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    const getAllLocation = async () => {
      const allLocations = await retrieveAllLocation();
      if (allLocations) {
        setAllLocations(allLocations.locations);
      }
    };

    const getAllTheatres = async () => {
      if (locationId === "" || locationId === "0") {
        const res = await retrieveTheatres();
        if (res) {
          setTheatres(res.theatres);
        }
      } else {
        const res = await retrieveTheatresByLocation();
        if (res) {
          setTheatres(res.theatres);
        }
      }
    };
    getAllTheatres();
    getAllLocation();
  }, [locationId]);

  const retrieveAllLocation = async () => {
    const response = await axios.get( 
      //  "http://localhost:8080/api/location/fetch/all"
       "http://movie-magic-backend-server-production.up.railway.app/api/location/fetch/all"
    );
    return response.data;
  };

  const retrieveTheatres = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/theatre/fetch/status-wise?status=Active"
    );
    return response.data;
  };

  const retrieveTheatresByLocation = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/theatre/fetch/location-wise?locationId=" +
        locationId
    );
    return response.data;
  };

  const searchByLocation = (e) => {
    e.preventDefault();
    setLocationId(tempLocationId);
    setTempLocationId("");
  };

  return (
    <div className="container-fluid mt-3">
      {/* <Carousel /> */}

      <div className="d-flex aligns-items-center justify-content-center">
        <div className="row">
          <div className="d-flex align-items-end">
            <form className="row g-3 me-2">
              <div className="col-auto">
                <select
                  onChange={(e) => setTempLocationId(e.target.value)}
                  className="form-select fw-bold custom-select"
                  required
                >
                  <option value="0" className="text-muted">
                    Select Location
                  </option>
                  {allLocations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                      className="fw-bold"
                    >
                      {location.city + " [" + location.downtown + "]"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button
                  type="submit"
                  className="btn bg-transparent border-0 btn-search-icon"
                  onClick={searchByLocation}
                >
                  <BiSearchAlt2
                    style={{ fontSize: "2rem", color: "#d53a52" }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {theatres.map((restaurant) => {
            return <TheatreCard item={restaurant} key={restaurant.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
