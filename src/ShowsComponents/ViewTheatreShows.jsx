import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaCheckCircle, FaEye, FaTimesCircle, FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const ViewTheatreShows = () => {
  const [shows, setShows] = useState([]);

  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  function formatShowDateTime(showDate, startTime, endTime) {
    const pad = (n) => String(n).padStart(2, "0");

    const formattedDate = `${showDate[0]}-${pad(showDate[1])}-${pad(
      showDate[2]
    )}`;
    const formattedStartTime = `${pad(startTime[0])}:${pad(startTime[1])}`;
    const formattedEndTime = `${pad(endTime[0])}:${pad(endTime[1])}`;

    return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
  }

  useEffect(() => {
    const getShows = async () => {
      const res = await retriveShows();
      if (res) {
        setShows(res.shows);
      }
    };

    getShows();
  }, []);

  const retriveShows = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/theatre/show/fetch/theatre-wise?theatreId=" +
        theatreManager.theatre.id,
      {
        headers: {
          Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    );
    return response.data;
  };

  const viewShowDetail = (show) => {
    navigate("/theatre/show/detail", { state: show });
  };

  const updateShow = (showId, status) => {
    fetch(
      "http://localhost:8080/api/theatre/show/update/status?showId=" +
        showId +
        "&status=" +
        status,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h4 className="h4">All Shows</h4>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Show Time</th>
                  <th scope="col">Movie</th>
                  <th scope="col">Movie Name</th>
                  <th scope="col">Screen</th>
                  <th scope="col">Regular Price</th>
                  <th scope="col">Premium Price</th>
                  <th scope="col">Gold Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((show) => {
                  return (
                    <tr>
                      <td>
                        <b>
                          {formatShowDateTime(
                            show.showDate,
                            show.startTime,
                            show.endTime
                          )}
                        </b>
                      </td>

                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/theatre/" +
                            show?.movie?.posterImage
                          }
                          class="img-fluid"
                          alt="movie_poster_img"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{show?.movie?.title}</b>
                      </td>
                      <td>
                        <b>{show?.screen?.name}</b>
                      </td>
                      <td>
                        <b>{show.regularSeatPrice}</b>
                      </td>
                      <td>
                        <b>{show.premiumSeatPrice}</b>
                      </td>
                      <td>
                        <b>{show.goldSeatPrice}</b>
                      </td>

                      <td>
                        <b>{show.status}</b>
                      </td>

                      <td>
                        <td>
                          {show.status === "Active" && (
                            <>
                              <button
                                onClick={() => updateShow(show.id, "Cancelled")}
                                className="btn btn-lg bg-color custom-bg-text"
                                title="Cancel Show"
                              >
                                <FaTimesCircle />
                              </button>
                              <ToastContainer />

                              <button
                                onClick={() => updateShow(show.id, "Completed")}
                                className="btn btn-lg bg-color custom-bg-text mt-2"
                                title="Show Completed"
                              >
                                <FaCheckCircle />
                              </button>
                              <ToastContainer />
                            </>
                          )}
                          <button
                            onClick={() => viewShowDetail(show)}
                            className="btn btn-lg bg-color custom-bg-text mt-2"
                            title="View"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTheatreShows;
