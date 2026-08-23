require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();


app.use(cors());
app.use(express.json()); //Here we parse the json strings that are coming

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.connect((err) => {
    if  (err) console.error('Database unreachable', err.stack); //Here we can check the server connection adn print a message to the console if anything is wrong
    else console.log('Connection working')
});

app.post('/api/register', async (req,res)=> {
    const { sync_code, initial_workspaces } = req.body;

    if (!sync_code) return res.status(400).json({error: 'Sync code is required' });
    try {
        const result = await pool.query(
            'INSERT INTO user_workspaces (sync_code, workspaces, last_updated) VALUES ($1, $2, NOW()) RETURNING *',
            [sync_code, JSON.stringify(initial_workspaces || [])]
        );
        res.status(201).json(result.rows[0]);
        } catch (err) {
            if (err.code === '23505') {
                return res.status(409).json({error: 'Sync code already exist'});
            }
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
});

app.get(`/api/sync/:code`, async (req, res)=> {
    const {code} = req.params;

    try {
        const result = await pool.query(
            'SELECT workspaces FROM user_workspaces WHERE sync_code = $1',
            [code]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Sync code not found'});
        }
        res.json(result.rows[0])
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

app.put('/api/sync/:code', async (req, res) => {
    const {code} = req.params;
    const { workspaces } = req.body;

    try {
        const result = await pool.query(
            'UPDATE user_workspaces SET workspace = $1, last_updated = NOW() WHERE sync_code = $2 RETURNING *',
            [JSON.stringify(workspaces), code]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Sync code not found'});
        }
        res.json({ message: 'Sync successful', last_updated: result.rows[0].last_updated});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Track.ME api running on port ${PORT}`);
})


