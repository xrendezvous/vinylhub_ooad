import nodemailer from "nodemailer";

export class EmailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.ukr.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER || "vinylhub_platform@ukr.net",
                pass: process.env.SMTP_PASS || "ozEe4wDlavt5WFyA"
            }
        });

        this.sender = process.env.SMTP_USER || "vinylhub_platform@ukr.net";
    }

    async notifyUser(targetEmail, message, subject = "VinylHub Notification") {
        try {
            await this.transporter.sendMail({
                from: `"VinylHub" <${this.sender}>`,
                to: targetEmail,
                subject,
                text: message,
            });
            console.log("Email sent to ${targetEmail}");
        } catch (err) {
            console.error("Failed to send email to ${targetEmail}:", err);
        }
    }

    async notifyUsers(emailList, message, subject = "VinylHub Update") {
        if (!emailList || emailList.length === 0) return;
        try {
            const sendPromises = emailList.map(email =>
                this.transporter.sendMail({
                    from: `"VinylHub" <${this.sender}>`,
                    to: email,
                    subject,
                    text: message,
                })
            );

            await Promise.all(sendPromises);
            console.log("Emails sent to users [${emailList.join(", ")}]");
        } catch (err) {
            console.error("Failed to send mass email:", err);
        }
    }

    async sendPaymentSuccess(to, vinylTitle, amount, currency) {
        const subject = "Payment Successful — VinylHub";
        const message = `
        <h2>Дякуємо за покупку!</h2>
        <p>Ваш платіж за <strong>${vinylTitle}</strong> у сумі <strong>${amount} ${currency}</strong> було успішно проведено.</p>
        <p>Ви можете перевірити деталі у своєму профілі VinylHub.</p>
        <p style="color:gray;">Це автоматичне повідомлення. Будь ласка, не відповідайте на нього.</p>
        `;

        await this.transporter.sendMail({
            from: `"VinylHub" <${this.sender}>`,
            to,
            subject,
            html: message
        });
        console.log("Payment confirmation sent to ${to}");
    }

    async sendWishlistMatch(to, vinylTitle, price, currency) {
        const subject = "Бажаний вініл з’явився у продажу!";
        const message = `
        <h2>Ваш бажаний вініл доступний!</h2>
        <p>Вініл <strong>${vinylTitle}</strong> зараз у продажу за <strong>${price} ${currency}</strong>.</p>
        <p><a href="https://vinylhub.com/listings">Переглянути оголошення</a></p>
        <p style="color:gray;">Це автоматичне повідомлення від системи VinylHub.</p>
        `;

        await this.transporter.sendMail({
            from: `"VinylHub" <${this.sender}>`,
            to,
            subject,
            html: message
        });
        console.log("Wishlist notification sent to ${to}");
    }

    async sendRefundNotice(to, paymentId, amount, currency) {
        const subject = "Refund Processed — VinylHub";
        const message = `
        <h2>Ваше повернення коштів оброблено</h2>
        <p>Платіж <strong>${paymentId}</strong> було повернено у розмірі <strong>${amount} ${currency}</strong>.</p>
        <p>Якщо у вас є питання — зв’яжіться з нашою підтримкою.</p>
        <p style="color:gray;">Це автоматичне повідомлення від VinylHub.</p>
        `;

        await this.transporter.sendMail({
            from: `"VinylHub" <${this.sender}>`,
            to,
            subject,
            html: message
        });
        console.log("Refund notice sent to ${to}");
    }
}
