import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const AddTheatreForm = () => {
  const [locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedImage, setSelectImage] = useState(null);

  const theatreManager = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  let navigate = useNavigate();

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/location/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await retrieveAllLocations();
      if (res) {
        setLocations(res.locations);
      }
    };
    getAllLocations();
  }, []);

  const [theatre, setTheatre] = useState({
    name: "",
    address: "",
    locationId: "",
    managerContact: "",
    emailId: "",
    managerId: "",
    description: "",
  });

  const handleInput = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });
  };

  const saveTheatre = (e) => {
    e.preventDefault();
    if (
      !theatre.name ||
      !theatre.address ||
      !theatre.locationId ||
      !latitude ||
      !longitude
    ) {
      toast.error("Missing Input!!!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", theatre.name);
    formData.append("address", theatre.address);
    formData.append("locationId", theatre.locationId);
    formData.append("managerContact", theatre.managerContact);
    formData.append("emailId", theatre.emailId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("managerId", theatreManager.id);
    formData.append("description", theatre.description);

    axios
      .post("http://localhost:8080/api/theatre/add", formData, {
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

          // Update only the restaurant field with the new data from the API response
          theatreManager.theatre = response.theatres[0];
          // Save the updated object back to sessionStorage
          sessionStorage.setItem(
            "active-theatre",
            JSON.stringify(theatreManager)
          );
          setTimeout(() => {
            window.location.reload(true);
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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = (event) => {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
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
              <h5 className="card-title h5">Add Theatre Detail!!!</h5>
            </div>
            <div className="card-body">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Theatre Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="name"
                    onChange={handleInput}
                    value={theatre.name}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Theatre Contact</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="title"
                    name="managerContact"
                    onChange={handleInput}
                    value={theatre.managerContact}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Theatre Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleInput}
                    value={theatre.description}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Theatre Address</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    onChange={handleInput}
                    value={theatre.address}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Theatre Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="title"
                    name="emailId"
                    onChange={handleInput}
                    value={theatre.emailId}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Location</b>
                  </label>
                  <select
                    name="locationId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.city + " - [" + location.downtown + "]"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b>Select Image</b>
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

                <div className="col-md-12 mb-3">
                  <label>
                    <b>Select Location on Map</b>
                  </label>
                  {isLoaded ? (
                    <div style={{ height: "300px", width: "100%" }}>
                      <GoogleMap
                        onClick={handleMapClick}
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={{ lat: 19.076, lng: 72.8777 }} // Default center set to Mumbai
                        zoom={8}
                      >
                        {latitude && longitude && (
                          <Marker
                            position={{ lat: latitude, lng: longitude }}
                          />
                        )}
                      </GoogleMap>
                    </div>
                  ) : (
                    <div>Loading Map...</div>
                  )}
                  <p>
                    Selected Coordinates: {latitude}, {longitude}
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveTheatre}
                  >
                    Add Theatre
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

export default AddTheatreForm;
