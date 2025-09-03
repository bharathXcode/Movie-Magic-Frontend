import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import star from "../images/star.png";

const GetMovieReviews = ({ movie }) => {
  console.log("movie object");
  console.log(JSON.stringify(movie));

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("0.0");

  const retrieveAllReviews = async () => {
    const response = await axios.get(
      "http://movie-magic-backend-server-production.up.railway.app/api/movie/review/fetch?movieId=" + movie?.id
    );
    return response.data;
  };

  useEffect(() => {
    const getAllReviews = async () => {
      const allReviews = await retrieveAllReviews();

      if (allReviews) {
        setReviews(allReviews.reviews);
        setRating(allReviews.averageRating);
      }
    };

    getAllReviews();
  }, []);

  return (
    <div
      class="list-group form-card border-color"
      style={{
        height: "28rem",
      }}
    >
      <div class="list-group-item list-group-item-action bg-color custom-bg-text">
        <b>
          Movie Rating: {rating}
          <img
            src={star}
            width="20"
            height="20"
            className="d-inline-block align-top"
            alt=""
          />
        </b>
      </div>
      <div
        style={{
          overflowY: "auto",
        }}
      >
        {reviews.map((review) => {
          return (
            <div class="list-group-item list-group-item-action ">
              <b className="">{review.user.firstName + " "}</b>
              <b className="">{review.star + " /5 "}</b>
              <img
                src={star}
                width="20"
                height="20"
                className="d-inline-block align-top"
                alt=""
              />
              <br />
              <p>{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetMovieReviews;
