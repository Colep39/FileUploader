const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername } = require('../models/userModel');

async function registerUser(req, res){
    const { username, password } = req.body;
    const existing = await findUserByUsername(username);
    if (existing){
        return res.status(400).send('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    await createUser({ username, password: hashed});
    res.redirect('/login');
}

module.exports = { registerUser };