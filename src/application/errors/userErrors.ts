export class UserAlreadyExitsError extends Error {
    constructor( message = 'An user with that document and document type does already exist' ) {
        super(message);
        this.name = 'UserAlreadyExitsError'
    }
}

export class UserNotFoundError extends Error {
    constructor( message = 'Couldn\'t find user with provided email or password' ) {
        super(message);
        this.name = 'UserNotFoundError'
    }
}

export class InvalidUserError extends Error {
    constructor( message = 'User data provided is invalid' ) {
        super(message);
        this.name = 'InvalidUserError'
    }
}