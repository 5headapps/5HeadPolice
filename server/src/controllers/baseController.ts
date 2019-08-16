import { TypedError } from "../models/TypedError";

export abstract class BaseController {

    constructor() {
    }

    protected sendTyped400(res, err: TypedError) {
        let strErr = JSON.stringify(err);
        res.err = strErr;
        res.status(400).send(strErr);
    }

    protected send400(res, err: string) {
        res.err = err;
        res.status(400).send({ message: err });
    }

    protected send500(res, err: string) {
        res.err = err;
        res.status(500).send({ message: err });
    }
}