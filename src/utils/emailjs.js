import { init, send } from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  init("ouEA5jIjHjqjdgo3u"); // Your EmailJS public key
};

// EmailJS service and template IDs
export const EMAIL_CONFIG = {
  serviceId: "service_m3l4n8e", // Your EmailJS service ID
  templateId: "template_6x9a0qa", // Template for messages TO you (from visitors)
  autoReplyTemplateId: "template_5b26ulv", // Template for auto-replies TO visitors
}; 

// Helper function to send auto-reply email
export const sendAutoReply = async (name, email) => {
  try {
    const response = await send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.autoReplyTemplateId,
      {
        to_name: name,
        email: email
      }
    );
    
    return { success: true, response };
  } catch (error) {
    console.error("Failed to send auto-reply:", error);
    return { success: false, error };
  }
}; 