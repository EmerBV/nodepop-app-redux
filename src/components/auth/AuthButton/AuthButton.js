import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { authLogout } from "../../../store/actions";
import { getIsLogged } from "../../../store/selectors";

const style = {
  button:
    "items-center rounded border border-[#282b2f] font-semibold px-8 py-1",
};

function AuthButton({ className }) {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    dispatch(authLogout());
  };

  return isLogged ? (
    <button className={style.button} onClick={handleLogoutClick}>
      Logout
    </button>
  ) : (
    <button
      as={Link}
      to="/login"
      className={classNames(`${style.button}`, className)}
    >
      Login
    </button>
  );
}

export default AuthButton;
