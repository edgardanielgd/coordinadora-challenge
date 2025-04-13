/**
* @openapi
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - username
*         - document
*         - documentType
*         - password
*         - email
*         - status
*         - firstName
*         - firstSurname
*       properties:
*         username:
*           type: string
*         document:
*           type: string
*         documentType:
*           type: string
*         password:
*           type: string
*         email:
*           type: string
*         status:
*           type: string
*         firstName:
*           type: string
*         secondName:
*           type: string
*           nullable: true
*         firstSurname:
*           type: string
*         secondSurname:
*           type: string
*           nullable: true
*         roles:
*           type: array
*           items:
*             type: string
*       description: A user model containing basic information
*/
export class User {
    private id: number;
    private username: string;
    private document: string;
    private documentType: string;
    private password: string;
    private email: string;
    private status: string;
    private firstName: string;
    private secondName: string | null;
    private firstSurname: string;
    private secondSurname: string | null;

    constructor(
        id: number,
        username: string,
        document: string,
        documentType: string,
        password: string,
        email: string,
        status: string,
        firstName: string,
        secondName: string | null,
        firstSurname: string,
        secondSurname: string | null,
    ) {
        this.id = id;
        this.username = username;
        this.document = document;
        this.documentType = documentType;
        this.password = password;
        this.email = email;
        this.status = status;
        this.firstName = firstName;
        this.secondName = secondName;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
    }

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getDocument(): string {
        return this.document;
    }

    public getDocumentType(): string {
        return this.documentType;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getStatus(): string {
        return this.status;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getSecondName(): string | null {
        return this.secondName;
    }

    public getFirstSurname(): string {
        return this.firstSurname;
    }

    public getSecondSurname(): string | null {
        return this.secondSurname;
    }
}
