import { init } from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
};

// EmailJS service and template IDs
export const EMAIL_CONFIG = {
  serviceId: "service_m3l4n8e", // Replace with your actual EmailJS service ID
  templateId: "template_xhbfk6c", // Replace with your actual EmailJS template ID
  autoReplyTemplateId: "template_b0gx8w8", // Replace with your auto-reply template ID
}; 