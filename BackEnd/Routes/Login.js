const Login = require("./LoginScheme");
const express = require("express");
const appLogin = express.Router();
const RegisterScheme = require("./Regscheme");
const bcrypt = require("bcryptjs");

appLogin.post("/", async (req, res) => {
  const FindEmail = await RegisterScheme.findOne({ email: req.body.email });

  if (FindEmail) {
    const passwordComapre = await bcrypt.compare(
      req.body.password,
      FindEmail.password
    );
    if (passwordComapre) {
      try {
        let passwordBcrypt = await bcrypt.hash(req.body.password, 10);
        const LoginTable = await Login({
          email: req.body.email,
          password: passwordBcrypt,
        });

        const loginSave = await LoginTable.save();

        if (loginSave.email !== "") {
          res.status(200).json({
            status: true,
            message: "login successful",
            data: {
              email: FindEmail.email,
              name: FindEmail.name,
              date: FindEmail.date,
            },
          });
        } else {
            res.status(400).json({
                status: true,
                message: "Some thing went wrong"
              });
        }
      } catch (e) {
        res.status(400).json({
          status: false,
          message: e.message,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Incorrect Password",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Email not present!",
    });
  }
});

module.exports = appLogin;
