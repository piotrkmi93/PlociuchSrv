"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodeMailer = require("nodemailer");
var mail_1 = require("../../config/mail");
var CoreMailer = /** @class */ (function () {
    function CoreMailer() {
        /**
         * Transporter instace for sending emails, based on config from mail.ts file.
         *
         * @type {Mail}
         */
        this.transporter = nodeMailer.createTransport({
            service: mail_1.nodeMailerConfig.service,
            auth: {
                user: mail_1.nodeMailerConfig.user,
                pass: mail_1.nodeMailerConfig.password
            }
        }, {
            from: mail_1.nodeMailerConfig.user
        });
    }
    /**
     * Function that send message to given email.
     *
     * @param {string} to
     * @param {string} subject
     * @param {string} html
     * @returns {Promise<SentMessageInfo>}
     */
    CoreMailer.prototype.send = function (to, subject, html) {
        var text = html.replace(/<(?:.|\n)*?>/gm, '');
        var mailOptions = {
            from: mail_1.nodeMailerConfig.user,
            to: to,
            subject: subject,
            text: text,
            html: html
        };
        return this.transporter
            .sendMail(mailOptions);
    };
    return CoreMailer;
}());
exports.default = CoreMailer;
//# sourceMappingURL=CoreMailer.js.map