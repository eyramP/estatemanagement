import { IssueResponse, MyAssignedIssuesResponse, ReportIssueData, UpdateIssueData, UpdateIssueResponse } from "@/types";
import { baseApiSlice } from "../api/baseApiSlice";



export const issueApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        reportIssues: builder.mutation<IssueResponse, ReportIssueData>({
            query: ({apartmentId, ...issueData}) => ({
                url: `/issues/create/${apartmentId}/`,
                method: "POST",
                body: issueData
            }),
            invalidatesTags:["Issue"]
        }),

        getMyIssues: builder.query<IssueResponse, void>({
            query: () => "/issue/me/",
            providesTags: ["Issue"]
        }),

        getMyAssignedIssues: builder.query<MyAssignedIssuesResponse, string>({
            query: () => "/issue/assigned/",
            providesTags: ["Issue"]
        }),

        getSingleIssue: builder.query<MyAssignedIssuesResponse, string>({
            query: (issueId) => `/issue/${issueId}/`,
            providesTags: ["Issue"]
        }),

        updateIssue: builder.mutation<UpdateIssueResponse, UpdateIssueData>({
            query: ({issueId, ...statusData}) => ({
                url: `/issue/update/${issueId}/`,
                method: "PATCH",
                body: statusData
            }),
            invalidatesTags:["Issue"]
        }),

        DeleteIssue: builder.mutation<void, string>({
            query: (issueId) => ({
                url: `/issue/delete/${issueId}/`,
                method: "DELETE",
            }),
            invalidatesTags:["Issue"]
        }),
    })
})

export const {
    useReportIssuesMutation,
    useGetMyIssuesQuery,
    useGetMyAssignedIssuesQuery,
    useUpdateIssueMutation,
    useDeleteIssueMutation,
    useGetSingleIssueQuery
} = issueApiSlice;