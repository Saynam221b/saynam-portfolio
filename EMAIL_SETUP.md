# Setting Up EmailJS for Contact Form

This document provides instructions for setting up EmailJS to make the contact form work with Gmail SMTP.

## Steps to Set Up EmailJS

1. **Create an EmailJS Account**
   - Go to [EmailJS website](https://www.emailjs.com/) and sign up for an account
   - The free tier allows 200 emails per month

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Select "Gmail" as the service provider
   - Follow the instructions to connect your Gmail account
   - Name your service (e.g., "gmail_service")

3. **Create Email Templates**
   - Go to "Email Templates" in your dashboard
   - You'll need to create two templates:

   ### Main Contact Form Template
   - Click "Create New Template"
   - Design your email template with the following variables:
     - `{{name}}` - Sender's name
     - `{{email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Message content
   - Save your template and note the Template ID

   ### Auto-Reply Template
   - Click "Create New Template" again
   - Design an auto-reply template with the following variables:
     - `{{to_name}}` - User's name
     - `{{to_email}}` - User's email
     - `{{from_name}}` - Your name
     - `{{subject}}` - Email subject
     - `{{message}}` - Auto-reply message
   - Save your template and note the Auto-Reply Template ID

4. **Update Configuration in the Project**
   - Open `src/utils/emailjs.js`
   - Replace `YOUR_USER_ID` with your EmailJS User ID (found in Account > API Keys)
   - Replace `YOUR_SERVICE_ID` with your Gmail service ID
   - Replace `YOUR_TEMPLATE_ID` with your main email template ID
   - Replace `YOUR_AUTOREPLY_TEMPLATE_ID` with your auto-reply template ID

## Example Configuration

```javascript
import { init } from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  init("user_aBcDeFgHiJkLmNoPqR"); // Your actual User ID
};

// EmailJS service and template IDs
export const EMAIL_CONFIG = {
  serviceId: "gmail_service", // Your actual Service ID
  templateId: "template_contact123", // Your actual Template ID
  autoReplyTemplateId: "template_autoreply456", // Your actual Auto-Reply Template ID
};
```

## HTML Template for Auto-Reply Email

Here's a sample HTML template you can use for the auto-reply email:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Me</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #7C3AED;
        }
        .header h1 {
            color: #7C3AED;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #7C3AED;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Message</h1>
        </div>
        <div class="content">
            <p>Hello {{to_name}},</p>
            <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
            <p>Here's a summary of your inquiry:</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p>In the meantime, feel free to check out my portfolio for more information about my work and projects.</p>
            <center>
                <a href="https://yourportfolio.com" class="button">Visit My Portfolio</a>
            </center>
        </div>
        <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>© 2023 Saynam Sharma | Data Engineer & Full Stack Developer</p>
        </div>
    </div>
</body>
</html>
```

## Testing the Contact Form

After setting up EmailJS:

1. Run the application
2. Go to the Contact section
3. Fill out the form and submit
4. You should receive the confirmation email at your address, and the user should receive an auto-reply

## Troubleshooting

- If emails are not being sent, check the browser console for error messages
- Verify your EmailJS account is active and within the free tier limits
- Make sure your Gmail account allows access from less secure apps or has app passwords set up if using 2FA 