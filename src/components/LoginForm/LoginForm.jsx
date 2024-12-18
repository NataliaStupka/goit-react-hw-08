import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; //маршрут до ...
import s from "./LoginForm.module.css";
import { Formik, Form, Field } from "formik";
import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const LoginForm = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(login(values));
    options.resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  //якщо юзер залогований - направляємо його на список контактів
  // інший варіант dispatch().unwrap().then((res) => navigate('/tasks'))
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }

  return (
    <div className={s.wrapper}>
      <h2>Login</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={s.form}>
          <Field name="email" placeholder="Enter email" />
          <Field name="password" type="password" placeholder="Enter pass" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
