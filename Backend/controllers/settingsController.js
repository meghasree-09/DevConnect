import Settings from "../models/Settings.js";

// Get User Settings
export const getSettings = async (req,res)=>{

    try{

        let settings = await Settings.findOne({
            user:req.params.userId
        });

        if(!settings){

            settings = await Settings.create({
                user:req.params.userId
            });

        }

        res.status(200).json(settings);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Update Settings
export const updateSettings = async (req,res)=>{

    try{

        const settings = await Settings.findOneAndUpdate(

            {
                user:req.params.userId
            },

            req.body,

            {
                new:true,
                upsert:true
            }

        );

        res.status(200).json(settings);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};