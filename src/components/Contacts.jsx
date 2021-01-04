import React from "react";
import SingleContact from "./SingleContact";
import "../App.css";

const Contacts = ({ contactList, setcontactList }) => {
  return (
    <div className="list">
      {/* <Link to="/add">
        <button className="add_button">+</button>
      </Link> */}
      {contactList.map((singleContact, index) => (
        <SingleContact
          key={index}
          index={index}
          singleContact={singleContact}
        />
      ))}
    </div>
  );
};
export default Contacts;
