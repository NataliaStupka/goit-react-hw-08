import { Field, Form, Formik } from "formik";
import s from "./RegisterationForm.module.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../../redux/auth/operations";

const RegisterationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //для перенаправлення на контакти

  const handleSubmit = (values, options) => {
    dispatch(register(values))
      .unwrap() // чекаємо відповідь і перенаправляємо на список контактів
      .then((res) => {
        toast(`Welcom, ${res.user.name}`);
        navigate("/contacts");
      })
      .catch(() => {
        toast.error("Сталася помилка! Спробуй ще раз.");
      });

    options.resetForm();
  };

  //потрібне для бекенду при реїстрації
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className={s.wrapper}>
      <h2>Register</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={s.form}>
          <Field name="name" placeholder="Enter name" />
          <Field name="email" placeholder="Enter email" />
          <Field name="password" type="password" placeholder="Enter pass" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterationForm;
