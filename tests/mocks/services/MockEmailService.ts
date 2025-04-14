import { IMailService } from "../../../src/application/services/IMailService";

export class MockMailService implements IMailService {
  public sentEmails: {
    subject: string;
    html: string;
    to: string;
  }[] = [];

  public async mailTo(subject: string, html: string, to: string): Promise<boolean> {
    this.sentEmails.push({ subject, html, to });
    return true; // Simulate success
  }

  public reset(): void {
    this.sentEmails = [];
  }

  public getLastEmail() {
    return this.sentEmails[this.sentEmails.length - 1] ?? null;
  }
}