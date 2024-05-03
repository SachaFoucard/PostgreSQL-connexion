const { Client } = require('pg');

const connexion = new Client({
    user: process.env.USER,
    password: process.env.MDP,
    host: 'localhost',
    port: process.env.PORT,
    database: 'postgres'
})

module.exports = connexion