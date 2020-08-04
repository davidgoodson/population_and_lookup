const contacts = require("../models/contacts");
const users = require("../models/users");
const mongoose = require("mongoose");

module.exports = {
  createUser: async (req, res) => {
    req.body._id = new mongoose.Types.ObjectId();
    const user = await new users(req.body);
    const result = await user.save();
    return res
      .status(200)
      .json({ Message: "User account succesfully created!", user: result });
  },
  viewUsers: (req, res) => {
    //while using populate, ensure that even the users collection comms array field has values of the _ids of contacts
    // to populate else it will return an empy array
    users
      .find()
      .populate("comms")
      .exec((err, users) => {
        if (err) return res.status(200).json(err);
        else return res.status(200).json(users);
      });
  },
  lookupUsers: async (req, res) => {
    //with look up, only one collection should have a foreighn field of another, eg contacts here as a field
    // called user which is the _id of the users collection
    // lookup is better than populate since a foreighn field only as to be in one collection while populate requires that
    // both collections have foreighn fields of others, where the owning collection will have a array of ids of the
    // collection it owns and the owned collection will have a field with an id of the collection it belongs to
    const results = await users.aggregate([
      {
        $lookup: {
          from: "contacts",
          localField: "_id",
          foreignField: "user",
          as: "contacts",
        },
      },
    ]);
    return res.status(200).json(results);
  },
  viewUser: (req, res) => {
    users
      .findOne({ _id: req.params.id })
      .populate("comms")
      .exec((err, user) => {
        if (err) return res.status(200).json(err);
        else return res.status(200).json(user);
      });
  },
  createContact: async (req, res) => {
    const contact = await new contacts(req.body);
    const result = await contact.save();
    /*
    Now update the comms field in the users collection with the new contact
    Yes, the contacts collection already has a record user of type users collection showing that it belongs to that
     users collection, but if you are going to use mongoose's populate, its necessary to update the owner collection
    as well
    */
    const updateUser = await users.updateOne(
      { _id: result.user },
      { $push: { comms: result._id } }
    );
    return res
      .status(200)
      .json({ Message: "Contact succesfully created!", contact: result });
  },
  viewContact: (req, res) => {
    contacts
      .findOne({ _id: req.params.id })
      .populate("user")
      .exec((err, contact) => {
        if (err) return res.status(200).json(err);
        else return res.status(200).json(contact);
      });
  },
  viewContacts: (req, res) => {
    contacts
      .find()
      .populate("user")
      .exec((err, contacts) => {
        if (err) return res.status(200).json(err);
        else return res.status(200).json(contacts);
      });
  },
};
