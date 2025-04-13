/**
 * @openapi
 * components:
 *   schemas:
 *     Transporter:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         userId:
 *           type: integer
 *           format: int32
 *         status:
 *           type: string
 *       description: Represents a transporter, which is associated with a user and has a status.
 */

export class Transporter {
    private id: number;
    private userId: number;
    private status: string;

    constructor(id: number, userId: number, status: string) {
      this.id = id;
      this.userId = userId;
      this.status = status;
    }

    public getId(): number {
      return this.id;
    }

    public getUserId(): number {
      return this.userId;
    }

    public getStatus(): string {
      return this.status;
    }
  }