import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const ViewTheatreScreens = () => {
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState({
    name: "",
    screenSeats: [],
  });

  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getScreens = async () => {
      const res = await retrieveScreen();
      if (res) {
        setScreens(res.screens);
      }
    };

    getScreens();
  }, []);

  const retrieveScreen = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/theatre/screen/fetch/theatre-wise?theatreId=" +
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

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const viewScreenDetail = (screen) => {
    setSelectedScreen(screen);
    handleShow();
  };

  const deleteScreen = (screenId, e) => {
    fetch(
      "http://localhost:8080/api/theatre/screen/delete?screenId=" + screenId,
      {
        method: "DELETE",
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
          <h4 className="h4">All Screens</h4>
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
                  <th scope="col">Screen</th>
                  <th scope="col">Total Seats</th>
                  <th scope="col">Total Regular Row</th>
                  <th scope="col">Total Regular Seats</th>
                  <th scope="col">Total Premium Row</th>
                  <th scope="col">Total Premium Seats</th>
                  <th scope="col">Total Gold Row</th>
                  <th scope="col">Total Gold Seats</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {screens.map((screen) => {
                  return (
                    <tr>
                      <td>
                        <b>{screen.name}</b>
                      </td>
                      <td>
                        <b>{screen.totalSeats}</b>
                      </td>
                      <td>
                        <b>{screen.totalRegularSeatRow}</b>
                      </td>
                      <td>
                        <b>{screen.totalRegularSeats}</b>
                      </td>
                      <td>
                        <b>{screen.totalPremiumSeatRow}</b>
                      </td>
                      <td>
                        <b>{screen.totalPremiumSeats}</b>
                      </td>
                      <td>
                        <b>{screen.totalGoldSeatRow}</b>
                      </td>
                      <td>
                        <b>{screen.totalGoldSeats}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteScreen(screen.id)}
                          className="btn btn-lg bg-color custom-bg-text"
                          title="Delete Screen"
                        >
                          <FaTrash />
                        </button>
                        <ToastContainer />

                        <button
                          onClick={() => viewScreenDetail(screen)}
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
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            {theatreManager?.theatre?.name +
              " - Screen " +
              selectedScreen?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="text-center mb-4">
              <h4 className="mb-3 h4">Screen Seating Arrangement</h4>
              <hr />
            </div>

            {selectedScreen && selectedScreen.screenSeats && (
              <div className="d-flex flex-column align-items-center">
                {(() => {
                  const rows = {};
                  selectedScreen.screenSeats.forEach((seat) => {
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
                    const regularRows = selectedScreen.totalRegularSeatRow;
                    const premiumRows = selectedScreen.totalPremiumSeatRow;
                    const goldRows = selectedScreen.totalGoldSeatRow;

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
                          rowIdx === selectedScreen.totalGoldSeatRow ||
                          rowIdx ===
                            selectedScreen.totalGoldSeatRow +
                              selectedScreen.totalPremiumSeatRow
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
    </div>
  );
};

export default ViewTheatreScreens;
