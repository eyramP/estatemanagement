"use client"

import { useGetMyIssuesQuery } from "@/lib/redux/features/issues/IssueApiSlice"
import Spinner from "@/components/shared/Spinner"
import { TabsContent } from "@/components/ui/tabs"
import IssueCard from "../cards/IssueCard"

export default function Issues() {
    const {data, isLoading} = useGetMyIssuesQuery()
    const myIssues = data?.my_issues

    if (isLoading){
        return (
            <div className="flex-center pt-32">
                <Spinner />
            </div>
        );
    }
  return (
    <TabsContent value="my-ssues">
    <h2 className="h2-semibold flex-center font-robotoSlab dark:text-pumpkin text-xl">
        Total: ({myIssues?.count})
    </h2>
    <div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 lg:grid-cols-2">
    {myIssues && myIssues.results.length > 0 ?  (
        myIssues.results.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
        ))
    ): (
        <p className="h2-semibold dark:text-lime-500 ml-4">You have not raised any issue(s) yet</p>
    )}
    </div>
    </TabsContent>
  )
}