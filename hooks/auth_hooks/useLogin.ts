// hooks/auth_hooks/useLogin.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "@/types/auth-schema-type/auth-schema";
import { db } from "@/db/offlineDB";
import { encryptData, decryptData } from "@/utils/encryption"; // assuming decryptData is available

// TOGGLE FLAG: Set to true when your friend's backend /api/auth/login endpoint is ready!
const USE_LIVE_API = false;

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      let authToken = "mock-jwt-secure-token-12345";

      if (USE_LIVE_API) {
        // --- REAL NEXT.JS API AUTH CALL ---
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Invalid credentials provided.");
        }

        authToken = result.token || authToken;
      } else {
        // --- OFFLINE INDEXEDDB VALIDATION ---
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch all stored users from IndexedDB
        const allUsers = await db.users.toArray();

        if (allUsers.length === 0) {
          throw new Error(
            "No activated accounts found locally. Please activate your account first.",
          );
        }

        // Check if any registered local user matches the entered email/unique ID
        let matchedUser = false;
        for (const user of allUsers) {
          try {
            const decryptedEmail = await decryptData(user.email);
            if (decryptedEmail === data.email) {
              matchedUser = true;
              break;
            }
          } catch (e) {
            // fallback if stored directly as plaintext during mock activation
            if (user.email === data.email) {
              matchedUser = true;
              break;
            }
          }
        }

        if (!matchedUser) {
          throw new Error(
            "Account not activated or invalid unique ID. Please activate your account.",
          );
        }
      }

      // Securely encrypt data before updating session cache in IndexedDB
      const encryptedEmail = await encryptData(data.email);
      const encryptedToken = await encryptData(authToken);

      // Save active session
      await db.users.put({
        email: encryptedEmail,
        token: encryptedToken,
        lastLogin: new Date().toISOString(),
      });

      console.log(
        "Authentication successful. Session encrypted and cached locally.",
      );

      setModalState({
        isOpen: true,
        type: "success",
        title: "Login Successful & Encrypted!",
        message: USE_LIVE_API
          ? "Server authenticated. Session securely cached for offline mode. Redirecting..."
          : "Local ID verified against IndexedDB. Redirecting to dashboard...",
      });

      // Automatically redirect after a brief delay to display the success modal
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error: any) {
      console.error("Login or validation failed:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: USE_LIVE_API ? "Authentication Failed" : "Activation Required",
        message:
          error.message || "Failed to process login request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const errorMessage = firstErrorKey
      ? errors[firstErrorKey]?.message
      : "Please check your input fields.";

    setModalState({
      isOpen: true,
      type: "error",
      title: "Validation Error",
      message: String(errorMessage),
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));

    if (modalState.type === "success") {
      router.push("/dashboard");
    }
  };

  return {
    form,
    isLoading,
    modalState,
    closeModal,
    onSubmit: form.handleSubmit(onSubmit, onInvalid),
    USE_LIVE_API,
  };
}
