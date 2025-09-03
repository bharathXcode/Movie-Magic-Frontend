import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddMovieReview = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const location = useLocation();
  const movie = location.state;

  const [userId, setUserId] = useState(user.id);

  let { movieId } = useParams();

  const [star, setStar] = useState("");
  const [review, setReview] = useState("");

  let navigate = useNavigate();

  const saveReview = (e) => {
    if (user == null) {
      e.preventDefault();
      alert("Please login as Customer for adding your review!!!");
    } else {
      e.preventDefault();
      setUserId(user.id);
      let data = { userId, movieId, star, review };

      fetch("http://movie-magic-backend-server-production.up.railway.app/api/movie/review/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + customer_jwtToken,
        },
        body: JSON.stringify(data),
      }).then((result) => {
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
            }, 2000); // Redirect after 3 seconds
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
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000); // Redirect after 3 seconds
          }
        });
      });
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-2 mt-2"></div>
        <div class="col-sm-3 mt-2">
          <div class="card form-card border-color custom-bg">
            <img
              src={"http://movie-magic-backend-server-production.up.railway.app/api/theatre/" + movie.posterImage}
              className="d-block card-img-top img-fluid"
              alt="poster_img"
              style={{
                maxHeight: "450px", // Adjust the maximum height as needed
                width: "auto",
                margin: "0 auto",
              }}
            />
          </div>
        </div>

        <div class="col-sm-5 mt-2">
          <div className="card form-card" style={{ width: "30rem" }}>
            <div
              className="card-header bg-color text-center "
              style={{ borderRadius: "1em", height: "45px" }}
            >
              <h5 className="card-title h5 text-white">Add Movie Review</h5>
            </div>
            <div className="card-body ">
              <form onSubmit={saveReview}>
                <div className="mb-3">
                  <label className="form-label">
                    <b>Star</b>
                  </label>

                  <select
                    name="locationId"
                    onChange={(e) => {
                      setStar(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Select Star</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label">
                    <b>Movie Review</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                    placeholder="enter review.."
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    value={review}
                  />
                </div>

                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Add Review"
                />

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieReview;
