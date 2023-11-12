import { validationResult } from "express-validator"

export const runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let errorList = errors.array().map((error) => error.msg)
        return res.status(400).send({error: errorList})
    }
    next()
}
