import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TheatreWallet = () => {
  let navigate = useNavigate();

  const theatre = JSON.parse(sessionStorage.getItem("active-theatre"));
  const theatre_jwtToken = sessionStorage.getItem("theatre-jwtToken");

  const [walletAmount, setWalletAmount] = useState("0.0");

  useEffect(() => {
    const getUserWalletDetail = async () => {
      const wallet = await retrieveWalletDetail();
      if (wallet) {
        setWalletAmount(wallet);
      }
    };

    getUserWalletDetail();
  }, []);

  const retrieveWalletDetail = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/wallet/fetch?userId=" + theatre.id,
      {
        headers: {
          //   Authorization: "Bearer " + theatre_jwtToken,
        },
      }
    );

    return response.data;
  };

  return (
    <div>
      <div className="mt-2 mb-5 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h5 className="card-title h5">Theatre Wallet Detail!!!!</h5>
            </div>
            <div className="card-body mt-3">
              <h4 className="h4 text-center mt-3 mb-3">
                Wallet Balance : &#8377; {walletAmount}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheatreWallet;
