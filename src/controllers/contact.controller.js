const Contact = require("../models/contact.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Contact
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    // Save Contact in the database
    Contact.create(contact, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Contact."
            });
        else res.send(data);
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
    Contact.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts."
        });
      else res.send(data);
    });
  };

// Find a single Contact with a ContactId
exports.findOne = (req, res) => {
    Contact.findById(req.params.contactId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contact with id ${req.params.contactId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Contact with id " + req.params.contactId
          });
        }
      } else res.send(data);
    });
  };

// Update a Contact identified by the ContactId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Contact.updateById(
      req.params.contactId,
      new Contact(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Contact with id ${req.params.contactId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Contact with id " + req.params.contactId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Contact with the specified ContactId in the request
exports.delete = (req, res) => {
    Contact.remove(req.params.contactId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contact with id ${req.params.contactId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Contact with id " + req.params.contactId
          });
        }
      } else res.send({ message: `Contact was deleted successfully!` });
    });
  };

// Delete all Contact from the database.
exports.deleteAll = (req, res) => {
    Contact.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all contacts."
        });
      else res.send({ message: `All Contacts were deleted successfully!` });
    });
  };