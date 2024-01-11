import List from "../models/list.model.js";


const listController = {};

listController.create = async (req , res , next ) => {
    try {
        const list = await List.create(req.body);
        return res.status(201).json(list);
    } catch (error) {
        next(error);
    };
};

export default listController;