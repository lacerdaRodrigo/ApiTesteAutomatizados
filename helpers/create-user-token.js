//Creat tokem

const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    //retorno token
    res.status(200).json({name: user.name ,message:'Você está autenticado', token: token, userId: user._id})
}

module.exports = createUserToken