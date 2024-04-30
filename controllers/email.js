const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const send_mail = async (req, res, next) => {
    try {
        // Configuración de nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            posrt: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER_DEVSSOFT,
                pass: process.env.EMAIL_PASS_DEVSSOFT
            }
        });

        // Extraer el correo electrónico de la solicitud
        const { email } = req.body;

        // Crear el objeto de opciones del correo electrónico
        const mailOptions = {
            from: 'Devssoft <'+process.env.EMAIL_USER_DEVSSOFT+'>',
            to: email,
            subject: '¡Gracias por tu interés en nuestros servicios!',
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: rgb(14, 100, 150);
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 200px;
                        height: auto;
                    }
                    .content {
                        color: rgb(3, 51, 99);
                        margin-bottom: 20px;
                    }
                    .footer {
                        text-align: center;
                        color: rgb(10, 102, 194);
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://devssoft.es/static/media/logo.80dbd328fb96f2e0b3c2.png" alt="Logo de Devssoft">
                        <h1 style="color: rgb(3, 51, 99);">¡Gracias por tu interés en nuestros servicios!</h1>
                    </div>
                    <div class="content">
                        <p>Hola,</p>
                        <p>Gracias por ponerte en contacto con nosotros para solicitar una cotización. Estamos encantados de poder ayudarte.</p>
                        <p>Nuestro equipo revisará tu solicitud y te contactará pronto con más información. Mientras tanto, no dudes en explorar nuestro sitio web para conocer más sobre nuestros servicios y lo que podemos ofrecerte.</p>
                        <p>¡Esperamos poder trabajar contigo pronto!</p>
                    </div>
                    <div class="footer">
                        <p>Saludos cordiales,</p>
                        <p>Equipo de Devssoft</p>
                    </div>
                </div>
            </body>
            </html>
        `
        };

        const mailOptions_sendToAdmin = {
            from: 'Devssoft <'+process.env.EMAIL_USER_DEVSSOFT+'>',
            to: process.env.EMAIL_USER_DEVSSOFT,
            subject: 'Solicitu d de Cotización - Devssoft',
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: rgb(14, 100, 150);
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 200px;
                        height: auto;
                    }
                    .content {
                        color: rgb(3, 51, 99);
                        margin-bottom: 20px;
                    }
                    .footer {
                        text-align: center;
                        color: rgb(10, 102, 194);
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://devssoft.es/static/media/logo.80dbd328fb96f2e0b3c2.png" alt="Logo de Devssoft">
                        <h1 style="color: rgb(3, 51, 99);">AUTOMATIZADO</h1>
                    </div>
                    <div class="content">
                        <p>Hola,</p>
                        <p>Has recibido una solicitud de cotización de parte de ${email}</p>
                    </div>
                    <div class="footer">
                        <p>Saludos cordiales,</p>
                        <p>Equipo de Devssoft</p>
                    </div>
                </div>
            </body>
            </html>
        `
        };

        // Enviar el correo electrónico y esperar la respuesta
        const info = await transporter.sendMail(mailOptions);
        const info2 = await transporter.sendMail(mailOptions_sendToAdmin);

        // Envía una respuesta de éxito al cliente
        // console.log('Correo electrónico enviado: ' + info.response);
        res.status(200).send('Correo electrónico enviado correctamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el envío del correo electrónico
        console.error(error);
        res.status(500).send('Error al enviar el correo electrónico');
    }
};

const send_mail_newsletter = async (req, res, next) => {
    try {
        // Configuración de nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            posrt: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER_DEVSSOFT,
                pass: process.env.EMAIL_PASS_DEVSSOFT
            }
        });

        // Extraer el correo electrónico de la solicitud
        const { email } = req.body;

        // Crear el objeto de opciones del correo electrónico
        const mailOptions = {
            from: 'Devssoft <process.env.EMAIL_USER_DEVSSOFT>',
            to: email,
            subject: '¡Bienvenido a nuestro boletín informativo!',
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: rgb(14, 100, 150);
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .header img {
                            max-width: 200px;
                            height: auto;
                        }
                        .content {
                            color: rgb(3, 51, 99);
                            margin-bottom: 20px;
                        }
                        .footer {
                            text-align: center;
                            color: rgb(10, 102, 194);
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://devssoft.es/static/media/logo.80dbd328fb96f2e0b3c2.png" alt="Logo de Devssoft">
                            <h1 style="color: rgb(3, 51, 99);">¡Bienvenido a nuestro boletín informativo!</h1>
                        </div>
                        <div class="content">
                            <p>Hola,</p>
                            <p>Gracias por suscribirte a nuestro boletín informativo. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
                            <p>En nuestro boletín, recibirás noticias, actualizaciones y promociones exclusivas sobre nuestros productos y servicios. Esperamos que encuentres la información útil y relevante.</p>
                            <p>Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en cualquier momento.</p>
                            <p>¡Gracias de nuevo por unirte a nosotros! Esperamos poder proporcionarte contenido valioso y experiencias excepcionales.</p>
                        </div>
                        <div class="footer">
                            <p>Saludos cordiales,</p>
                            <p>Equipo de Devssoft</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // Enviar el correo electrónico y esperar la respuesta
        const info = await transporter.sendMail(mailOptions);

        // Envía una respuesta de éxito al cliente
        // console.log('Correo electrónico enviado: ' + info.response);
        res.status(200).send('Correo electrónico enviado correctamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el envío del correo electrónico
        console.error(error);
        res.status(500).send('Error al enviar el correo electrónico');
    }
};

module.exports = {
    send_mail,
    send_mail_newsletter
};
