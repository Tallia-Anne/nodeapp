const Express = require("express"),
    router = Express.Router(),
    { Op } = require("sequelize"),
    db = require("../database/db");

// cette route permet de créer un article
router.post("/new", (req, res) => {
    //pouvoir le stoker
    var image = req.body.image;

    db.article
        .findOne({
            // recuperer la reference du article
            where: { ref: req.body.ref },
        })
        .then((article) => {
            if (!article) {
                db.article
                    .create(req.body)
                    .then((articleitem) => {
                        db.image
                            .create({
                                Status: 1,
                                image: req.body.image,
                                articleId: articleitem.id,
                            })
                            .then((image) => {
                                res.status(200).json({
                                    articleId: articleitem,
                                    image: image,
                                    message: "ok ",
                                });
                            })
                            .catch((err) => {
                                res.json(err);
                            });
                    })
                    .catch((err) => {
                        res.status(400).send("error" + err);
                    });
            } else {
                article
                    .update({
                        stock: req.body.stock,
                    })
                    .then((rep) => {
                        res.status(200).json({ article: rep });
                    })
                    .catch((err) => {
                        res.status(403).json("not updated");
                    });
            }
        })
        .catch((err) => {
            res.status(404).json("Not found");
        });
});

// cette route permet d'afficher tous les articles
router.get("/all", (req, res) => {
    db.article
        .findAll({
            include: [{
                model: db.image,
            }, ],
        })
        .then((articles) => {
            if (articles) {
                res.status(200).json({
                    articles: articles,
                });
            } else {
                res.status(404).json("il n'a pas de articles");
            }
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/limit/:limit", (req, res) => {
    db.article
        .findAll({
            include: [{
                model: db.image,
            }, ],
            limit: parseInt(req.params.limit),
        })
        .then((articles) => {
            res.status(200).json({ articles: articles });
        })
        .catch((err) => {
            res.status(502).json("bad req" + err);
        });
});

router.get("/all/:limit/:offset", (req, res) => {
    db.article
        .findAll({
            include: [{
                model: db.image,
            }, ],
            offset: parseInt(req.params.offset),
            limit: parseInt(req.params.limit),
        })
        .then((reponse) => {
            res.status(200).json({ article: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});

// cette route permet d'ajouter une image
router.post("/addimage", (req, res) => {
    var id = req.body.id;
    db.image
        .create({
            image: req.body.image,
            articleId: req.body.id,
        })
        .then(() => {
            db.article
                .findOne({
                    where: { id: id },
                    include: [{
                        model: db.image,
                    }, ],
                })
                .then((article) => {
                    res.status(200).json({
                        article: article,
                    });
                })
                .catch((err) => {
                    res.json(err);
                });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/findBy/:nom", (req, res) => {
    db.article
        .findAll({
            where: {
                nom: {
                    [Op.like]: "%" + req.params.nom,
                },
            },
            include: [{
                model: db.image,
            }, ],
        })
        .then((articles) => {
            res.status(200).json({ articles: articles });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/getById/:id", (req, res) => {
    db.article
        .findOne({
            where: { id: req.params.id },
            include: [{
                model: db.image,
            }, ],
        })
        .then((article) => {
            res.status(200).json({ article: article });
        })
        .catch((err) => {
            res.json(err);
        });
});
router.get("/findBy/getById/:id/:gamme", (req, res) => {
    db.article
        .findOne({
            where: { id: req.params.id },
            nom: {
                [Op.like]: "%" + req.params.nom,
            },
            include: [{
                model: db.image,
            }, ],
        })
        .then((article) => {
            res.status(200).json({ article: article });
        })
        .catch((err) => {
            res.json(err);
        });
});
// delete article //:id = donne un paramètre 
router.delete("/delete/:id", (req, res) => {
    // find the article and delete
    db.article.findOne({
            where: { id: req.params.id }
        }).then(article => {
            //if  article exist so
            if (article) {
                article.destroy().then(() => {
                        res.json("article deleted")
                    })
                    .catch(err => {
                        res.json("error" + err)
                    })
            } else {
                res.json({
                    error: "you can't delete this article it not exist in you list of article"
                })
            }
        })
        .catch(err => {
            //send back the message error
            res.json("error" + err);
        })
});

module.exports = router;