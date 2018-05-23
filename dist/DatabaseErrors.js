"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseErrors extends Error {
    static isUniqueConstraintViolation(error) {
        // Integrity Constraint Violation - unique_violation
        // tslint:disable-next-line:triple-equals
        return 'QueryFailedError' === error.name && 23505 == error.code;
    }
    static getConstraintName(error) {
        return error.constraint;
    }
}
exports.DatabaseErrors = DatabaseErrors;
//# sourceMappingURL=DatabaseErrors.js.map