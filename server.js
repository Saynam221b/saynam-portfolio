import express from 'express';
    import nodemailer from 'nodemailer';
    import bodyParser from 'body-parser';
    import cors from 'cors';
    
    const app = express();
    const port = 3001;
    
    app.use(cors({
      origin: 'https://saynam-portfolio-19qy.vercel.app/',
      credentials: true
    }));
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
      res.send('Server is running');
    });
    
    app.post('/api/send-email', async (req, res) => {
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
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
