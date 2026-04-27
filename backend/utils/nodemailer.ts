import nodemailer from "nodemailer";

export const sendEmailVerificationCode = async (email: string,code: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your World Disaster Center Verification Code",
            html: template(code)
        });
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const template = (code: string) => { 
    return ` 
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .container {
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin: auto;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                padding: 10px;
                background: #f8f8f8;
                display: inline-block;
                border-radius: 5px;
                margin: 20px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Your World Disaster Center Verification Code</h2>
            <p>Use the code below to verify your email address. This code is valid for a limited time.</p>
            <div class="code">${code}</div>
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">&copy; 2025 Your Company. All rights reserved.</div>
        </div>
    </body>
    </html>
    `
    }