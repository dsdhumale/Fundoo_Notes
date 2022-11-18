import User from '../models/user.model';
import bcrypt from 'bcrypt';


//Register and create new user and hashing password
export const newUserRegistration = async (body) => {
  const email = await User.find({ emailID: body.emailID });
  if (email.length != 0) {
    throw new Error("Already exist,Enter another")
  } else {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  }
};



//Login with email ID and password
export const login = async (body) => {
  const data = await User.find({ emailID: body.emailID });
  if (data.length !== 0) {
    const data = await User.find({ password: body.password });
    if (data.length != 0) {
      return data;
    }
    else {
      throw new Error("Entered Password is Invalid ");
    }
  } else {
    throw new Error("Entered EmailID is Invalid")
  }
};




