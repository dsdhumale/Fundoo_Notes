import Note from '../models/note.model';

//create a new note
export const createNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//get all notes
export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
  };

//get note by _id
export const getNoteByID = async (_id) => {
    const data = await Note.findById(_id);
    return data;
  };