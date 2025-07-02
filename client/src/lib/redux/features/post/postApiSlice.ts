import { BookmarkedPostsResponse, BookmarkResponse, MyPostsResponse, PopularTagResponse, PostData, PostQueryParams, PostResponse, PostsByTagResponse, PostsResponse, ReplyPostData, ReplyResponse, TopPostsResponse, UpdatePostData, UpvoteDownvoteResponse } from "@/types";
import { baseApiSlice } from "../api/baseApiSlice";

export const postApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builer) => ({
        createPost: builer.mutation<PostResponse, PostData>({
            query: (postData) => ({
                url: "/posts/create/",
                method: "POST",
                body: postData
            }),
            invalidatesTags: ["Post"]
        }),

        getAllPost: builer.query<PostsResponse, PostQueryParams>({
            query: (params={}) => {
                const queryString = new URLSearchParams();

                if (params.page) {
                    queryString.append("page", params.page.toString())
                }
                return `/posts/?${queryString.toString()}`
            },
            providesTags: ["Post"],
        }),

        getMyPosts: builer.query<MyPostsResponse, void>({
            query: () => `/posts/my-posts/`,
            providesTags: ["Post"],
        }),

        getSinglePost: builer.query<PostResponse, string>({
            query: (postSlug) => `/posts/${postSlug}/`,
            providesTags: ["Post"],
        }),

        updatedPost: builer.mutation<PostResponse, UpdatePostData>({
            query: ({postSlug, ...postData}) => ({
                url: `/posts/${postSlug}/update/`,
                method: "POST",
                body: postData
            }),
            invalidatesTags: ["Post"]
        }),

        upVotePost: builer.mutation<UpvoteDownvoteResponse, string>({
            query: (postId) => ({
                url: `/posts/${postId}/upvote/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Post"]
        }),

        downVotePost: builer.mutation<UpvoteDownvoteResponse, string>({
            query: (postId) => ({
                url: `/posts/${postId}/downvote/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Post"]
        }),

        bookmarkPost: builer.mutation<BookmarkResponse, string>({
            query: (postSlug) => ({
                url: `/posts/${postSlug}/bookmark/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Post"]
        }),

        unBookmarkPost: builer.mutation<BookmarkResponse, string>({
            query: (postSlug) => ({
                url: `/posts/${postSlug}/unbookmark/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Post"]
        }),

        getAllMyBookmarks: builer.query<BookmarkedPostsResponse, void>({
            query: () => `/posts/boomarked/posts/`,
            providesTags: ["Post"],
        }),

        getTopPosts: builer.query<TopPostsResponse, void>({
            query: () => `/posts/top-posts/`,
            providesTags: ["Post"],
        }),

        getPopularTags: builer.query<PopularTagResponse, void>({
            query: () => `/posts/popular-tags/`,
            providesTags: ["Post"],
        }),

        getAllReplies: builer.query<PostResponse, string>({
            query: (postId) => `/posts/${postId}/replies/`,
            providesTags: ["Post"],
        }),

        getPostsByTag: builer.query<PostsByTagResponse, string>({
            query: (tagSlug) => `/posts/tags/${tagSlug}/`,
            providesTags: ["Post"],
        }),

        ReplyToPost: builer.mutation<ReplyResponse, ReplyPostData>({
            query: ({ postId, ...replyData }) => ({
                url: `/posts/${postId}/reply/`,
                method: "POST",
                body: replyData
            }),
            invalidatesTags: ["Post"]
        }),

    })
})


export const {
    useCreatePostMutation,
    useGetAllPostQuery,
    useGetAllMyBookmarksQuery,
    useGetMyPostsQuery,
    useGetAllRepliesQuery,
    useGetPopularTagsQuery,
    useGetSinglePostQuery,
    useUpVotePostMutation,
    useReplyToPostMutation,
    useGetPostsByTagQuery,
    useGetTopPostsQuery,
    useBookmarkPostMutation,
    useDownVotePostMutation,
    useUnBookmarkPostMutation,
    useUpdatedPostMutation,
} = postApiSlice;