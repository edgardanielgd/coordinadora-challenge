import { Privilege } from "../../../src/domain/entities/Privilege";
import { User } from "../../../src/domain/entities/User";
import { IUserRepository } from "../../../src/application/repositories/IUserRepository";

export class TestUserRepository implements IUserRepository {
    private users: User[] = [];
    private privileges: Map<number, Privilege[]> = new Map();
    private currentId = 1;
    private currentPrivilegeId = 1;

    async findById(id: number): Promise<User | null> {
      return this.users.find(user => user.getId() === id) || null;
    }

    async checkUserExistence(
      document: string, documentType: string,
      username: string, email: string
    ): Promise<boolean> {
      return this.users.some(
        user =>
          (user.getDocument() === document && user.getDocumentType() === documentType) ||
          user.getUsername() === username ||
          user.getEmail() === email
      );
    }

    async findByDocument(document: string, documentType: string): Promise<User | null> {
      return this.users.find(
        user => user.getDocument() === document && user.getDocumentType() === documentType
      ) || null;
    }

    async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
      return this.users.find(
        user => user.getUsername() === usernameOrEmail || user.getEmail() === usernameOrEmail
      ) || null;
    }

    async findByUsername(username: string): Promise<User | null> {
      return this.users.find(user => user.getUsername() === username) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
      return this.users.find(user => user.getEmail() === email) || null;
    }

    async getUserRoles(user: User): Promise<Privilege[]> {
      return this.privileges.get(user.getId()) || [];
    }

    async save(
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
    ): Promise<User | null> {
      const newUser = new User(
        this.currentId++,
        username,
        document,
        documentType,
        password,
        email,
        status,
        firstName,
        secondName,
        firstSurname,
        secondSurname
      );
      this.users.push(newUser);
      return newUser;
    }

    async addPrivilege(user: User, name: string): Promise<Privilege[]> {
      const newPrivilege = new Privilege(this.currentPrivilegeId++, user.getId(), name);
      const current = this.privileges.get(user.getId()) || [];
      current.push(newPrivilege);
      this.privileges.set(user.getId(), current);
      return current;
    }
  }