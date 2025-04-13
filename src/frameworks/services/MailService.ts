import { IMailService } from "../../application/services/IMailService";
import nodemailer from "nodemailer"

export interface MailerConfig {
    host : string,
    port : number,
    user : string,
    password : string,
}

export class MailService implements IMailService {

    config : MailerConfig;
    transport : nodemailer.Transporter;

    constructor (
        config : MailerConfig
    ) {
        this.config = config;
        this.transport = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth : {
                user: config.user,
                pass: config.password,
            }
        });
    }

    public async mailTo(
        subject : string,
        content : string,
        to : string
    ) : Promise<boolean> {

        const mailOptions = {
            from: `"Shippings Mailer" <${this.config.user}>`,
            to, subject, content
        };

        const result = await this.transport.sendMail( mailOptions );

        if ( !result ) return false;

        return true;
    }

}