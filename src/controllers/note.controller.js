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
 /**
   * Controller to get all notes
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const getAllNotes = async (req, res, next) => {
    try {
      const data = await NoteService.getAllNotes();
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'All Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
   /**
   * Controller to get note by _id
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
    export const getNoteByID = async (req, res, next) => {
        try {
          const data = await NoteService.getNoteByID(req.params._id);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note fetched successfully'
          });
        } catch (error) {
          next(error);
        }
      };
       /**
   * Controller to update note by _id
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const updateNoteByID = async (req, res, next) => {
    try {
      const data = await NoteService.updateNoteByID(req.params._id, req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  

  /**
   * Controller to delete note by _id
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
   export const deleteNoteByID = async (req, res, next) => {
    try {
      const data = await NoteService.deleteNoteByID(req.params._id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
//Controller to archive note
export const isArchived  = async (req, res, next) => {
    try {
      const data = await NoteService.isArchived(req.params._id,req.body.userID);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note Archived done successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  //Controller to trash note

  export const isTrash  = async (req, res, next) => {
    try {
      const data = await NoteService.isTrash(req.params._id,req.body.userID);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note move to Trash successfully'
      });
    } catch (error) {
      next(error);
    }
  };

