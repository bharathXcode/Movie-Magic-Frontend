import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import ShowCard from "./ShowCard";

const TheatreShows = () => {
  const [showName, setShowName] = useState("");
  const [tempShowName, setTempShowName] = useState("");

  const { theatreId } = useParams();

  const [theatre, setTheatre] = useState({
    location: {
      city: "",
      downtown: "",
    },
  });
  const [shows, setShows] = useState([]);

  const searchByShowName = (e) => {
    e.preventDefault();
    setShowName(tempShowName);

    setTempShowName("");
  };

  useEffect(() => {
    const getTheatreShows = async () => {
      if (showName === "") {
        const res = await retrieveTheatreShows();
        if (res) {
          setShows(res.shows);
        }
      } else if (showName !== "") {
        const res = await retrieveTheatreShowsByShowName();
        if (res) {
          setShows(res.shows);
        }
      }
    };

    const getTheatreDetail = async () => {
      const res = await retrieveTheatreById();
      if (res) {
        setTheatre(res.theatres[0]);
      }
    };

    getTheatreDetail();
    getTheatreShows();
  }, [theatreId, showName]);

  const retrieveTheatreById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/theatre/fetch/id-wise?theatreId=" + theatreId,
      {
        headers: {
          //      Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    return response.data;
  };

  const retrieveTheatreShows = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/theatre/show/fetch/theatre-wise/upcoming?theatreId=${theatreId}`
    );
    return response.data;
  };

  const retrieveTheatreShowsByShowName = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/theatre/show/fetch/showname-wise/upcoming?theatreId=${theatreId}&showName=${showName}`
    );
    return response.data;
  };

  return (
    <div className="container-fluid mb-2">
      <div
        className="bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "1em",
          height: "38px",
        }}
      >
        <h5 class="card-title ms-3 h5">Theatre Detail</h5>
      </div>

      <div className="mt-2">
        <div className="card shadow-lg p-4">
          <div className="row">
            {/* Image on the left side */}
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src={"http://localhost:8080/api/theatre/" + theatre.image}
                className="img-fluid rounded"
                alt={theatre.name}
                style={{
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Details on the right side */}
            <div className="col-md-8">
              <h5 className=" text-uppercase fw-bold text-color-second mb-3 h5">
                {theatre.name}
              </h5>
              <div className="row">
                {/* First column of details */}
                <div className="col-md-6">
                  <p>
                    <b>Description: </b>
                    {theatre.description}
                  </p>
                  <p>
                    <b>Location: </b>
                    {theatre.address}
                  </p>
                </div>

                {/* Second column of details */}
                <div className="col-md-6">
                  <p>
                    <b>Email: </b>
                    {theatre.emailId}
                  </p>

                  <p>
                    <b>City: </b>
                    {theatre.location.city}
                  </p>
                  <p>
                    <b>Downtown: </b>
                    {theatre.location.downtown}
                  </p>
                  <p>
                    <b>Status: </b>
                    {theatre.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="agbalumo-regular text-center text-color-second mt-4 h3">
        Upcoming Shows....!!!!
      </h3>

      <div className="d-flex aligns-items-center justify-content-center mt-4">
        <div className="row">
          <div className="col-auto">
            <form class="row g-3">
              <div class="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="showName"
                  onChange={(e) => setTempShowName(e.target.value)}
                  value={tempShowName}
                  placeholder="Search Show by name here..."
                />
              </div>

              <div class="col-auto">
                <button
                  type="submit"
                  className="btn bg-transparent border-0 btn-search-icon"
                  onClick={searchByShowName}
                >
                  <BiSearchAlt2
                    style={{ fontSize: "2rem", color: "#eb455f" }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-3  mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {shows.map((show) => {
            return <ShowCard item={show} key={show.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TheatreShows;
