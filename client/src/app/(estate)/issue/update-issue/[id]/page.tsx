
import { AuthFormHeader } from "@/components/forms/auth";
import UpdateIssueform from "@/components/forms/update-issue/UpdateIssueform";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import {Metadata} from "next"

export const metadata: Metadata = {
    title: "Estate Management | Update Issue",
    description: "Technitians assigned to an issue can update the status of the issue."
}

interface UpdateParamsProps {
    params: {
        id: string;
    }
}


export default function UpdateIssuePage({params}: UpdateParamsProps) {
  return (
    <ProtectedRoute>
        <div>
            <AuthFormHeader
            title="Update Issue"
            staticText="Want to go back?"
            linkText="Back to profile"
            linkHref="/profile"
            />
            <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-lightGray dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
            <UpdateIssueform />
            </div>
            </div>
        </div>
    </ProtectedRoute>
  )
}