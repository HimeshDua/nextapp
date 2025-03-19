import { VerificationEmail } from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendVerificationEmail = async (
  username: string,
  email: string,
  verificationCode: string
): Promise<ApiResponse> => {
  try {
    const emailHtml = await render(
      VerificationEmail({ username, verificationCode, email })
    );

    const [response] = await sgMail.send({
      to: email,
      from: "Himesh Dua <himeshcancode@gmail.com>",
      subject: "Hems Verification Code",
      html: emailHtml,
    });
    if (response.statusCode === 202) {
    }
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
};
