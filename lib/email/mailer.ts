type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({
  to,
  subject,
  text,
}: SendEmailOptions): Promise<void> {
  /*
   * Email delivery is intentionally isolated from authentication logic.
   *
   * In development, we log the email metadata so the authentication
   * flow can be tested without depending on an external email provider.
   *
   * In production, this function will be connected to the approved
   * transactional email provider.
   */

  if (process.env.NODE_ENV !== "production") {
    console.log("Development email:", {
      to,
      subject,
      text,
    });

    return;
  }

  throw new Error("Production email provider is not configured");
}
