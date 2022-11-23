import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', noteValidator,userAuth,noteController.createNote);

//route to get all notes
router.get('',userAuth,noteController.getAllNotes);

export default router;