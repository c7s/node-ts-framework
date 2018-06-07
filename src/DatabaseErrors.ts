export type QueryFailedError = {
  name: string,
  code: number,
  constraint: string,
};

export class DatabaseErrors extends Error {

  public static isUniqueConstraintViolation(error: QueryFailedError) {
    // Integrity Constraint Violation - unique_violation
    // tslint:disable-next-line:triple-equals
    return 'QueryFailedError' === error.name && 23505 == error.code;
  }

  public static getConstraintName(error: QueryFailedError) {
    return error.constraint;
  }

}
