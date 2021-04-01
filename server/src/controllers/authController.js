import express from 'express'
import User from '../users/schema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'

const router = express.Router();

function generateJWT (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req,res) => {
try {

    const {email} = req.body;

    if (await User.findOne({email})) {
        return res.status(400).send({error:"Usuário já existe"});
    }

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({
        user,
        token: generateJWT({id:user.id})
    })

} catch (err) {
    return res.status(400).send(err);
}
});

router.post('/authenticate', async (req,res) => {
    const { email,password } = req.body;
    
    const user = await User.findOne({ email }).select("+password");

    if (!user){
        return res.status(400).send({error:"Usuário não existe"});
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({error:"Senha inválida"});
    }

    user.password = undefined;


    return res.send({
        user,
        token: generateJWT({id:user.id})
    });
});

export default router;