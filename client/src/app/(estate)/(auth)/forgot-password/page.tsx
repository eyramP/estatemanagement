import { AuthFormHeader } from "@/components/forms/auth"
import PasswordResetRequestForm from "@/components/forms/auth/PasswordResetRequestForm"
import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Estate Management | Password Reset Request",
    description: "Password reset request page",
}

export default function ForgotPassword() {
  return (
    <div>
        <AuthFormHeader
        title="Reset Password Request"
        staticText="Want to go back?"
        linkText="Back to login page"
        linkHref="/login"
        />
        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-slate-200 dark:bg-deepBlueGrey
                px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl"
            >
                <PasswordResetRequestForm />
            </div>
        </div>
    </div>
  )
}