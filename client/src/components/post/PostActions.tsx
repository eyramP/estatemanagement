import { BookMarkedIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Tooltip from "../shared/Tooltip";
import { CardDescription } from "../ui/card";

interface PostActionsProps {
    upvotes: number | undefined;
    downvotes: number | undefined;
    handleUpvote: () => void;
    handleDownvote: () => void;
    handleBookmarkPost: () => void;
    isUpvoteLoading: boolean;
    isDownvoteLoading: boolean;
    isBookmarkLoading: boolean;
}

export default function PostActions({
    upvotes,
    downvotes,
    handleUpvote,
    handleDownvote,
    handleBookmarkPost,
    isUpvoteLoading,
    isDownvoteLoading,
    isBookmarkLoading }: PostActionsProps) {
  return (
    <CardDescription className="mt-2">
        <div className="flex items-center space-x-2">
            <Tooltip content="Upvote this post" position="left">
                <button onClick={handleUpvote} disabled={isUpvoteLoading}>
                <ThumbsUpIcon className="tab-icon text-electricIndigo hidden sm:block" />
                </button>
            </Tooltip>
            <span className="text-xl-font-baby">{upvotes}</span>

            <Tooltip content="Downvote this post">
                <button onClick={handleDownvote} disabled={isDownvoteLoading}>
                <ThumbsDownIcon className="tab-icon text-electricIndigo hidden sm:block" />
                </button>
            </Tooltip>
            <span className="text-xl-font-baby">{downvotes}</span>

            <Tooltip content="Bookmark this post">
                <button onClick={handleBookmarkPost} disabled={isBookmarkLoading}>
                    <BookMarkedIcon className="tab-icon text-electricIndigo hidden sm:block" />
                </button>
            </Tooltip>

        </div>
    </CardDescription>
  )
}