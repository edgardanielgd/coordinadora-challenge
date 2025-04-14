export class UnableToSendMail extends Error {
    constructor( message = 'UnableToSendMail' ) {
        super(message);
    }
}