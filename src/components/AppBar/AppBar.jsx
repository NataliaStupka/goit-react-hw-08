//Header

import s from "./AppBar.module.css";

import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={s.header}>
      {/* HomePage, ContactsPage */}
      <Navigation />
      {/* welkomTekst, Logout_button */} {/* Login, Register */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
