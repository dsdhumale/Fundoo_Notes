import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', noteValidator,userAuth,noteController.createNote);

//route to get all notes
router.get('',userAuth,noteController.getAllNotes);

//route to get particular or single note
router.get('/:_id',userAuth,noteController.getNoteByID);

//route to update particular or single note
router.put('/:_id',userAuth,noteController.updateNoteByID);

//route to delete particular or single note
router.delete('/:_id',userAuth,noteController.deleteNoteByID);

//route to archive perticular or single note
router.put('/:_id/archive',userAuth,noteController.isArchived);

export default router;