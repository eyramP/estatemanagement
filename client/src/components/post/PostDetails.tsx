"use client";
import { useBookmarkPostMutation, useDownVotePostMutation, useGetSinglePostQuery, useUpVotePostMutation } from '@/lib/redux/features/post/postApiSlice';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { Card, CardHeader } from '../ui/card';
import { AuthFormHeader } from '../forms/auth';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import ProtectedRoute from '../shared/ProtectedRoutes';
import { extractErrorMessage } from '@/utils';
import Spinner from '../shared/Spinner';

function PostDetailsContent(){
    const params = useParams();
    const slug = params.slug as string;
    const { data, isLoading, error} = useGetSinglePostQuery(slug);
    const post = data?.post;

    const [upvotePost, {isLoading: isUpvoteLoading}] = useUpVotePostMutation();
    const [downvotePost, {isLoading: isDownvoteLoading}] = useDownVotePostMutation();
    const [boomarkPost, {isLoading: isBookmarkLoading}] = useBookmarkPostMutation()

    const handleUpvote = () => {
        post?.id && upvotePost(post.id);
        toast.success("Post upvoted successfully! ✅");
    }

    const handleDownvote = () => {
        post?.id && downvotePost(post.id);
        toast.success("Post downvoted successfully! 🥺");
    }

    const handleBookmarkPost = () => {
        post?.id && boomarkPost(post.slug);
        toast.success("Post has been added to your bookmarks successfully! ✅");
    }

    if (isLoading) {
            return (
                <div className="flex-center pt-20">
                    <Spinner />
                </div>
            );
        }

    if (error || !post) {
            const errorMessage = extractErrorMessage(error);
            return (
                <div className="flex-center pt-20 text-red-500">
                    {/* <p>Failed to load post details. Please try again.</p> */}
                    {errorMessage}
                </div>
            );
        }

    return (
        <Card className="dark:border-gray rounded-xl border border-dashed">
            <AuthFormHeader
            title={post?.title}
            linkText="Go back home"
            linkHref="/welcome/"
            />
            <CardHeader className="flex-start border-b-eerieBlack dark:border-gray w-full flex-col border-b border-dashed">
                <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center sm:gap-2">
                    <PostHeader
                    title={post?.title}
                    avatar={post?.avatar}
                    author_username={post?.author_username}
                    created_at={post?.created_at}
                    view_count={post?.view_count}
                    />
                    <PostActions
                    upvotes={post?.upvotes}
                    downvotes={post?.downvotes}
                    handleUpvote={handleUpvote}
                    handleDownvote={handleDownvote}
                    isUpvoteLoading={isUpvoteLoading}
                    isDownvoteLoading={isDownvoteLoading}
                    isBookmarkLoading={isBookmarkLoading}
                    handleBookmarkPost={handleBookmarkPost}
                    />
                </div>
            </CardHeader>
            <PostBody body={post?.body}  slug={post?.slug}/>
            <PostFooter tags={post?.tags} replies_count={post?.replies_count} />
        </Card>
    )
}


export default function PostDetails() {
  return (
    <ProtectedRoute>
        <PostDetailsContent />
    </ProtectedRoute>
  )
}