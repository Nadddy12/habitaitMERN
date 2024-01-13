import List from "../models/list.model.js";
import { errorHandler } from "../utils/error.js";


const listController = {};

listController.create = async (req , res , next ) => {
    try {
        const list = await List.create(req.body);
        return res.status(201).json(list);
    } catch (error) {
        next(error);
    };
};

listController.delete = async (req , res , next ) => {
    const list = await List.findById(req.params.id);

    if(!list) {
        return next(errorHandler(404 , `L'annonce est introuvable`))
    }

    if(req.user.id !== list.userRef) {
        return next(errorHandler(401 , `non autorisé à supprimer cette annonce`))
    }
    try {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json(`L'annonce a été supprimée`)
    } catch (error) {
        next(error)
    };
};

export default listController;