"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHelper = void 0;
const errorHelper = (error, res) => {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    }
    else {
        res.status(400).json({ error: error });
    }
};
exports.errorHelper = errorHelper;
