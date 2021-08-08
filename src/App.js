import { Component } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';

import ContactForm from './Components/ContactForm';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  newContact = ({ name, number }) => {
    const contact = { name, number, id: uuidv4() };

    const foundContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    foundContact
      ? alert(`${name} is already in contacts`)
      : this.setState({ contacts: [...this.state.contacts, contact] });
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onFilter = (e) => {
    console.log(e);
  };

  handleDelete = ({ target }) => {
    const id = target.id.split(':')[1];
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="App-header">
        <h1>Phonebook</h1>

        <ContactForm newContact={this.newContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.onChange} />
        <ContactList
          filteredContacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
