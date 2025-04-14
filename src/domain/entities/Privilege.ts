/**
 * @openapi
 * components:
 *   schemas:
 *     Privilege:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         userId:
 *           type: integer
 *           format: int32
 *         name:
 *           type: string
 *       description: Represents a privilege assigned to a user.
 */

export class Privilege {
    private id : number;
    private userId : number;
    private name : string;

    constructor(
        id : number,
        userId : number,
        name: string,
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getName(): string {
        return this.name;
    }
}
