import bcryptjs from 'bcryptjs';
import User from './../models/user.model.js';
import { errorHandler } from './../utils/error.js';
import  jwt  from 'jsonwebtoken';

const authController = {};

authController.singup = async ( req , res , next) => {
    const { username , email , password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username , email , password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("Utilisateur créé avec succès !")
    } catch (error) {
        next(error);
    };
};

authController.singin = async (req , res ,next) => {
    const {email , password} = req.body;
    
    try {
        const validUser = await User.findOne({email});

        if (!validUser) return next(errorHandler(404, `Email ou mot de passe incorrect`));
        const validPassword = bcryptjs.compareSync(password , validUser.password);

        if(!validPassword) return next (errorHandler(401 , `Email ou mot de passe incorrect`));

        const token = jwt.sign({ id: validUser._id} , process.env.JWT_KEY)

        const { password: pass , ...userwithoutPW} = validUser._doc;

        res.cookie(`access_token` , token , {httpOnly: true , expires: new Date(Date.now() + 24 * 60 * 60 * 7)}).status(200).json(userwithoutPW)
    } catch (error) {
        next(error);
    };
};


export default authController;