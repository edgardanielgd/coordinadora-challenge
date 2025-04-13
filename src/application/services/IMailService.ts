export interface IMailService {

    mailTo(
        subject : string,
        content : string,
        to : string
    ) : Promise<boolean>;

}