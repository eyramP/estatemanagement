import { AuthFormHeader } from "@/components/forms/auth"
import PasswordResetConfirmForm from "@/components/forms/auth/PasswordResetConfirmForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Estatement Management",
    description: "Password Reset Confirm page"
}

export default function page() {
  return (
    <div>
        <AuthFormHeader title="Create new password"/>
        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-slate-200 dark:bg-deepBlueGrey
                px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl"
            >
                <PasswordResetConfirmForm />
            </div>
        </div>
    </div>
  )
}