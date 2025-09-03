import { Link } from "react-router-dom";
import location from "../images/location.png";

const TheatreCard = (theatre) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <div className="card theatre-card shadow-lg border-0 rounded-4 h-100">
        {/* Image Flush with Top */}
        <div
          style={{
            height: "200px",
            width: "100%",
            overflow: "hidden",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        >
          <img
            src={`http://localhost:8080/api/theatre/${theatre.item.image}`}
            alt="img"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* City Badge */}
          <span
            style={{
              backgroundColor: "#EB455F",
              color: "#fff",
              fontWeight: "bold",
              padding: "4px 10px",
              borderRadius: "8px",
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "0.85rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {theatre.item.location.city}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body px-4 py-3">
          <h5 className="card-title text-color-second fw-bold text-truncate h5">
            {theatre.item.name}
          </h5>
          <p
            className="card-text text-muted mb-2"
            style={{ fontSize: "0.9rem" }}
          >
            {descriptionToShow(theatre.item.description, 60)}
          </p>
        </div>

        {/* Card Footer */}
        <div className="card-footer bg-white border-top-0 px-4 pb-4">
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={`/customer/theatre/${theatre.item.id}/shows`}
              className="btn custom-bg-text px-4 py-2 fw-bold shadow-sm rounded-pill"
              style={{ backgroundColor: "#eb455f" }}
            >
              View Shows
            </Link>

            <div className="d-flex align-items-center">
              <img
                src={location}
                width="20px"
                className="me-2"
                alt="location"
              />
              <small className="text-muted">
                {theatre.item.location.downtown}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheatreCard;
