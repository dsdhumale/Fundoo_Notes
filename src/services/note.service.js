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

  //update note by _id
export const updateNoteByID = async (_id, body) => {
    const data = await Note.findOneAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };
  