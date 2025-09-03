import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");

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
          <b> Theatres</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/theatre/pending/"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Pending</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/theatre/approved"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Approved</b>
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
          <b> User</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link
              to="/admin/customer/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Customers</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/admin/theatre/manager/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Managers</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/user/admin/register"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">Register Admin</b>
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
          <b> Location</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/location/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Location</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/location/view/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Locations</b>
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
          <b> Screens</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          {/* <li class="nav-item">
            <Link
              to="/category/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Category</b>
            </Link>
          </li> */}

          <li class="nav-item">
            <Link
              to="/admin/theatre/screen/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Screens</b>
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
              to="/admin/theatre/movies/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Movies</b>
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
              to="/admin/theatre/show/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Shows</b>
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
              to="/admin/theatre/show/bookings"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">All Bookings</b>
            </Link>
          </li>
        </ul>
      </li>

      <li className="nav-item">
        <button
          onClick={adminLogout}
          className="btn btn-outline-danger ms-2 fw-bold"
          style={{ borderRadius: "30px" }}
        >
          Logout
        </button>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
