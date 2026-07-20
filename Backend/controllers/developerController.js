import Developer from "../models/Developer.js";

export const getDevelopers =
async(req,res)=>{

    try{

        const developers =
        await Developer.find();

        res.status(200)
        .json(developers);

    }
    catch(error){

        res.status(500)
        .json({
            message:error.message
        });

    }

};

export const getDeveloperById =
async(req,res)=>{

    try{

        const developer =
        await Developer.findById(
            req.params.id
        );

        if(!developer){

            return res.status(404)
            .json({
                message:
                "Developer not found"
            });

        }

        res.status(200)
        .json(developer);

    }
    catch(error){

        res.status(500)
        .json({
            message:error.message
        });

    }

};

export const createDeveloper =
async(req,res)=>{

    try{

        const developer =
        new Developer(req.body);

        const savedDeveloper =
        await developer.save();

        res.status(201)
        .json(savedDeveloper);

    }
    catch(error){

        res.status(500)
        .json({
            message:error.message
        });

    }

};