import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const ViewPendingTheatres = () => {
  const [theatres, setTheatres] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getTheatres = async () => {
      const res = await retrieveTheatres();
      if (res) {
        setTheatres(res.theatres);
      }
    };

    getTheatres();
  }, []);

  const retrieveTheatres = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/theatre/fetch/status-wise?status=Pending",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const updateTheatre = (theatreId, status, e) => {
    fetch(
      "http://localhost:8080/api/theatre/update/status?theatreId=" +
        theatreId +
        "&status=" +
        status,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
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
          <h4 className="h4">Pending Theatres</h4>
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
                  <th scope="col">Theatre</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Address</th>
                  <th scope="col">Location</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {theatres.map((theatre) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/theatre/" + theatre.image
                          }
                          class="img-fluid"
                          alt="food_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{theatre.name}</b>
                      </td>
                      <td>
                        <b>{theatre.description}</b>
                      </td>
                      <td>
                        <b>{theatre.managerContact}</b>
                      </td>
                      <td>
                        <b>{theatre.emailId}</b>
                      </td>
                      <td>
                        <b>{theatre.address}</b>
                      </td>
                      <td>
                        <b>{theatre.latitude + " , " + theatre.longitude}</b>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            updateTheatre(theatre.id, "Deactivated")
                          }
                          className="btn btn-lg bg-danger text-white ms-2"
                          title="Reject"
                        >
                          <FaTimesCircle />
                        </button>

                        <button
                          onClick={() => updateTheatre(theatre.id, "Active")}
                          className="btn btn-lg bg-success text-white ms-2 mt-2"
                          title="Approve"
                        >
                          <FaCheckCircle />
                        </button>

                        <ToastContainer />
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

export default ViewPendingTheatres;
