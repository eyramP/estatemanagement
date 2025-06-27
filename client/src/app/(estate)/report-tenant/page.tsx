import { AuthFormHeader } from "@/components/forms/auth"
import CreateReportForm from "@/components/forms/report-tenant/CreateReportForm"
import ProtectedRoute from "@/components/shared/ProtectedRoutes"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Estate Management | Report Tenant",
    description: "Tenants can report other tenants in case of misconduct or misbehavior"
}


function ReportTenantContent() {
  return (
    <div>
        <AuthFormHeader
        title="Report a Tenant"
        staticText="All reports remain anonymous. You identity is hidden when you report your fellow tenant"
        linkText="Back to Profile"
        linkHref="/profile"
        />
        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-slate-200 dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
                <CreateReportForm />
            </div>
        </div>
    </div>
  )
}

export default function ReportTenantPage (){
    return (
        <ProtectedRoute>
            <ReportTenantContent />
        </ProtectedRoute>
    )
}

