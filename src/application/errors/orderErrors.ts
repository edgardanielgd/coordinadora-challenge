export class InvalidOrder extends Error {
    constructor( message = 'Check order fields' ) {
        super(message);
    }
}

export class OrderNotFoundError extends Error {
    constructor( message = 'Unable to find order, check ID' ) {
        super(message);
    }
}