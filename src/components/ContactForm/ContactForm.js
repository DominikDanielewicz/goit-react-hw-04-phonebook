import React, { useState } from 'react';
import propTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = props => {
  const [formValues, setFormValues] = useState({
    name: '',
    number: '',
  });

  const { name, number } = formValues;

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formValues;
    props.addContact(name, number);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label className={css.contactForm__label} htmlFor="name">
        Name
      </label>
      <input
        className={css.contactForm__field}
        id="name"
        value={name}
        onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]+(([' \-][a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż])?[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.contactForm__label} htmlFor="number">
        Number
      </label>
      <input
        className={css.contactForm__field}
        id="number"
        value={number}
        onChange={handleChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.contactForm__button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: propTypes.func.isRequired,
  deleteContact: propTypes.func.isRequired,
};

export default ContactForm;
