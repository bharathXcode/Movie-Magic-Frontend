import React from "react";
import { toast } from "react-toastify"; // Ensure you have toast imported

const TheatreDetail = () => {
  const user = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  const updateTheatre = (status) => {
    fetch(
      "http://localhost:8080/api/theatre/update/status?theatreId=" +
        user.theatre.id +
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

            // Update only the theatre field with the new data from the API response
            user.theatre = res.theatres[0];
            // Save the updated object back to sessionStorage
            sessionStorage.setItem("active-theatre", JSON.stringify(user));
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
    <div className="container-fluid mt-5 mb-5">
      <div className="card shadow-lg p-4">
        <b className="mb-4 text-center">Theatre Detail</b>
        <div className="row">
          {/* Image on the left side */}
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={"http://localhost:8080/api/theatre/" + user.theatre.image}
              className="img-fluid rounded"
              alt={user.theatre.name}
              style={{
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Details on the right side */}
          <div className="col-md-8">
            <h5 className="text-uppercase fw-bold text-color-second mb-3">
              {user.theatre.name}
            </h5>
            <div className="row">
              {/* First column of details */}
              <div className="col-md-6">
                <p>
                  <b>Description: </b>
                  {user.theatre.description}
                </p>
                <p>
                  <b>Location: </b>
                  {user.theatre.address}
                </p>
                <p>
                  <b>City: </b>
                  {user.theatre.location.city}
                </p>
                <p>
                  <b>Downtown: </b>
                  {user.theatre.location.downtown}
                </p>
              </div>

              {/* Second column of details */}
              <div className="col-md-6">
                <p>
                  <b>Manager: </b>
                  {user.theatre.managerContact}
                </p>
                <p>
                  <b>Email: </b>
                  {user.theatre.emailId}
                </p>
                <p>
                  <b>Phone: </b>
                  {user.phoneNo}
                </p>
                <p>
                  <b>Latitude: </b>
                  {user.theatre.latitude}
                </p>
                <p>
                  <b>Longitude: </b>
                  {user.theatre.longitude}
                </p>
                <p>
                  <b>Status: </b>
                  {user.theatre.status}
                </p>

                {/* Conditional button for updating status */}
                {user.theatre.status === "Active" ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => updateTheatre("Deactivated")}
                  >
                    Deactivate
                  </button>
                ) : user.theatre.status === "Deactivated" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => updateTheatre("Active")}
                  >
                    Activate
                  </button>
                ) : (
                  <span className="text-danger">Approval Pending</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheatreDetail;
