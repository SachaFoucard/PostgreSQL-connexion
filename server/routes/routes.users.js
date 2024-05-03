const express = require('express');
const route = express.Router();
const client  = require('../config/db');

// GET all users
route.get('/users', async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// GET user by ID
route.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// CREATE a new user
route.post('/users', async (req, res) => {
    const { name, lastname, age } = req.body;
    try {
        const { rows } = await client.query('INSERT INTO users (name, lastname, age) VALUES ($1, $2, $3) RETURNING *', [name, lastname, age]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// UPDATE user by ID
route.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastname, age } = req.body;
    try {
        const { rows } = await client.query('UPDATE users SET name = $1, lastname = $2, age = $3 WHERE id = $4 RETURNING *', [name, lastname, age, id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE user by ID
route.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (rows.length > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = route;
