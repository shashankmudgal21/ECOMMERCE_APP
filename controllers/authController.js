import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/user.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exists please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    user.save();
    res.send({
      success: true,
      message: "User registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "error in register",
        error,
      });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }
    const match = await comparePassword(password,user.password);
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid password"
        })
    }
    const token =  jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.status(200).send({
        success:true,
        message:"User login",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
export const testController = (req,res)=>{
    res.send('protected')
}

export const forgotPasswordController = async(req,res) =>{
try {
  const {email,answer,newPassword} = req.body;
  if(!email){
    res.status(400).send({
      succes:false,
      message:"Email is required",
    })
  }
  if(!answer){
    res.status(400).send({
      succes:false,
      message:"answer is required",
    })
  }
  if(!newPassword){
    res.status(400).send({
      succes:false,
      message:"New password is required",
    })
  }

  const user = await User.findOne({email,answer});
  const hd = await hashPassword(newPassword);
  await User.findByIdAndUpdate(user._id,{password:hd});
  res.status(200).send({
    success:true,
    message:"password updated succesfully+-"
  })
} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:"something went wrong",
    error,
  })
}
}
export const updateProfileController = async(req,res)=>{
  try {
    const {name,email,password,address,phone} = req.body
    const user = await User.findById(req.user.id);
    if(password && password.length<6){
      res.status(400).send({
        success:false,
        message:"Password is too short"
      })
    }
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{
      name:name || user.name,
      email:email || user.email,
      password:hashedPassword || user.password,
      address:address || user.address,
      phone:phone || user.phone,
    },{new:true})
    res.status(200).send({
      success:true,
      updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      error
    })
  }
}
