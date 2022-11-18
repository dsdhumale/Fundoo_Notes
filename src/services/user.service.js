import User from '../models/user.model';

//create new user
export const newUserRegistration = async (body) => {
  const data = await User.find({emailID: body.emailID});
  if (data.length != 0) {
    throw new Error("Already exist,Enter another")
  } else {
    const data = await User.create(body);
  return data;
  
}
};

//Login with email ID and password
export const login = async (body) => {
  const data = await User.find({emailID: body.emailID});
  if (data.length !== 0) {
    const data = await User.find({password: body.password});
    if(data.length != 0){
      return data;
    }
    else {
      throw new Error("Entered Password is Invalid ");
    }
  } else {
    throw new Error("Entered EmailID is Invalid")
  }
};


    
    
  