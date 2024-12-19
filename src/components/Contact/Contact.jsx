import s from "./Contact.module.css";
//icon
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

import { useDispatch } from "react-redux";

import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const Contact = ({ data: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
    toast(`Контакт '${name}' з номером: ${number}  видалено.`);
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <p>
          <FaUser className={s.icon} />
          {name}
        </p>
        <p>
          <FaPhone className={s.icon} />
          {number}
        </p>
      </div>
      <button className={s.button} onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
