import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'

export default (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({error:"Você não tem permissão, logue-se"});
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({error:"Você não tem permissão, logue-se"});
    }

    const [scheme, token] = parts;
    
    if(!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({error:"Token mal formated"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error:"Token Invalid"});

        req.userId = decoded.id;
        
        return next();
    })

}