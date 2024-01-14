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

listController.update = async (req , res , next) => {
    const list = await List.findById(req.params.id);

    if(!list) {
        return next(errorHandler(404 , `L'annonce est introuvable`))
    }

    if(req.user.id !== list.userRef) {
        return next(errorHandler(401 , `non autorisé à modifier cette annonce`))
    }

    try {
        const updatedList = await List.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedList);
    } catch (error) {
        next(error);
    };
};

listController.get = async (req , res ,next) => {
    try {
        const list = await List.findById(req.params.id);

        if(!list) {
            return next(errorHandler(404 , `L'annonce est introuvable`))
        }
        res.status(200).json(list);
    } catch (error) {
        next(error);
    };
};

listController.getList = async (req , res , next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        
        if(offer === undefined || offer === 'false') {
            offer = {$in: [false , true]};
        }

        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === 'false') {
            furnished = { $in: [false , true]};
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false') {
            parking = { $in: [false , true]};
        }

        let type = req.query.type;

        if(type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent']};
        }

        const search = req.query.search || '';

        const sort = req.query.sort || 'CreatedAt';

        const order = req.query.order || 'desc';

        const list = await List.find({
            name: { $regex: search , $options: 'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(list);

    } catch (error) {
        next(error);
    };
};

export default listController;