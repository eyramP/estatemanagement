import IssueDetails from "@/components/issue/IssueDetails";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Management | Issue details",
  description: "Authenticated users can get the details of the issue they have raised. They can also delete it",
};

export default function IssueDetailPage() {
  return (
    <ProtectedRoute>
      <IssueDetails />
    </ProtectedRoute>
  );
}