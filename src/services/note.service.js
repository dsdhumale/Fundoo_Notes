import Note from '../models/note.model';
import { client } from '../config/redis';

//create a new note
export const createNote = async (body) => {
  await client.del('getAllData');
  const data = await Note.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (userID) => {
  const data = await Note.find({ userID });
  await client.set('getAllData',JSON.stringify(data));
  if (data.length != 0) {
    return data;
  }
  else {
    throw new Error("Notes are not created for this user");
  }
};

//get note by _id
export const getNoteByID = async (_id, userID) => {
  const data = await Note.findOne({ _id, userID });
  if (data !== null) {
    return data;
  } else {
    throw new Error("Incorrect note ID");
  }
};

//update note by _id
export const updateNoteByID = async (_id, userID, body) => {
  await client.del('getAllData');
  const data = await Note.findOneAndUpdate( { _id, userID }, body, { new: true } );
  if (data !== null) {
    return data;
  } else {
    throw new Error("Incorrect note ID");
  }
};

//delete note by _id
export const deleteNoteByID = async (_id, userID) => {
  await client.del('getAllData');
  const data = await Note.findOneAndDelete({ _id, userID });
  if (data !== null) {
    return data;
  } else {
    throw new Error("Incorrect note ID");
  }
};

//Archive note by _id

export const isArchived = async (_id, userID) => {
  await client.del('getAllData');
  const data = await Note.findByIdAndUpdate({_id,userID},{ isArchived: true },{new: true});
  if (data !== null) {
    return data;
  } else {
    throw new Error("Incorrect note ID");
  }
};

//Trash note by _id

export const isTrash = async (_id, userID) => {
  await client.del('getAllData');
  const data = await Note.findByIdAndUpdate({ _id,userID },{ isTrash: true },{ new: true });
  if (data !== null) {
    return data;
  } else {
    throw new Error("Incorrect note ID");
  }
};
