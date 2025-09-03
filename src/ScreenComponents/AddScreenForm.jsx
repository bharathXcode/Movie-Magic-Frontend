import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddScreenForm = () => {
  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  const [screen, setScreen] = useState({
    name: "",
    totalSeats: 0,
    totalRegularSeats: 0,
    totalRegularSeatRow: 0,
    totalPremiumSeats: 0,
    totalPremiumSeatRow: 0,
    totalGoldSeats: 0,
    totalGoldSeatRow: 0,
    totalLeftSideSeats: 0,
    totalRightSideSeats: 0,
    totalMiddleSeats: 0,
  });

  const handleInput = (e) => {
    setScreen({ ...screen, [e.target.name]: e.target.value });
  };

  const saveScreen = (e) => {
    e.preventDefault();
    screen.theatreId = theatreManager.theatre.id;
    fetch("http://movie-magic-backend-server-production.up.railway.app/api/theatre/screen/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(screen),
    })
      .then((result) => {
        console.log("result", result);
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
              navigate("/home");
            }, 1000);
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
          } else {
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
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center mb-4">
        <div className="card form-card shadow-lg" style={{ width: "45rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{ borderRadius: "1em", height: "45px" }}
            >
              <h5 className="card-title h5">Add Screen Detail!!!</h5>
            </div>
            <div className="card-body">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    <b>Screen Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    value={screen.name}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalSeats" className="form-label">
                    <b>Total Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalSeats"
                    name="totalSeats"
                    onChange={handleInput}
                    value={screen.totalSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalRegularSeats" className="form-label">
                    <b>Total Regular Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalRegularSeats"
                    name="totalRegularSeats"
                    onChange={handleInput}
                    value={screen.totalRegularSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalRegularSeatRow" className="form-label">
                    <b>Total Regular Seat Rows</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalRegularSeatRow"
                    name="totalRegularSeatRow"
                    onChange={handleInput}
                    value={screen.totalRegularSeatRow}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalPremiumSeats" className="form-label">
                    <b>Total Premium Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalPremiumSeats"
                    name="totalPremiumSeats"
                    onChange={handleInput}
                    value={screen.totalPremiumSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalPremiumSeatRow" className="form-label">
                    <b>Total Premium Seat Rows</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalPremiumSeatRow"
                    name="totalPremiumSeatRow"
                    onChange={handleInput}
                    value={screen.totalPremiumSeatRow}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalGoldSeats" className="form-label">
                    <b>Total Gold Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalGoldSeats"
                    name="totalGoldSeats"
                    onChange={handleInput}
                    value={screen.totalGoldSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalGoldSeatRow" className="form-label">
                    <b>Total Gold Seat Rows</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalGoldSeatRow"
                    name="totalGoldSeatRow"
                    onChange={handleInput}
                    value={screen.totalGoldSeatRow}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalLeftSideSeats" className="form-label">
                    <b>Total Left Side Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalLeftSideSeats"
                    name="totalLeftSideSeats"
                    onChange={handleInput}
                    value={screen.totalLeftSideSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalRightSideSeats" className="form-label">
                    <b>Total Right Side Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalRightSideSeats"
                    name="totalRightSideSeats"
                    onChange={handleInput}
                    value={screen.totalRightSideSeats}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="totalMiddleSeats" className="form-label">
                    <b>Total Middle Seats</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalMiddleSeats"
                    name="totalMiddleSeats"
                    onChange={handleInput}
                    value={screen.totalMiddleSeats}
                  />
                </div>

                <div className="d-flex align-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveScreen}
                  >
                    Add Screen
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScreenForm;
