import express from 'express'
import authMiddleware from '../middlewares/auth.js'

const routerp = express.Router();

routerp.use(authMiddleware);

routerp.get('/', (req,res) => {
    return res.send({
        ok:true, 
        user:req.userId
    });
})

export default routerp;

