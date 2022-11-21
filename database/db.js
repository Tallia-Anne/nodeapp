
require('dotenv').config()
const Sequelize = require("sequelize");

console.log('\n les donnée:')
console.log('Schema  :', process.env.database)
console.log('User    :', process.env.host)
console.log('Passwd  :', process.env.password)
console.log('Host    :', process.env.host)
console.log('Port    :', process.env.port, '\n')


const db = {};


const dbinfo = new Sequelize(
    process.env.database,
    process.env.username,
    process.env.password,
    {
        host: process.env.host,
        dialect: 'postgres',
        port: process.env.port,
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
        console.error("unable to connect to the database:" + err);
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

dbinfo.sync({ force: true });

module.exports = db;