const Sequelize = require("sequelize");


const db = {};


const dbinfo = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    
});


dbinfo
    .authenticate()
    .then(() => {
        console.log("connection to the db");
    })
    .catch((err) => {
        console.error("unable to connect to the datase:" + err);
    });


// Importation des tables:
db.contact = require("../Model/Contact")(dbinfo, Sequelize);
db.article = require("../Model/Article")(dbinfo, Sequelize);
db.image = require("../Model/Image")(dbinfo, Sequelize);
// Les relations:


db.article.hasMany(db.image, { foreignKey: "articleId" });


// Les tables intermediarres:



db.dinfo = dbinfo;

db.Sequelize = Sequelize;

//dbinfo.sync({ force: true });

module.exports = db;