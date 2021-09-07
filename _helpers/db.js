const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// module.exports = db = {};

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "192.168.7.9",
    username: "utax", //process.env.DATABASE_USERNAME,
    password: "", //process.env.DATABASE_PASSWORD,
    database: "timeline", //process.env.DATABASE_NAME,
    // port: +process.env.DATABASE_PORT || 3306,
    timezone: '+07:00' //for writing to database
});

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.User = require('../users/user.model')(sequelize, Sequelize);
db.Event = require('../events/event.model')(sequelize, Sequelize);

//Relations
// db.comments.belongsTo(db.posts);
// db.posts.hasMany(db.comments);
// db.posts.belongsTo(db.users);
// db.users.hasMany(db.posts);

module.exports = db;