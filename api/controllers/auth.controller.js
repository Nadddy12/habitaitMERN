import bcryptjs from 'bcryptjs';
import User from './../models/user.model.js';

const authController = {};

authController.singup = async ( req , res , next) => {
    const { username , email , password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username , email , password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json("user created successfully !")
    } catch (error) {
        next(error);
    };
};

authController.singin = async (req , res ,next) => {
    const {email , password} = req.body;
    
    try {
        const validUser = await User.findOne({email});
    } catch (error) {
        next(error);
    };
};


export default authController;