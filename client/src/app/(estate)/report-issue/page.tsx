import { AuthFormHeader } from "@/components/forms/auth";
import CreateIssueForm from "@/components/forms/report-issue/CreateIssueForm";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Estate Management | Report Issue",
  description: "Tenants can report any issue to the management regarding their apartments"
}

function ReportIssueContent() {
  return (
    <div>
        <AuthFormHeader
        title="Report an issue with your apartment"
        // staticText="Report Issue"
        // linkText="Go Back Home"
        // linkHref="/profile"
        />
         <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-slate-300 dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
                <div className="dark: text-pumpkin text-2xl">
                  <CreateIssueForm />
                </div>
            </div>
        </div>
    </div>
  )
}

export default function ReportIssuePage(){
  return (
    <ProtectedRoute>
      <ReportIssueContent />
    </ProtectedRoute>
  )
}