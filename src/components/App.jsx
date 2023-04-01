import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    let contactId = nanoid();
    const names = contacts.map(contact => contact.name);

    if (!names.find(el => el === name)) {
      setContacts(prevState => [
        ...prevState,
        { id: contactId, name: name, number: number },
      ]);
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const deleteContact = id => {
    const allContacts = [...contacts];
    const index = allContacts.findIndex(person => person.id === id);
    allContacts.splice(index, 1);
    setContacts(allContacts);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storageContacts) {
      setContacts(storageContacts);
    }
  }, []);

  // const componentDidMount() {
  //   const storageContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (storageContacts) {
  //     this.setState({
  //       contacts: storageContacts,
  //     });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // const componentDidUpdate(prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const list = contacts.filter(
    contact =>
      filter === '' || contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <h1>PhoneBook</h1>
      <ContactForm addContact={addContact} deleteContact={deleteContact} />
      <h2>Contacts</h2>
      <Filter change={handleFilter} value={filter} />
      <ContactList list={list} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
