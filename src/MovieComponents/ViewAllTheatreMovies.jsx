import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const ViewAllTheatreMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    theatre: { name: "" },
  });

  const adminManager = JSON.parse(sessionStorage.getItem("active-admin"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const res = await retrieveMovies();
      if (res) {
        setMovies(res.movies);
      }
    };

    getMovies();
  }, []);

  const retrieveMovies = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/movie/fetch/status-wise?status=Active",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const viewMovieDetail = (movie) => {
    setSelectedMovie(movie);
    handleShow();
  };

  const deleteMovie = (movieId, e) => {
    fetch("http://movie-magic-backend-server-production.up.railway.app/api/movie/delete?movieId=" + movieId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
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
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
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
          <h4 className="h4">All Movies</h4>
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
                  <th scope="col">Movie</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Director</th>
                  <th scope="col">Producer</th>
                  <th scope="col">Language</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Theatre</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://movie-magic-backend-server-production.up.railway.app/api/theatre/" +
                            movie.posterImage
                          }
                          class="img-fluid"
                          alt="movie_poster_img"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{movie.title}</b>
                      </td>
                      <td>
                        <b>{movie.description}</b>
                      </td>
                      <td>
                        <b>{movie.director}</b>
                      </td>
                      <td>
                        <b>{movie.producer}</b>
                      </td>

                      <td>
                        <b>{movie.language}</b>
                      </td>
                      <td>
                        <b>{movie.duration}</b>
                      </td>
                      <td>
                        <b>{movie.theatre.name}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteMovie(movie.id)}
                          className="btn btn-lg bg-color custom-bg-text"
                          title="Delete Screen"
                        >
                          <FaTrash />
                        </button>
                        <ToastContainer />

                        <button
                          onClick={() => viewMovieDetail(movie)}
                          className="btn btn-lg bg-color custom-bg-text mt-2"
                          title="View"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title style={{ borderRadius: "1em" }}>
            Movie Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {selectedMovie && (
              <div className="row">
                {/* Movie Poster */}
                <div className="col-md-4 text-center mb-3">
                  <img
                    src={
                      "http://movie-magic-backend-server-production.up.railway.app/api/theatre/" +
                      selectedMovie.posterImage
                    }
                    className="d-block card-img-top img-fluid"
                    alt="poster_img"
                    style={{
                      maxHeight: "450px", // Adjust the maximum height as needed
                      width: "auto",
                      margin: "0 auto",
                    }}
                  />
                </div>

                {/* Movie Info */}
                <div className="col-md-8">
                  <h3 className="h3">{selectedMovie?.title}</h3>
                  <p>
                    <strong>Description:</strong> {selectedMovie?.description}
                  </p>
                  <p>
                    <strong>Director:</strong> {selectedMovie?.director}
                  </p>
                  <p>
                    <strong>Producer:</strong> {selectedMovie?.producer}
                  </p>
                  <p>
                    <strong>Cast:</strong> {selectedMovie?.cast}
                  </p>
                  <p>
                    <strong>Language:</strong> {selectedMovie?.language}
                  </p>
                  <p>
                    <strong>Genre:</strong> {selectedMovie?.genre}
                  </p>
                  <p>
                    <strong>Duration:</strong> {selectedMovie?.duration}
                  </p>
                  <p>
                    <strong>Release Date:</strong> {selectedMovie?.releaseDate}
                  </p>
                  <p>
                    <strong>Certification:</strong>{" "}
                    {selectedMovie?.certification}
                  </p>
                  <p>
                    <strong>Format:</strong> {selectedMovie?.format}
                  </p>
                  <p>
                    <strong>Trailer:</strong>{" "}
                    <a
                      href={selectedMovie?.trailerUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Trailer
                    </a>
                  </p>
                </div>

                {/* Theatre Info */}
                <div className="col-12 mt-4">
                  <h5 className="mt-3 h5">Theatre Info</h5>
                  <p>
                    <strong>Name:</strong> {selectedMovie?.theatre?.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedMovie?.theatre?.address}
                  </p>
                  <p>
                    <strong>Manager Contact:</strong>{" "}
                    {selectedMovie?.theatre?.managerContact}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedMovie?.theatre?.emailId}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedMovie?.theatre?.description}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedMovie?.theatre?.location?.city} -{" "}
                    {selectedMovie?.theatre?.location?.downtown}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllTheatreMovies;
