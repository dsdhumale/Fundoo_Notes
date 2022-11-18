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



    
    
  