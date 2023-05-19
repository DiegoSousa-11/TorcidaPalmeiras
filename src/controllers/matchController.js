const axios = require('axios');
const API_KEY_FOOTBALL = '1e4d938cb1f04831a6d062265501e775';

async function listLastMatches(req, res) {
    const limit = req.query.limit ? req.query.limit : 4;

    const options = {
        method: 'GET',
        url: `https://api.football-data.org/v4/teams/1769/matches?status=FINISHED&limit=${limit}`,
        headers: {
            'X-Auth-Token': API_KEY_FOOTBALL,
        },
    };

    try {
        const response = await axios.request(options);

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getNextMatch(req, res) {
    const options = {
        method: 'GET',
        url: `https://api.football-data.org/v4/teams/1769/matches?status=SCHEDULED&limit=1`,
        headers: {
            'X-Auth-Token': API_KEY_FOOTBALL,
        },
    };

    try {
        const response = await axios.request(options);

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = {
    listLastMatches,
    getNextMatch,
}