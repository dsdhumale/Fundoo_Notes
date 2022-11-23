import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to create a new notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const createNote = async (req, res, next) => {
    try {
      const data = await NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };