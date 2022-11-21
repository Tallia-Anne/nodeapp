
require('dotenv').config()
const Sequelize = require("sequelize");

console.log('\n les donnée:')
console.log('Schema  :', process.env.database)
console.log('User    :', process.env.host)
console.log('Passwd  :', process.env.password)
console.log('Host    :', process.env.host)
console.log('Port    :', process.env.port, '\n')


const db = {};


const dbinfo = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
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