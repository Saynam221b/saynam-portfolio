import nodemailer from 'nodemailer';
    
    export default async function handler(req, res) {
      if (req.method !== 'POST') {
        return res.status(405).end();
      }
    
      const { name, email, message, smtpUser, smtpPass, recipientEmail } = req.body;
    
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    
      const mailOptions = {
        from: email,
        to: recipientEmail,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
