const router = require("express-promise-router")();

//importing the ProfileController
const {
  createUser,
  viewUsers,
  lookupUsers,
  viewUser,
  createContact,
  viewContacts,
  viewContact,
} = require("../controllers/profile");
//Importing Validation modules
router.post("/users", createUser);
router.get("/users/view", viewUsers);
router.get("/users/look", lookupUsers);
router.get("/users/:id", viewUser);
router.post("/contacts", createContact);
router.get("/contacts", viewContacts);
router.get("/contacts/:id", viewContact);

module.exports = router;
