import { Formik, Form, Field, ErrorMessage } from "formik"; //форма
import * as Yup from "yup"; //валідація форми
import { nanoid } from "nanoid"; //id //включений в Redux
import s from "./ContactForm.module.css";

import { useDispatch, useSelector } from "react-redux";
//import { addContact } from "../../redux/contactsOps";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { selectContacts } from "../../redux/contacts/selectors";

const ContactForm = () => {
  //початкові значення форми, (прописуємо у Formik)
  const initialValues = {
    username: "",
    tel: "",
  };

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  //values це initialValues
  const handleSubmit = (values, options) => {
    options.resetForm(); // очистка форми

    const newContact = {
      id: nanoid(),
      name: values.username, //з name Field
      number: values.tel,
    };

    //
    const dublicate = contacts.some(
      (contact) =>
        contact.name === newContact.name && contact.number === newContact.number
    );
    if (dublicate) {
      toast.error(`Контакт з таким ім'ям чи телефоном вже є у списку.`);
      return;
    }

    dispatch(addContact(newContact));

    toast.success(
      `Контакт '${newContact.name}' з номером: ${newContact.number} додано!`
    );
  };

  // валідация, прописуємо у Formik
  const contactSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short!")
      .max(50, "Поле не може бути більше ніж 50 символи")
      .required("Required"),
    tel: Yup.number()
      .positive("Число має бути додатним")
      .integer("Число має бути цілим")
      .required("Required"),
  });

  return (
    <div className={s.wrapper}>
      {/* Formik має 2 обов'язкові поля: onSubmit={}, obj={initialValues}, +validationSchema */}
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={contactSchema}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field type="text" name="username" placeholder="Name" />
            <ErrorMessage
              name="username"
              component="span"
              className={s.error}
            />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <Field type="text" name="tel" placeholder="Phone number" />
            <ErrorMessage name="tel" component="span" className={s.error} />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
