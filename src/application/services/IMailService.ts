export interface IMailService {

    mailTo(
        subject : string,
        html : string,
        to : string
    ) : Promise<boolean>;

}