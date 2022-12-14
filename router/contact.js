// cette route va permet d'envoyer un email
//route generique
const express = require("express");
const router = express.Router();
db = require("../database/db");



// route permet faire mot de passe oublié
router.post("/sendcontact", (req, res) => {
    db.contact
        .findOne({
            // recuperer l'adresse email
            where: { email: req.body.email },
        })
        .then((contact) => {
            if (!contact) {
                db.contact
                    .create(req.body)
                    .then((item) => {
                        var nodemailer = require("nodemailer");
                        var transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "erinawambiekele@gmail.com",
                                pass: "kwvdrkmkrhaqczkg",
                            },
                        });

                        var mailOptions = {
                            from: "erinawambiekele@gmail.com",
                            to: item.email,
                            subject: req.body.sujet,
                            // corps
                            text:  req.body.message,


                        };

                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                res.json(error);
                                console.log(error);
                            } else {
                                console.log("email sent" + info.response);
                                res.json("email sent" + info.response);
                            }
                        });
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            } else {
                res.status(404).json("contact not found");
            }
        })
        .catch((err) => {
            res.json(err);
        });
});


module.exports = router;