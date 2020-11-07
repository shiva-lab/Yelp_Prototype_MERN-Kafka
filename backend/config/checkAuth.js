const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const keys = require('./keys');


module.exports = (req, res, next) => {
    try {
        console.log("In Authorization")
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token, secretOrKey);
        req.userData = decoded;
        console.log("Decoding Payload")
        console.log(req.userData)
        console.log("Payload Decoded Successfully")
        console.log("Authorization Successful")
        next();
    } catch (error) {
        console.log("Failed Auth", error)
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};