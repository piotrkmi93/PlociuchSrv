import * as nodeMailer from 'nodemailer';
import {nodeMailerConfig} from '../../config/mail';

export class CoreMailer
{

    /**
     * Transporter instace for sending emails, based on config from mail.ts file.
     *
     * @type {Mail}
     */
    private transporter: nodeMailer.Transporter = nodeMailer.createTransport({
        service: nodeMailerConfig.service,
        auth: {
            user: nodeMailerConfig.user,
            pass: nodeMailerConfig.password
        }
    }, {
        from: nodeMailerConfig.user
    });

    /**
     * Function that send message to given email.
     *
     * @param {string} to
     * @param {string} subject
     * @param {string} html
     * @returns {Promise<SentMessageInfo>}
     */
   public send(to: string, subject: string, html: string): Promise<nodeMailer.SentMessageInfo>
   {
       const text = html.replace(/<(?:.|\n)*?>/gm, '');

       var mailOptions: nodeMailer.SendMailOptions = {
           from:    nodeMailerConfig.user,
           to:      to,
           subject: subject,
           text:    text,
           html:    html
       };

       return this.transporter
           .sendMail(mailOptions);
   }

}