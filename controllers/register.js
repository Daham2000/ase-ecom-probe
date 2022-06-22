import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import validator from "email-validator";

export const signup = (req, res) => { User.findOne({ email: req.body.Email })
    .then((userObject) => {
    
    const result=validator.validate(req.body.Email);

    if (userObject == null) {

        if (result) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            const user = new User({
              name: req.body.username,
              email: req.body.Email,
              birthday: req.body.birthDay,
              password: hash,
            });

            user.save().then((result) => {
                res.status(200).json({
                    isRegistered: true,
                    message: "Your registration successful!!!",
                  });
              })
              .catch((err) => {
                res.status(200).json({
                    isRegistered: false,
                    message:
                      "Your registration unsuccessful Please try again...",
                  });
                console.log(err);
              });

          });

        } else{
            res.status(200).json({ isRegistered: "Please input a valid Email" });
        }

      }else {
        res.status(200).json({ isRegistered: false,
        message: "This Email is already in exits" });
      }
      
    })
    .catch((errorObject) => {
      res.status(500).json(errorObject);
      console.log(errorObject);
    });
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result != null) {
        bcrypt.compare(
          req.body.password,
          result.password,
          function (err, finalOut) {
            if (finalOut === true) {
              const data = {
                email: result.email,
                name: result.name,
              };
              res
                .status(200)
                .json({
                  isRegistered: true,
                  message: "Success",
                  data: JSON.stringify(data),
                });
            } else {
              res
                .status(200)
                .json({
                  isRegistered: false,
                  message: "Your user name and password are incorrect",
                });
            }
          }
        );
      } else {
        res
          .status(200)
          .json({ isRegistered: false, message: "Email not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log(error);
    });
};
