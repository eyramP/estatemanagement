import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { NonTenantResponse, ProfileData, ProfileResponse, ProfilesResponse, QueryParams } from "@/types";
import build from "next/dist/build";
import { useGetUserQuery } from "../auth/authApiSlice";

export const usersApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ProfilesResponse, QueryParams>({
            query: (params = {}) => {
                const queryString = new URLSearchParams()

                if (params.page){
                    queryString.append("page", params.page.toString())
                }
                if (params.searchTerm){
                    queryString.append("search", params.searchTerm)
                }

                return `/profiles/all/?${queryString.toString()}`
            },
            providesTags:["User"]
        }),

        getAllTechnicians: builder.query<NonTenantResponse, QueryParams>({
            query:(params = {}) => {
                const queryString = new URLSearchParams()

                if (params.page){
                    queryString.append("page", params.page.toString())
                }
                if (params.searchTerm){
                    queryString.append("search", params.searchTerm)
                }

                return `/profiles/non-tenants-profiles/?${queryString.toString()}`
            },
            providesTags:["User"]
        }),

        getUserProfile: builder.query<ProfileResponse, void>({
            query: () => "/profiles/user/my-profile/",
            providesTags: ["User"]
        }),

        updateUserProfile: builder.mutation<ProfileData, ProfileData>({
            query:(formData) => ({
                url:"/profiles/user/update/",
                method: "PATCH",
                body: formData
            }),
            invalidatesTags: ["User"]
        })
    })
})

export const {
    useGetAllUsersQuery,
    useGetAllTechniciansQuery,
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
    useUpdateUserProfileMutation
} = usersApiSlice