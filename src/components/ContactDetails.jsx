import React, { useState, useEffect } from "react";
import { Image, Modal, Header } from "semantic-ui-react";
import user_photo from "../images/photo.png";
import { useHistory, Link } from "react-router-dom";
import portal from "../portal";
import "../App.css";

const ContactDetails = ({ singleContact }) => {
  const [open, setOpen] = useState(true);
  const [info, setInfo] = useState({ name: "", phone: "", email: "" });
  const [openPortal, setOpenPortal] = useState(true);
  const [message, setMessage] = useState({
    message: "helloo i need aka popup",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("id", id);

  const history = useHistory();

  const getOne = () => {
    fetch(`http://localhost:3000/contacts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInfo({ ...data });
        console.log("infoo", info);
      });
  };
  useEffect(() => {
    getOne();
  }, []);

  const deleteContact = () => {
    fetch(`http://localhost:3000/contacts/${id}`, {
      method: "DELETE",
      body: JSON.stringify(info),
      headers: {
        accept: "application/json, text/plain",
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpenPortal(true);
        setMessage({ ...data });
        setInfo({ ...data });
        console.log("infoo", info);
        history.push("/");
      });
  };

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="Modal"
      >
        <Modal.Header>
          <h2>Contact Details</h2>
        </Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={user_photo} wrapped />
          <Modal.Description>
            <Header>names: {info.name}</Header>
            <p>phone: {info.phone}.</p>
            <p>email adress: {info.email}</p>
          </Modal.Description>
        </Modal.Content>
        {/* <Modal.Actions> */}
        <div className="Actions">
          <button color="red" onClick={deleteContact} className="delete_btn">
            Delete
          </button>
          <button
            className="update_btn"
            onClick={() => {
              history.push(`/new-contact?id=${id}`);
            }}
          >
            Edit
          </button>
          {/* </Modal.Actions> */}
        </div>
        <Link to="/">
          <p className="go_to_contacts">return to list of contacts</p>
        </Link>
      </Modal>
      {message && (
        <portal
          open={openPortal}
          handleClose={() => setOpenPortal(false)}
          text={message.message}
        />
      )}
    </div>
  );
};

export default ContactDetails;
