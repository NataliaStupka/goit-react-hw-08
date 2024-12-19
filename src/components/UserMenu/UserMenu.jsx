import s from "./UserMenu.module.css";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  return (
    <>
      {/* вітання  user*/}
      <p className="s.welkomTekst">
        Welcom, <span className={s.user}>{user.email}</span>
      </p>

      {/* кнопка Виходу */}
      <button onClick={() => dispatch(logout())} className={s.button}>
        Logout
      </button>
    </>
  );
};

export default UserMenu;
