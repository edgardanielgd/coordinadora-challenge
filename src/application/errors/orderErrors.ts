export class InvalidOrder extends Error {
    constructor( message = 'Check order fields' ) {
        super(message);
    }
}

export class UnableToProcessOrder extends Error {
    constructor( message = 'Unable to process given order' ) {
        super(message);
    }
}

export class OrderNotFoundError extends Error {
    constructor( message = 'Unable to find order, check ID' ) {
        super(message);
    }
}

export class OrderSenderMatchesReceiver extends Error {
    constructor( message = 'Sender is the same receiver' ) {
        super(message);
    }
}

export class OrderBadLocation extends Error {
    constructor( message = 'Location address couldn\'t be resolved, please be more specific' ) {
        super(message);
    }
}

export class OrderInvalidCapacity extends Error {
    constructor( message = 'Vehicle can\'t handle the required capacity' ) {
        super(message);
    }
}