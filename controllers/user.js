const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { error } = await registerValidation({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (error)
      return res.status(400).render("signup", { message: error.details[0].message });
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(422).render("signup", { message: "Email already exists!" });
    let newUserObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const newUser = await User.create(newUserObj);
    res.redirect("/lanix/upload");
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { error } = await loginValidation({
    email: req.body.email,
    password: req.body.password,
  });
  if (error) return res.status(400).render("signin", { message: error.details[0].message });
  try {
    const validUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!validUser)
      return res.status(400).render("signin", {message: "Invalid login credentials"} );
    res.redirect("/lanix/upload");
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});

module.exports = router;
