import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialCenter = { lat: 19.076, lng: 72.8777 }; // Mumbai center coordinates

const AddLocation = ({ onSubmit }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [city, setCity] = useState("");
  const [downtown, setDowntown] = useState("");
  let navigate = useNavigate();

  const autocompleteRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert("Please select a location on the map.");
      return;
    }
    const locationData = {
      city,
      downtown,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };

    fetch("http://movie-magic-backend-server-production.up.railway.app/api/location/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(locationData),
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
    <Flex
      direction="column"
      alignItems="center"
      h="100vh"
      w="100vw"
      className="mb-5"
    >
      <Box position="relative" h="70vh" w="100%">
        <GoogleMap
          center={initialCenter}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Autocomplete>
            <Input
              type="text"
              placeholder="Downtown (e.g. BKC, South Mumbai)"
              value={downtown}
              onChange={(e) => setDowntown(e.target.value)}
              required
            />
            {selectedLocation && (
              <VStack>
                <Text>Latitude: {selectedLocation.lat}</Text>
                <Text>Longitude: {selectedLocation.lng}</Text>
              </VStack>
            )}
            <Button
              colorScheme="blue"
              type="submit"
              disabled={!selectedLocation}
              className="bg-color custom-bg-text"
            >
              Add Location
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddLocation;
