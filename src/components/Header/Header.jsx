import s from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

// стилізація активного лінка
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Header = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  return (
    <>
      <header className={s.header}>
        <ul className={s.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/contacts" className={buildLinkClass}>
            Contacts
          </NavLink>
        </ul>

        {/* вітання  user*/}
        {isLoggedIn && <p className="s.welkomTekst">Welcom, {user.email}</p>}

        {/* якщо user не зареєстрований - кнопки входу */}
        {!isLoggedIn && (
          <ul className={s.nav}>
            <NavLink to="/login" className={buildLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={buildLinkClass}>
              Register
            </NavLink>
          </ul>
        )}

        {/* якщо user зареєстрований - кнопка Виходу */}
        {isLoggedIn && (
          <button onClick={() => dispatch(logout())} className={s.button}>
            Logout
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
