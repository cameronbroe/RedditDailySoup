import {Response} from "express";

export function successResponse(message: string, data: any, res: Response) {
    res.status(200).json({
        status: 'success',
        message,
        data
    })
}

export function databaseError(err: any, res: Response) {
    res.status(500).json({
        status: 'error',
        message: 'There was an error with the database.',
        data: err
    })
}

export function insufficientParameters(res: Response) {
    res.status(400).json({
        status: 'error',
        message: 'The parameters supplied are insufficient, please refer to the documentation for the correct parameters.',
        data: {}
    })
}

export function errorResponse(message: String, res: Response) {
    res.status(200).json({
        status: 'error',
        message: message,
        data: {}
    })
}
