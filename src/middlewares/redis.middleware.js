import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const redisCheck = async (req, res, next) => {
    const notesdata = await client.get('getAllData');

    if (notesdata != null) {
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: JSON.parse(notesdata),
            message: "Redis: All notes fetched successfully"
        });
    }
    else {
        next();
    }
};
