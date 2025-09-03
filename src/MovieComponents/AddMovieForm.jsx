import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const AddMovieForm = () => {
  const [selectedImage, setSelectImage] = useState(null);

  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    director: "",
    producer: "",
    cast: "",
    language: "",
    genre: "",
    duration: "",
    releaseDate: "",
    certification: "",
    format: "",
    trailerUrl: "",
  });

  const handleInput = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const saveMovie = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("theatreId", theatreManager.theatre.id);
    formData.append("title", movie.title);
    formData.append("description", movie.description);
    formData.append("director", movie.director);
    formData.append("producer", movie.producer);
    formData.append("cast", movie.cast);
    formData.append("language", movie.language);
    formData.append("genre", movie.genre);
    formData.append("duration", movie.duration);
    formData.append("releaseDate", movie.releaseDate);
    formData.append("certification", movie.certification);
    formData.append("format", movie.format);
    formData.append("trailerUrl", movie.trailerUrl);

    axios
      .post("http://localhost:8080/api/movie/add", formData, {
        headers: {
          Authorization: "Bearer " + theatre_jwtToken,
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

          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
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
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
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
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
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
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 2000); // Redirect after 3 seconds
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
              <h5 className="card-title h5">Add Movie Detail!!!</h5>
            </div>
            <div className="card-body">
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
                    value={movie.title}
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
                    value={movie.description}
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
                    value={movie.director}
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
                    value={movie.producer}
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
                    value={movie.cast}
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
                    value={movie.language}
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
                    value={movie.genre}
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
                    value={movie.duration}
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
                    value={movie.releaseDate}
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
                    value={movie.certification}
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
                    value={movie.format}
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
                    value={movie.trailerUrl}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b>Select Poster</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image"
                    onChange={(e) => setSelectImage(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex align-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveMovie}
                  >
                    Add Movie
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

export default AddMovieForm;
