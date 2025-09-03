import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const AddShowForm = () => {
  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  const [screens, setScreens] = useState([]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await retrieveMovies();
      if (res) {
        setMovies(res.movies);
      }
    };

    const getScreens = async () => {
      const res = await retrieveScreen();
      if (res) {
        setScreens(res.screens);
      }
    };

    getScreens();
    getMovies();
  }, []);

  const retrieveScreen = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/theatre/screen/fetch/theatre-wise?theatreId=" +
        theatreManager.theatre.id,
      {
        headers: {
          Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveMovies = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/movie/fetch/theatre-wise?theatreId=" +
        theatreManager.theatre.id,
      {
        headers: {
          Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    );
    return response.data;
  };

  const [show, setShow] = useState({
    showDate: "",
    startTime: "",
    endTime: "",
    language: "",
    showType: "",
    movieId: 0,
    screenId: 0,
    goldSeatPrice: "",
    regularSeatPrice: "",
    premiumSeatPrice: "",
    theatreId: theatreManager?.theatre?.id,
  });

  const handleInput = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const saveShow = (e) => {
    e.preventDefault();
    show.theatreId = theatreManager?.theatre?.id;
    fetch("http://movie-magic-backend-server-production.up.railway.app/api/theatre/show/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        //    Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(show),
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
              <h5 className="card-title h5">Add Movie Show!!!</h5>
            </div>
            <div className="card-body">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="screenId" className="form-label">
                    <b>Screen</b>
                  </label>
                  <select
                    className="form-select"
                    id="screenId"
                    name="screenId"
                    onChange={handleInput}
                    value={show.screenId}
                  >
                    <option value="">-- Select Screen --</option>
                    {screens.map((screen) => (
                      <option key={screen.id} value={screen.id}>
                        {screen.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="movieId" className="form-label">
                    <b>Movie</b>
                  </label>
                  <select
                    className="form-select"
                    id="movieId"
                    name="movieId"
                    onChange={handleInput}
                    value={show.movieId}
                  >
                    <option value="">-- Select Movie --</option>
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="regularSeatPrice" className="form-label">
                    <b>Regular Seat Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="regularSeatPrice"
                    name="regularSeatPrice"
                    onChange={handleInput}
                    value={show.regularSeatPrice}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="premiumSeatPrice" className="form-label">
                    <b>Premium Seat Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="premiumSeatPrice"
                    name="premiumSeatPrice"
                    onChange={handleInput}
                    value={show.premiumSeatPrice}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="goldSeatPrice" className="form-label">
                    <b>Gold Seat Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="goldSeatPrice"
                    name="goldSeatPrice"
                    onChange={handleInput}
                    value={show.goldSeatPrice}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="language" className="form-label">
                    <b>Language</b>
                  </label>
                  <select
                    className="form-select"
                    id="language"
                    name="language"
                    onChange={handleInput}
                    value={show.language}
                  >
                    <option value="">-- Select Language --</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="showType" className="form-label">
                    <b>Show Type</b>
                  </label>
                  <select
                    className="form-select"
                    id="showType"
                    name="showType"
                    onChange={handleInput}
                    value={show.showType}
                  >
                    <option value="">-- Select Show Type --</option>
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="IMAX">IMAX</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="showDate" className="form-label">
                    <b>Show Date</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="showDate"
                    name="showDate"
                    value={show.showDate}
                    onChange={handleInput}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Start Time</b>
                  </label>
                  <div className="form-control p-0">
                    <TimePicker
                      onChange={(val) => setShow({ ...show, startTime: val })}
                      value={show.startTime}
                      disableClock
                      clearIcon={null}
                      format="HH:mm"
                      className="w-100 border-0 px-2 py-1"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>End Time</b>
                  </label>
                  <div className="form-control p-0">
                    <TimePicker
                      onChange={(val) => setShow({ ...show, endTime: val })}
                      value={show.endTime}
                      disableClock
                      clearIcon={null}
                      format="HH:mm"
                      className="w-100 border-0 px-2 py-1"
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveShow}
                  >
                    Add Show
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

export default AddShowForm;
