type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> {
  const mailServiceUrl = process.env.MAIL_SERVICE_URL;
  const mailServiceKey = process.env.MAIL_SERVICE_KEY;

  if (!mailServiceUrl || !mailServiceKey) {
    throw new Error("Mail service is not configured");
  }

  const response = await fetch(`${mailServiceUrl}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-mail-service-key": mailServiceKey,
    },
    body: JSON.stringify({
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    }),
  });

  let data: {
    success?: boolean;
    message?: string;
  };

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from mail service");
  }

  if (!response.ok || !data.success) {
    console.error("Mail service request failed:", {
      status: response.status,
      message: data.message,
    });

    throw new Error("Unable to send email");
  }
}