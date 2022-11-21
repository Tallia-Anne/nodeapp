
require('dotenv').config()
const Sequelize = require("sequelize");

console.log('\n')
console.log('Schema  :', process.env.DB_SCHEMA)
console.log('User    :', process.env.DB_USER)
console.log('Passwd  :', process.env.DB_PASSWD)
console.log('Host    :', process.env.DB_HOST)
console.log('Port    :', process.env.DB_PORT, '\n')


const db = {};


const dbinfo = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: dialect,
        port: port,
        query: {
            raw: false
        },
        logging: false
    }
);

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