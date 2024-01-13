import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from './../models/user.model.js';
import List from './../models/list.model.js';


const userController = {};

userController.updateUser = async ( req , res , next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401 , "Vous pouvez mettre à jour uniquement votre compte"));
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id ,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    };
};

userController.deleteUser = async (req , res , next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401 , "Vous pouvez supprimer uniquement votre compte"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie(`access_token`);
        res.status(200).json(`L'utilisateur a été supprimé`)
    } catch (error) {
        next(error)
    };
};

userController.getUserList = async (req , res , next) => {
    if(req.user.id === req.params.id) {
        try {
            const list = await List.find({ userRef: req.params.id });
            res.status(200).json(list);
        } catch (error) {
            next(error);
        };
    } else {
        return next(errorHandler(401 , `Non autorisé à obtenir la liste d'autres personnes`))
    };
};

userController.getUser = async (req , res , next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(!user) return next(errorHandler(404 , `Utilisateur non trouvé !`))
    
        const { password: pass , ...userWithoutPW } = user._doc;
    
        res.status(200).json(userWithoutPW);
    } catch (error) {
        next(error);
    };
};


export default userController;