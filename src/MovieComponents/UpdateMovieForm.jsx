import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateMovieForm = () => {
  const location = useLocation();
  const movie = location.state;

  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  const [selectedImage, setSelectImage] = useState(null);

  const [updateMovie, setUpdatedMovie] = useState({
    movieId: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    cast: movie.cast,
    language: movie.language,
    genre: movie.genre,
    releaseDate: movie.releaseDate,
    certification: movie.certification,
    format: movie.format,
    trailerUrl: movie.trailerUrl,
    duration: movie.duration,
  });

  const handleInput = (e) => {
    setUpdatedMovie({ ...updateMovie, [e.target.name]: e.target.value });
  };

  const saveMovie = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/movie/update/detail", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + theatre_jwtToken,
      },
      body: JSON.stringify(updateMovie),
    })
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
              navigate("/theatre/movie/view");
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
              navigate("/theatre/movie/view");
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
              navigate("/theatre/movie/view");
            }, 2000); // Redirect after 3 seconds
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

  const updateMoviePoster = (e) => {
    e.preventDefault();
    if (theatreManager === null) {
      toast.error("Theatre Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    formData.append("movieId", movie.id);

    axios
      .put("http://localhost:8080/api/movie/update/poster", formData, {
        headers: {
          Authorization: "Bearer " + theatre_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/theatre/movie/view");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="container-fluid mt-4 mb-5">
      <div class="row">
        <div class="col-sm-3 mt-2 admin">
          <div class="card form-card custom-bg">
            <img
              src={"http://localhost:8080/api/theatre/" + movie.posterImage}
              className="d-block card-img-top img-fluid"
              alt="..."
              style={{
                maxHeight: "450px", // Adjust the maximum height as needed
                width: "auto",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
        <div class="col-sm-6 mt-2">
          <div class="card form-card">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 class="card-title h5">Update Movie Details</h5>
              </div>
              <div class="card-body">
                <form className="row g-3">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="title" className="form-label">
                      <b>Movie Title</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={handleInput}
                      value={updateMovie.title}
                    />
                  </div>

                  {/* Remaining Fields */}

                  <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label">
                      <b>Description</b>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={updateMovie.description}
                    ></textarea>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="director" className="form-label">
                      <b>Director</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="director"
                      name="director"
                      onChange={handleInput}
                      value={updateMovie.director}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="producer" className="form-label">
                      <b>Producer</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="producer"
                      name="producer"
                      onChange={handleInput}
                      value={updateMovie.producer}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="cast" className="form-label">
                      <b>Cast</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cast"
                      name="cast"
                      onChange={handleInput}
                      value={updateMovie.cast}
                    />
                    <small className="text-danger">
                      enter cast name (comma separated)
                    </small>
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
                      value={updateMovie.language}
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
                    <label htmlFor="genre" className="form-label">
                      <b>Genre</b>
                    </label>
                    <select
                      className="form-select"
                      id="genre"
                      name="genre"
                      onChange={handleInput}
                      value={updateMovie.genre}
                    >
                      <option value="">-- Select Genre --</option>
                      <option value="Action">Action</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Drama">Drama</option>
                      <option value="Horror">Horror</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Animation">Animation</option>
                      <option value="Documentary">Documentary</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Crime">Crime</option>
                      <option value="Musical">Musical</option>
                      <option value="Historical">Historical</option>
                      <option value="Biography">Biography</option>
                      <option value="Family">Family</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="duration" className="form-label">
                      <b>Duration</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="duration"
                      name="duration"
                      onChange={handleInput}
                      value={updateMovie.duration}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="releaseDate" className="form-label">
                      <b>Release Date</b>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="releaseDate"
                      name="releaseDate"
                      onChange={handleInput}
                      value={updateMovie.releaseDate}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="certification" className="form-label">
                      <b>Certification</b>
                    </label>
                    <select
                      className="form-select"
                      id="certification"
                      name="certification"
                      onChange={handleInput}
                      value={updateMovie.certification}
                    >
                      <option value="">-- Select Certification --</option>
                      <option value="UA">UA</option>
                      <option value="A">A</option>
                      <option value="U">U</option>
                      <option value="S">S</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="format" className="form-label">
                      <b>Format</b>
                    </label>
                    <select
                      className="form-select"
                      id="format"
                      name="format"
                      onChange={handleInput}
                      value={updateMovie.format}
                    >
                      <option value="">-- Select Format --</option>
                      <option value="2D">2D</option>
                      <option value="3D">3D</option>
                      <option value="IMAX">IMAX</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="trailerUrl" className="form-label">
                      <b>Trailer URL</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="trailerUrl"
                      name="trailerUrl"
                      onChange={handleInput}
                      value={updateMovie.trailerUrl}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn bg-color custom-bg-text"
                      onClick={saveMovie}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 mt-2">
          <div class="card form-card">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 class="card-title h5">Update Movie Poster</h5>
              </div>
              <div class="card-body">
                <form className="row">
                  <div className="mb-3">
                    <label for="formFile" class="form-label">
                      <b> Select Poster</b>
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      name="image1"
                      onChange={(e) => setSelectImage(e.target.files[0])}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn bg-color custom-bg-text"
                      onClick={updateMoviePoster}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovieForm;
