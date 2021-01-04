import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

const ContactForm = ({ contactList, setcontactList, addContact }) => {
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("id", id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetch(`http://localhost:3000/contacts/${id}`, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
          accept: "application/json, text/plain",
          "content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          history.push("/");
        });
    } else {
      fetch("http://localhost:3000/contacts", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          accept: "application/json, text/plain",
          "content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          history.push("/");
        });
    }
  };
  const getOne = () => {
    fetch(`http://localhost:3000/contacts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContact({ ...data });
        console.log("infoo", contact);
      });
  };

  useEffect(() => {
    if (id) {
      getOne();
    }
  }, []);

  return (
    <div className="contactForm">
      <Form primary>
        <div className="buttons">
          <Button className="btn_submit" onClick={handleSubmit}>
            Save
          </Button>
          <Link to="/">
            <Button className="btn_cancel">Cancel</Button>
          </Link>
        </div>
        <div className="inputs">
          <Form.Input
            type="text"
            className="input"
            placeholder="name"
            value={contact.name}
            name="name"
            onChange={handleChange}
          />

          <Form.Input
            type="text"
            className="input"
            placeholder="phone"
            value={contact.phone}
            name="phone"
            onChange={handleChange}
          />

          <Form.Input
            type="text"
            className="input"
            placeholder="email"
            value={contact.email}
            name="email"
            onChange={handleChange}
          />
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
