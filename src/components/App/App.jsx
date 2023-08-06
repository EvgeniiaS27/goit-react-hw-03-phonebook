import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { FormAddContacts } from 'components/FormAddContacts/FormAddContacts';
import { FilterContacts } from 'components/FilterContacts/FilterContacts';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const id = nanoid(4);

    this.setState(prevState => {
      if (
        this.state.contacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`${name} is already to contacts`);
        return;
      }
      return {
        contacts: [...prevState.contacts, { id: id, name, number }],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <FormAddContacts onSubmit={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <FilterContacts
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <ContactsList
          onDeleteContact={this.deleteContact}
          contacts={this.getVisibleContacts()}
        />
      </div>
    );
  }
}
