import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
	service: 'gmail', // or your email service provider
	auth: {
		user: process.env.EMAIL, // Your email
		pass: process.env.EMAIL_PASSWORD, // Your email password
	},
});

export const sendEmail = async (to, subject, htmlTemplateFunc, templateData) => {
	try {
		const htmlContent = htmlTemplateFunc(templateData);

		const mailOptions = {
			from: process.env.EMAIL,
			to: to,
			subject: subject,
			html: htmlContent,
		};

		await transporter.sendMail(mailOptions);
		console.log('Email sent successfully!');
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
