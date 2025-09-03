import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import GetMovieReviews from "../ReviewComponent/GetMovieReviews";

const ViewShowDetail = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [selectedBookings, setSelectedBookings] = useState([]);

  const [bookings, setBookings] = useState([
    {
      id: 0,
      seatNumber: "",
      seatType: "",
      seatPosition: "",
      price: "",
      status: "",
    },
  ]);

  const location = useLocation();
  const show = location.state;

  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingClose = () => setShowBookingModal(false);
  const handleBookingShow = () => setShowBookingModal(true);

  const viewScreenDetail = () => {
    handleShow();
  };

  const viewShowBookingDetail = async () => {
    setSelectedBookings([]);

    const res = await retrieveBookings();
    if (res) {
      setBookings(res.bookings);
    }
    handleBookingShow();
  };

  function formatShowDateTime(showDate, startTime, endTime) {
    const pad = (n) => String(n).padStart(2, "0");

    const formattedDate = `${showDate[0]}-${pad(showDate[1])}-${pad(
      showDate[2]
    )}`;
    const formattedStartTime = `${pad(startTime[0])}:${pad(startTime[1])}`;
    const formattedEndTime = `${pad(endTime[0])}:${pad(endTime[1])}`;

    return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
  }

  const retrieveBookings = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/show/booking/fetch/show-wise?showId=" +
        show.id,
      {
        headers: {
          //       Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    );
    return response.data;
  };

  const totalPrice = selectedBookings.reduce(
    (sum, seat) => sum + parseFloat(seat.price || 0),
    0
  );

  const getSelectedBookingIdsAsString = () => {
    return selectedBookings.map((booking) => booking.id).join(",");
  };

  const bookShow = (e) => {
    e.preventDefault();

    if (!customer || Object.keys(customer).length === 0) {
      toast.error("Please login to book the show!!!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    let bookingIds = getSelectedBookingIdsAsString();

    if (!bookingIds || bookingIds.trim() === "") {
      toast.error("Please select at least one seat to proceed!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    let data = {
      customerId: customer?.id,
      bookingIds: bookingIds,
    };

    fetch("http://localhost:8080/api/show/booking/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(data),
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
            }, 1000); // Redirect after 1 second
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
        }, 1000); // Redirect after 1 second
      });
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-4">
          <h3 className="mt-3 text-color-second h3">Show Info</h3>
          <p>
            <strong>Show Time:</strong>{" "}
            {show?.showDate && show?.startTime && show?.endTime
              ? formatShowDateTime(show.showDate, show.startTime, show.endTime)
              : "Not available"}
          </p>

          <p>
            <strong>Language:</strong> {show?.language}
          </p>
          <p>
            <strong>Show Type:</strong> {show?.showType}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                show?.status === "Active"
                  ? "text-success"
                  : show?.status === "Cancelled"
                  ? "text-danger"
                  : show?.status === "Completed"
                  ? "text-primary"
                  : ""
              }
            >
              <b> {show?.status} </b>
            </span>
          </p>

          <p>
            <strong>Regular Seat Price:</strong> &#8377;
            {show?.regularSeatPrice}
          </p>
          <p>
            <strong>Premium Seat Price:</strong> &#8377;
            {show?.premiumSeatPrice}
          </p>
          <p>
            <strong>Gold Seat Price:</strong> &#8377;
            {show?.goldSeatPrice}
          </p>
        </div>
        <div className="col-md-8">
          <h3 className="mt-3 text-color-second h3">Screen Info</h3>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Screen:</strong> {show?.screen?.name}
              </p>
              <p>
                <strong>Total Seats:</strong> {show?.screen?.totalSeats}
              </p>
              <p>
                <strong>Total Regular Seats:</strong>{" "}
                {show?.screen?.totalRegularSeats}
              </p>
              <p>
                <strong>Total Premium Seats:</strong>{" "}
                {show?.screen?.totalPremiumSeats}
              </p>
              <p>
                <strong>Total Gold Seats:</strong>{" "}
                {show?.screen?.totalGoldSeats}
              </p>

              <button
                onClick={() => viewScreenDetail()}
                className="btn btn-sm bg-color custom-bg-text mt-2"
                title="View Seat Arrangement"
              >
                View Seat Arrangement
              </button>

              <button
                onClick={() => viewShowBookingDetail()}
                className="btn btn-sm bg-color custom-bg-text mt-2 ms-3"
                title="Book Show"
              >
                Book Show
              </button>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Total Regular Seat Row:</strong>{" "}
                {show?.screen?.totalRegularSeatRow}
              </p>
              <p>
                <strong>Total Premium Seat Row:</strong>{" "}
                {show?.screen?.totalPremiumSeatRow}
              </p>
              <p>
                <strong>Total Gold Seat Row:</strong>{" "}
                {show?.screen?.totalGoldSeatRow}
              </p>
              <p>
                <strong>Total Premium Seats:</strong>{" "}
                {show?.screen?.totalPremiumSeats}
              </p>
              <p>
                <strong>Left Side Seat:</strong>{" "}
                {show?.screen?.totalLeftSideSeats}
              </p>
              <p>
                <strong>Middle Side Seat:</strong>{" "}
                {show?.screen?.totalMiddleSeats}
              </p>
              <p>
                <strong>Right Side Seat:</strong>{" "}
                {show?.screen?.totalRightSideSeats}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-3 text-color-second h3">Movie Info</h3>

      <div className="row mt-4">
        {/* Movie Poster */}
        <div className="col-md-4 text-center mb-3">
          <img
            src={
              "http://localhost:8080/api/theatre/" + show?.movie?.posterImage
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
        <div className="col-md-5">
          <h3 className="h3 text-color-second">{show?.movie?.title}</h3>
          <p>
            <strong>Description:</strong> {show?.movie?.description}
          </p>
          <p>
            <strong>Director:</strong> {show?.movie?.director}
          </p>
          <p>
            <strong>Producer:</strong> {show?.movie?.producer}
          </p>
          <p>
            <strong>Cast:</strong> {show?.movie?.cast}
          </p>
          <p>
            <strong>Language:</strong> {show?.movie?.language}
          </p>
          <p>
            <strong>Genre:</strong> {show?.movie?.genre}
          </p>
          <p>
            <strong>Duration:</strong> {show?.movie?.duration}
          </p>
          <p>
            <strong>Release Date:</strong> {show?.movie?.releaseDate}
          </p>
          <p>
            <strong>Certification:</strong> {show?.movie?.certification}
          </p>
          <p>
            <strong>Format:</strong> {show?.movie?.format}
          </p>
          <p>
            <strong>Trailer:</strong>{" "}
            <a
              href={show?.movie?.trailerUrl}
              target="_blank"
              rel="noreferrer"
              className="btn  custom-bg-text text-white btn-sm ms-2"
            >
              Watch Trailer
            </a>
          </p>
        </div>

        {/* Movie Review Info */}
        <div className="col-md-3">
          <GetMovieReviews movie={show?.movie} />
        </div>
      </div>

      <h3 className="mt-3 text-color-second h3">Theatre Info</h3>

      <div className="row mt-4">
        <div className="col-md-4 text-center mb-3">
          <img
            src={
              "http://localhost:8080/api/theatre/" + show?.movie?.theatre?.image
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

        {/* Theatre Detail */}
        <div className="col-md-4 mb-3">
          <p>
            <strong>Name:</strong> {show?.movie?.theatre?.name}
          </p>
          <p>
            <strong>Address:</strong> {show?.movie?.theatre?.address}
          </p>
          <p>
            <strong>Manager Contact:</strong>{" "}
            {show?.movie?.theatre?.managerContact}
          </p>
          <p>
            <strong>Email:</strong> {show?.movie?.theatre?.emailId}
          </p>
          <p>
            <strong>Description:</strong> {show?.movie?.theatre?.description}
          </p>

          <p>
            <strong>Location:</strong> {show?.movie?.theatre?.location?.city} -{" "}
            {show?.movie?.theatre?.location?.downtown}
          </p>
        </div>

        {/* Theatre Location Google Map */}
        <div className="col-md-4">
          <iframe
            title="Theatre Location Map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${show?.movie?.theatre?.latitude},${show?.movie?.theatre?.longitude}`}
          ></iframe>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Screen Seat Arrangement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {show?.screen && show?.screen.screenSeats && (
              <div className="d-flex flex-column align-items-center">
                {(() => {
                  const rows = {};
                  show?.screen.screenSeats.forEach((seat) => {
                    const rowLetter = seat.seatNumber.charAt(0);
                    if (!rows[rowLetter]) rows[rowLetter] = [];
                    rows[rowLetter].push(seat);
                  });

                  // Sort rows reverse-alphabetically (Z at top, A at bottom)
                  const sortedRows = Object.entries(rows)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([rowLetter, seats]) => [
                      rowLetter,
                      seats.sort((a, b) => {
                        const numA = parseInt(a.seatNumber.slice(1));
                        const numB = parseInt(b.seatNumber.slice(1));
                        return numA - numB;
                      }),
                    ]);

                  const seatColors = {
                    Regular: "bg-primary",
                    Premium: "bg-warning text-dark",
                    Gold: "bg-success",
                  };

                  const seatBorder = {
                    Left: "me-3",
                    Middle: "",
                    Right: "ms-3",
                  };

                  // Helper to get seat type from a row letter
                  const getSeatTypeByRow = (rowLetter) => {
                    const regularRows = show?.screen?.totalRegularSeatRow;
                    const premiumRows = show?.screen?.totalPremiumSeatRow;
                    const goldRows = show?.screen?.totalGoldSeatRow;

                    const rowIndex = sortedRows.findIndex(
                      ([letter]) => letter === rowLetter
                    );
                    if (rowIndex < goldRows) return "Gold";
                    else if (rowIndex < goldRows + premiumRows)
                      return "Premium";
                    else return "Regular";
                  };

                  return (
                    <>
                      {sortedRows.map(([rowLetter, seats], rowIdx) => {
                        const seatType = getSeatTypeByRow(rowLetter);

                        // Add margin between seat type groups
                        let marginTop = "";
                        if (
                          rowIdx === show?.screen.totalGoldSeatRow ||
                          rowIdx ===
                            show?.screen.totalGoldSeatRow +
                              show?.screen.totalPremiumSeatRow
                        ) {
                          marginTop = "mt-4"; // Big gap between seat types
                        }

                        return (
                          <div
                            key={rowLetter}
                            className={`d-flex align-items-center mb-2 mt ${marginTop}`}
                          >
                            <strong className="me-2" style={{ width: "20px" }}>
                              {rowLetter}
                            </strong>
                            <div className="d-flex flex-wrap">
                              {seats.map((seat, index) => {
                                // Add wider space between Left/Middle/Right sections
                                const isLeftEnd =
                                  seat.seatPosition === "Left" &&
                                  seats[index + 1]?.seatPosition !== "Left";
                                const isMiddleEnd =
                                  seat.seatPosition === "Middle" &&
                                  seats[index + 1]?.seatPosition !== "Middle";

                                const seatGap =
                                  isLeftEnd || isMiddleEnd ? "me-4" : "me-2"; // bigger gap between blocks

                                return (
                                  <div
                                    key={seat.id}
                                    className={`text-white px-2 py-1 text-center rounded ${
                                      seatColors[seat.seatType] ||
                                      "bg-secondary"
                                    } ${seatGap}`}
                                    style={{
                                      width: "36px",
                                      fontSize: "0.72rem",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textAlign: "center",
                                    }}
                                    title={`${seat.seatType} - ${seat.seatPosition}`}
                                  >
                                    {seat.seatNumber}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      <div className="mt-4 text-muted text-center">
                        <small>← Screen this side</small>
                      </div>

                      <div className="mt-5 text-center">
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-primary text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Regular
                        </small>
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-warning text-dark me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Premium
                        </small>
                        <small>
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-success text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Gold
                        </small>
                      </div>
                    </>
                  );
                })()}
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

      <Modal show={showBookingModal} onHide={handleBookingClose} size="lg">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Book Your Show here...!!!
          </Modal.Title>
        </Modal.Header>

        {/* 
    
    here we have to show the proper seat arrangement like above modal 
    but we have to show the booking status to customer and allow them to
    select the seat for the booking note
    note for booked seat show bg-primary color 
    and for non booked seat show the normal colors
    
    */}
        <Modal.Body>
          <div className="container-fluid">
            {bookings && (
              <div className="d-flex flex-column align-items-center">
                {(() => {
                  const rows = {};
                  bookings.forEach((seat) => {
                    const rowLetter = seat.seatNumber.charAt(0);
                    if (!rows[rowLetter]) rows[rowLetter] = [];
                    rows[rowLetter].push(seat);
                  });

                  // Sort rows reverse-alphabetically (Z at top, A at bottom)
                  const sortedRows = Object.entries(rows)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([rowLetter, seats]) => [
                      rowLetter,
                      seats.sort((a, b) => {
                        const numA = parseInt(a.seatNumber.slice(1));
                        const numB = parseInt(b.seatNumber.slice(1));
                        return numA - numB;
                      }),
                    ]);

                  const seatColors = {
                    Regular: "bg-primary",
                    Premium: "bg-warning text-dark",
                    Gold: "bg-success",
                  };

                  const seatBorder = {
                    Left: "me-3",
                    Middle: "",
                    Right: "ms-3",
                  };

                  // Helper to get seat type from a row letter
                  const getSeatTypeByRow = (rowLetter) => {
                    const regularRows = show?.screen?.totalRegularSeatRow;
                    const premiumRows = show?.screen?.totalPremiumSeatRow;
                    const goldRows = show?.screen?.totalGoldSeatRow;

                    const rowIndex = sortedRows.findIndex(
                      ([letter]) => letter === rowLetter
                    );
                    if (rowIndex < goldRows) return "Gold";
                    else if (rowIndex < goldRows + premiumRows)
                      return "Premium";
                    else return "Regular";
                  };

                  return (
                    <>
                      {sortedRows.map(([rowLetter, seats], rowIdx) => {
                        const seatType = getSeatTypeByRow(rowLetter);

                        // Add margin between seat type groups
                        let marginTop = "";
                        if (
                          rowIdx === show?.screen.totalGoldSeatRow ||
                          rowIdx ===
                            show?.screen.totalGoldSeatRow +
                              show?.screen.totalPremiumSeatRow
                        ) {
                          marginTop = "mt-4"; // Big gap between seat types
                        }

                        return (
                          <div
                            key={rowLetter}
                            className={`d-flex align-items-center mb-2 mt ${marginTop}`}
                          >
                            <strong className="me-2" style={{ width: "20px" }}>
                              {rowLetter}
                            </strong>
                            <div className="d-flex flex-wrap">
                              {seats.map((seat, index) => {
                                // Add wider space between Left/Middle/Right sections
                                const isLeftEnd =
                                  seat.seatPosition === "Left" &&
                                  seats[index + 1]?.seatPosition !== "Left";
                                const isMiddleEnd =
                                  seat.seatPosition === "Middle" &&
                                  seats[index + 1]?.seatPosition !== "Middle";

                                const seatGap =
                                  isLeftEnd || isMiddleEnd ? "me-4" : "me-2"; // bigger gap between blocks

                                return (
                                  <div
                                    key={seat.id}
                                    onClick={() => {
                                      if (seat.status === "Available") {
                                        setSelectedBookings((prev) => {
                                          const exists = prev.find(
                                            (s) => s.id === seat.id
                                          );
                                          if (exists) {
                                            return prev.filter(
                                              (s) => s.id !== seat.id
                                            ); // Unselect
                                          } else {
                                            return [...prev, seat]; // Select
                                          }
                                        });
                                      }
                                    }}
                                    className={`px-2 py-1 text-center rounded ${
                                      seat.status === "Booked"
                                        ? "bg-color text-white"
                                        : selectedBookings.some(
                                            (s) => s.id === seat.id
                                          )
                                        ? "bg-dark text-white"
                                        : seatColors[seat.seatType] ||
                                          "bg-secondary text-white"
                                    } ${seatGap}`}
                                    style={{
                                      cursor:
                                        seat.status === "Available"
                                          ? "pointer"
                                          : "not-allowed",
                                      width: "36px",
                                      fontSize: "0.72rem",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textAlign: "center",
                                    }}
                                    title={`${seat.seatType} - ${seat.seatPosition}`}
                                  >
                                    {seat.seatNumber}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      <div className="mt-4 text-muted text-center">
                        <small>← Screen this side</small>
                      </div>

                      {selectedBookings.length > 0 && (
                        <div className="text-center mt-4">
                          <h5 className="h5">
                            Total Price: &#8377;
                            {selectedBookings
                              .reduce(
                                (total, seat) =>
                                  total + (parseFloat(seat?.price) || 0), // Safely parse price
                                0
                              )
                              .toFixed(2)}
                          </h5>
                          <button
                            className="btn btn-md bg-color text-white mt-2"
                            onClick={(e) => bookShow(e)}
                          >
                            Book Seat
                          </button>
                          <br />
                          <small className="text-danger">
                            Note: Please ensure you have sufficient balance in
                            Wallet before booking the seat.
                          </small>
                        </div>
                      )}

                      <div className="mt-5 text-center">
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-primary text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Regular
                        </small>
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-warning text-dark me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Premium
                        </small>
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-success text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Gold
                        </small>
                        <small className="me-3">
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-color text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Booked
                        </small>
                        <small>
                          <span
                            className="d-inline-block rounded px-2 py-1 bg-dark text-white me-1"
                            style={{ width: "32px" }}
                          >
                             
                          </span>
                          Selected
                        </small>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleBookingClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewShowDetail;
