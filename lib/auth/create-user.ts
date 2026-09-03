import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { generateStaffId } from "@/lib/auth/staff-id";
import { generateTemporaryPassword } from "@/lib/auth/temporary-password";
import { sendEmail } from "@/lib/email/mailer";

type CreateUserInput = {
  hospitalId: string;
  departmentId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "LAB_TECHNICIAN" | "PHARMACIST";
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildWelcomeEmail({
  firstName,
  staffId,
  temporaryPassword,
  activationUrl,
}: {
  firstName: string;
  staffId: string;
  temporaryPassword: string;
  activationUrl: string;
}) {
  const safeFirstName = escapeHtml(firstName);
  const safeStaffId = escapeHtml(staffId);
  const safeTemporaryPassword = escapeHtml(temporaryPassword);
  const safeActivationUrl = escapeHtml(activationUrl);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to HealthSync</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color:#f4f7fb;"
  >
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Main container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:620px;
            background-color:#ffffff;
            border:1px solid #e5eaf2;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 4px 18px rgba(15,23,42,0.06);
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color:#2563eb;
                padding:28px 36px;
              "
            >
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="52" valign="middle">
                    <div
                      style="
                        width:42px;
                        height:42px;
                        line-height:42px;
                        text-align:center;
                        border-radius:12px;
                        background-color:#ffffff;
                        color:#2563eb;
                        font-size:22px;
                        font-weight:700;
                      "
                    >
                      H
                    </div>
                  </td>

                  <td valign="middle" style="padding-left:12px;">
                    <div
                      style="
                        color:#ffffff;
                        font-size:20px;
                        line-height:26px;
                        font-weight:700;
                      "
                    >
                      HealthSync
                    </div>

                    <div
                      style="
                        color:#dbeafe;
                        font-size:12px;
                        line-height:18px;
                        margin-top:2px;
                      "
                    >
                      Electronic Health Record
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:38px 36px 32px 36px;">

              <div
                style="
                  color:#0f172a;
                  font-size:25px;
                  line-height:34px;
                  font-weight:700;
                  margin-bottom:10px;
                "
              >
                Welcome to HealthSync
              </div>

              <div
                style="
                  color:#475569;
                  font-size:15px;
                  line-height:24px;
                  margin-bottom:28px;
                "
              >
                Hello ${safeFirstName}, your HealthSync staff account has
                been created successfully.
              </div>

              <!-- Account created badge -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin-bottom:24px;
                  background-color:#eff6ff;
                  border:1px solid #dbeafe;
                  border-radius:12px;
                "
              >
                <tr>
                  <td style="padding:16px 18px;">
                    <div
                      style="
                        color:#1d4ed8;
                        font-size:13px;
                        line-height:20px;
                        font-weight:700;
                      "
                    >
                      ACCOUNT CREATED
                    </div>

                    <div
                      style="
                        color:#475569;
                        font-size:13px;
                        line-height:20px;
                        margin-top:3px;
                      "
                    >
                      Your account is ready for activation.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Credentials -->
              <div
                style="
                  color:#0f172a;
                  font-size:16px;
                  line-height:24px;
                  font-weight:700;
                  margin-bottom:12px;
                "
              >
                Your account details
              </div>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  border:1px solid #e2e8f0;
                  border-radius:12px;
                  margin-bottom:24px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:17px 18px;
                      border-bottom:1px solid #e2e8f0;
                    "
                  >
                    <div
                      style="
                        color:#64748b;
                        font-size:12px;
                        line-height:18px;
                        margin-bottom:5px;
                      "
                    >
                      STAFF ID
                    </div>

                    <div
                      style="
                        color:#0f172a;
                        font-size:16px;
                        line-height:22px;
                        font-weight:700;
                        letter-spacing:0.3px;
                      "
                    >
                      ${safeStaffId}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:17px 18px;">
                    <div
                      style="
                        color:#64748b;
                        font-size:12px;
                        line-height:18px;
                        margin-bottom:5px;
                      "
                    >
                      TEMPORARY PASSWORD
                    </div>

                    <div
                      style="
                        color:#0f172a;
                        font-size:16px;
                        line-height:22px;
                        font-weight:700;
                        letter-spacing:1px;
                        font-family:monospace;
                      "
                    >
                      ${safeTemporaryPassword}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Activation section -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:12px;
                  margin-bottom:28px;
                "
              >
                <tr>
                  <td
                    align="center"
                    style="padding:24px 20px;"
                  >
                    <div
                      style="
                        color:#0f172a;
                        font-size:17px;
                        line-height:24px;
                        font-weight:700;
                        margin-bottom:8px;
                      "
                    >
                      Activate your account
                    </div>

                    <div
                      style="
                        max-width:430px;
                        color:#64748b;
                        font-size:13px;
                        line-height:21px;
                        margin-bottom:20px;
                      "
                    >
                      Activate your account before signing in.
                      You will complete the required verification steps
                      during activation.
                    </div>

                    <a
                      href="${safeActivationUrl}"
                      style="
                        display:inline-block;
                        background-color:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        line-height:20px;
                        font-weight:700;
                        padding:13px 28px;
                        border-radius:8px;
                      "
                    >
                      Activate Account
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  border-left:4px solid #2563eb;
                  background-color:#f8fafc;
                  margin-bottom:26px;
                "
              >
                <tr>
                  <td style="padding:13px 16px;">
                    <div
                      style="
                        color:#334155;
                        font-size:13px;
                        line-height:21px;
                      "
                    >
                      <strong>Security notice:</strong>
                      This temporary password is provided for your initial
                      sign-in. Do not share your credentials with anyone.
                      You may be required to change your password after
                      signing in.
                    </div>
                  </td>
                </tr>
              </table>

              <div
                style="
                  color:#64748b;
                  font-size:13px;
                  line-height:21px;
                "
              >
                If you did not expect this account, please contact your
                HealthSync administrator.
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding:22px 36px;
                background-color:#f8fafc;
                border-top:1px solid #e5eaf2;
              "
            >
              <div
                style="
                  color:#475569;
                  font-size:13px;
                  line-height:20px;
                  font-weight:700;
                "
              >
                HealthSync
              </div>

              <div
                style="
                  color:#94a3b8;
                  font-size:11px;
                  line-height:18px;
                  margin-top:3px;
                "
              >
                Electronic Health Record System
              </div>
            </td>
          </tr>

        </table>

        <!-- Outside footer -->
        <div
          style="
            max-width:620px;
            color:#94a3b8;
            font-size:11px;
            line-height:18px;
            text-align:center;
            padding:18px 20px 0 20px;
          "
        >
          This is an automated message from HealthSync.
          Please do not reply directly to this email.
        </div>

      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = [
    `Hello ${firstName},`,
    "",
    "Welcome to HealthSync.",
    "",
    "Your HealthSync staff account has been created successfully.",
    "",
    "ACCOUNT DETAILS",
    `Staff ID: ${staffId}`,
    `Temporary password: ${temporaryPassword}`,
    "",
    "Please activate your account before signing in:",
    activationUrl,
    "",
    "You will complete the required verification steps during activation.",
    "You may also be required to change your temporary password after signing in.",
    "",
    "Security notice: Do not share your login credentials with anyone.",
    "",
    "If you did not expect this account, please contact your HealthSync administrator.",
    "",
    "HealthSync",
    "Electronic Health Record System",
  ].join("\n");

  return { html, text };
}

export async function createUser(input: CreateUserInput) {
  const email = input.email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const staffId = await generateStaffId(input.role);
  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await argon2.hash(temporaryPassword);

  const user = await prisma.user.create({
    data: {
      hospitalId: input.hospitalId,
      departmentId: input.departmentId,
      staffId,
      email,
      passwordHash,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      role: input.role,
      isActive: false,
      mustChangePassword: true,
    },
  });

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";

  const activationUrl = `${appUrl}/activate-account`;

  const { html, text } = buildWelcomeEmail({
    firstName: user.firstName,
    staffId,
    temporaryPassword,
    activationUrl,
  });

  await sendEmail({
    to: user.email,
    subject: "Welcome to HealthSync — Activate Your Account",
    text,
    html,
  });

  return {
    user: {
      id: user.id,
      staffId: user.staffId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      hospitalId: user.hospitalId,
      departmentId: user.departmentId,
      mustChangePassword: user.mustChangePassword,
    },
  };
}