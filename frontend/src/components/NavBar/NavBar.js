import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/profile"}>Profile</Link>
          <button onClick={logoutUser}>LogOut</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={"/signup"}>SignUp</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  };
  return (
    <>
      <h1>Users</h1>
      {getLinks()}
    </>
  );
}

export default NavBar;
