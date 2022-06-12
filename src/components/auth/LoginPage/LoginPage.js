import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormField from "../../common/FormField";

import { authLogin, uiResetError } from "../../../store/actions";
import { getUi } from "../../../store/selectors";

const style = {
  loginWrapper:
    "items-center text-center rounded border border-[#282b2f] m-4 p-10",
  loginTittle: "flex font-extrabold",
  formContainer: "justify-center",
  placeholderContainer: "px-4 border border-[#151b22] outline-none",
  rememberContainer: "flex items-center py-2",
  rememberText: "pl-2",
  loginButton:
    "flex items-center rounded border border-[#282b2f] font-semibold px-8 py-1",
};

function LoginPage() {
  const ref = useRef(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const { email, password, remember } = credentials;

  const handleChange = ({ target: { value, name, type, checked } }) => {
    setCredentials((credentials) => ({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authLogin(credentials));
  };

  return (
    <div className={style.loginWrapper}>
      <h1 className={style.loginTittle}>Log In</h1>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <FormField
          type="email"
          name="email"
          label="email"
          className={style.placeholderContainer}
          value={email}
          onChange={handleChange}
          ref={ref}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className={style.placeholderContainer}
          value={password}
          onChange={handleChange}
        />

        <div className={style.rememberContainer}>
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            value="remember"
            onChange={handleChange}
          />
          <label className={style.rememberText}>Remember me</label>
        </div>

        <button
          className={style.loginButton}
          type="submit"
          disabled={!email || !password || isLoading}
        >
          Log In
        </button>
      </form>
      {error && <div onClick={resetError}>{error.message}</div>}
    </div>
  );
}

export default LoginPage;
