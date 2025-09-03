import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TheatreHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-theatre"));
  console.log(user);

  const theatreLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-theatre");
    sessionStorage.removeItem("theatre-jwtToken");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 2000); // Redirect after 3 seconds
  };
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Screens</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/theatre/screen/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add Screen</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/theatre/screen/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Screens</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Movies</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/theatre/movie/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add Movie</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/theatre/movie/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Movies</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Shows</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/theatre/show/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Add Show</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/theatre/show/view"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Shows</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Bookings</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/theatre/show/bookings"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Movie Bookings</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Theatre</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          {(() => {
            if (!user?.theatre) {
              return (
                <li class="nav-item">
                  <Link
                    to="/theatre/add"
                    class="nav-link active"
                    aria-current="page"
                  >
                    <b className="text-color">Add Theatre</b>
                  </Link>
                </li>
              );
            } else {
              return (
                <li class="nav-item">
                  <Link
                    to="/theatre/detail/view"
                    class="nav-link active"
                    aria-current="page"
                  >
                    <b className="text-color">View Detail</b>
                  </Link>

                  <Link
                    to="/theatre/wallet/detail"
                    class="nav-link active"
                    aria-current="page"
                  >
                    <b className="text-color">Wallet</b>
                  </Link>
                </li>
              );
            }
          })()}
        </ul>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={theatreLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default TheatreHeader;
