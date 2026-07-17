import User from "../models/users.js";

export async function getUser(req,res){
    try{
        const users=await User.find();
        res.status(200).json({
            success:true,
            users
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

};

export async function getUserById(req,res){
   try{
        const user=await User.findById(req.params.id);
         if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        });
    };
    res.status(200).json({
        success:true,
        user
    })
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            

        })
    }
  };
export async function addUser(req,res){
  try{
        const user=await User.create(req.body);
        res.status(201).json({
            success:true,
            message:"user registered successfully",
            user
        })
    }
    catch(error){
    res.status(500).json({
        success:false,
        message:error.message,
    
    });
}
};
export async function updateUser(req,res){
  try{
        const user =await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true
        }

        );
        
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"user updated successfully",
        user

    });
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message,
    });
}
};
export async function deleteUser(req,res){
    try{
        const user =await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
  };