
const jwt = require('jsonwebtoken');
const mongo = require('mongoose');
const User = require('../models/User');

const { jwtkey } = require('../keys')

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: "You are not logged In" })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtkey, async (err, actual_token) => {
        if (err) {
            return res.status(401).send({ error: "There is error in token" })
        }
        console.log(actual_token);
        const userid = actual_token.sub;
        console.log('userid = ' + userid)
        const user = await User.findById(userid);
        userdetails = user;
        next();
    });

}