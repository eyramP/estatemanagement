import TenantCard from "@/components/cards/TenantCard";
import ProtectedRoute from "@/components/shared/ProtectedRoutes"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Estate Management",
    description: "Authenticated users can view basic information about other tenanst within the property. Tenants can also search other tenants."
}

function TenantPageContent (){
    return (
    <div>
        <TenantCard />
    </div>
    )
}


export default function TenantsPage(){
    return (
        <ProtectedRoute>
            <TenantPageContent />
        </ProtectedRoute>
    )
}