"use client"

import { useGetMyAssignedIssuesQuery } from "@/lib/redux/features/issues/IssueApiSlice"
import Spinner from "@/components/shared/Spinner";
import { TabsContent } from "../ui/tabs";
import IssueCard from "../cards/IssueCard";

export default function AssignedIssues() {
    const {data: assignedIssues, isLoading} = useGetMyAssignedIssuesQuery("")
    const myAssignedIssues = assignedIssues?.assigned_issues

    if (isLoading){
            return (
                <div className="flex-center pt-32">
                    <Spinner />
                </div>
            );
        }

  return (
    <div>
        <TabsContent value="assigned-issues">
        <h2 className="h2-semibold flex-center font-robotoSlab dark:text-pumpkin text-xl">
            Total: ({myAssignedIssues?.count ?? 0})
        </h2>
        <div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 lg:grid-cols-2">
        {myAssignedIssues && myAssignedIssues.results.length > 0 ?  (
            myAssignedIssues.results.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
            ))
        ): (
            <p className="h2-semibold dark:text-lime-500">No issue(s)  assigned to you yet</p>
        )}
        </div>
        </TabsContent>
    </div>
  )
}