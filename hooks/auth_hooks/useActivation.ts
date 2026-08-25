// hooks/auth_hooks/useActivation.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { db } from "@/db/offlineDB";
import { encryptData } from "@/utils/encryption";

export function useActivation() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"staff" | "resident">("staff");
  const [isLoading, setIsLoading] = useState(false);

  // Modal control states
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success",
  );
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      uniqueId: "",
      activationCode: "",
    },
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    // Simulate initial credentials check, then prompt for OTP/verification
    setTimeout(() => {
      setIsLoading(false);
      console.log("Account activation credentials verified:", data);
      setIsOtpOpen(true); // Open the 6-digit OTP confirmation modal
    }, 1200);
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setIsLoading(true);
    const formData = getValues();

    // Simulate final verification and IndexedDB insertion upon success
    setTimeout(async () => {
      setIsLoading(false);
      setIsOtpOpen(false);

      if (otpCode === "123456" || otpCode.length === 6) {
        try {
          // Adapt to useLogin expectation: store the exact uniqueId the user entered
          const rawIdentifier = formData.uniqueId.trim();
          const rawToken = `act_token_${Math.random().toString(36).substring(2)}`;

          // Encrypt identifier and token to match useLogin's decryption schema
          const encryptedEmail = await encryptData(rawIdentifier);
          const encryptedToken = await encryptData(rawToken);

          // Insert the securely encrypted credentials into Dexie IndexedDB
          await db.users.add({
            email: encryptedEmail,
            token: encryptedToken,
            lastLogin: new Date().toISOString(),
          });

          console.log(
            "Encrypted activation credentials successfully saved to IndexedDB.",
          );
        } catch (error) {
          console.error("Failed to save credentials to offline DB:", error);
        }

        setFeedbackType("success");
        setFeedbackTitle("Activation Successful!");
        setFeedbackMessage(
          "Your digital hospital account has been successfully configured. You can now sign in to your workspace.",
        );
      } else {
        setFeedbackType("error");
        setFeedbackTitle("Verification Failed");
        setFeedbackMessage(
          "The security code entered is invalid or has expired. Please try again.",
        );
      }
      setIsFeedbackOpen(true);
    }, 1500);
  };

  const handleResendOtp = () => {
    alert(
      "A new verification code has been dispatched to your registered email.",
    );
  };

  // Handle closing success modal by redirecting to sign-in page (/)
  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
    if (feedbackType === "success") {
      router.push("/");
    }
  };

  return {
    loginType,
    setLoginType,
    isLoading,
    isOtpOpen,
    setIsOtpOpen,
    isFeedbackOpen,
    setIsFeedbackOpen: handleCloseFeedback, // Pass custom closer
    feedbackType,
    feedbackTitle,
    feedbackMessage,
    register,
    handleSubmit,
    onSubmit,
    handleVerifyOtp,
    handleResendOtp,
  };
}
