import { NavLink } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div>
      <NavLink
        to="/"
        style={{ fontSize: "20px", margin: "15px", lineHeight: 1.5 }}
      >
        Home page
      </NavLink>
      <RegisterForm />
    </div>
  );
};

export default Register;
