import AdminHeader from "./AdminHeader";

import HeaderUser from "./HeaderUser";
import NormalHeader from "./NormalHeader";
import TheatreHeader from "./TheatreHeader";
import RestaurantHeader from "./TheatreHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const theatre = JSON.parse(sessionStorage.getItem("active-theatre"));

  if (user != null) {
    return <HeaderUser />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (theatre != null) {
    return <TheatreHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
