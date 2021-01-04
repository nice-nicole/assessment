import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contacts from "./components/Contacts";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";
import phone from "./images/img.jpg";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [contactList, setcontactList] = useState([]);

  const getContacts = () => {
    fetch("http://localhost:3000/contacts")
      .then((response) => response.json())
      .then((data) => {
        setcontactList([...data]);
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={phone} className="App-logo" alt="logo" />
        <div className="top-left">
          <Router>
            <Switch>
              <Route exact path="/contact-details">
                <ContactDetails
                  contactList={contactList}
                  setcontactList={setcontactList}
                />
              </Route>
              <Route exact path="/new-contact">
                <ContactForm
                  contactList={contactList}
                  setcontactList={setcontactList}
                />
              </Route>
              <Route exact path="/">
                <div className="h_title">
                  <header>Contacts</header>
                  <Link to="/new-contact">
                    <button className="add_button">+</button>
                  </Link>
                </div>
                <Contacts
                  contactList={contactList}
                  setContactList={setcontactList}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
};

export default App;
