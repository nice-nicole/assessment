import React from "react";
import { List, Image, Modal, Button, Header } from "semantic-ui-react";
import user_photo from "../images/photo.png";
import { useHistory } from "react-router-dom";
import "../App.css";

const SingleContact = ({ singleContact }) => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  return (
    <div>
      <List divided inverted relaxed>
        <List.Item className="item">
          <Image src={user_photo} size="small" height="20px" />
          <List.Content>
            <List.Header
              as="a"
              className="names"
              onClick={() => {
                history.push(`/contact-details?id=${singleContact.id}`);
              }}
            >
              {singleContact.name}
            </List.Header>
          </List.Content>
        </List.Item>
      </List>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Contact Details</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={user_photo} wrapped />
          <Modal.Description>
            <Header>{singleContact.name}</Header>
            <p>phone: {singleContact.phone}.</p>
            <p>email adress: {singleContact.email}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Delete
          </Button>
          <Button
            content="Update"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SingleContact;
