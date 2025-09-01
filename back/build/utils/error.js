"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHelper = exports.UserAlreadyExistsError = exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
class UserAlreadyExistsError extends Error {
    constructor(message = "User already exists") {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
const errorHelper = (error, res) => {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    }
};
exports.errorHelper = errorHelper;
