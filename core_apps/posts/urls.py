from django.urls import path
from .views import (
    BookmarkedPostListAPIView,
    UnBookmarkPostAPIView,
    PostListAPIView,
    PostCreateAPIView,
    PostDetailAPIView,
    PostUpdateAPIView,
    ReplyListAPIView,
    ReplyCreateAPIView,
    BookmarkPostAPIView,
    UpvotePostAPIView,
    DownvotePostAPIView,
    MyPostListAPIView,
    PopularTagsListAPIView,
    TopPostsListAPIView,
    PostByTagListAPIView,
)


urlpatterns = [
    path("", PostListAPIView.as_view(), name="post-list"),
    path("tag/<str:tag_slug>/",
         PostByTagListAPIView.as_view(),
         name="post-by-tag"),
    path(
        "top-post/",
        TopPostsListAPIView.as_view(),
        name="top-posts"),
    path("popular-tags/", PopularTagsListAPIView.as_view(), name="popular-tags"),
    path("create/", PostCreateAPIView.as_view(), name="post-create"),
    path("my-posts/", MyPostListAPIView.as_view(), name="my-post"),
    path("<slug:slug>/", PostDetailAPIView.as_view(), name="post-detail"),
    path("<slug:slug>/update/", PostUpdateAPIView.as_view(), name="post-update"),
    path("<slug:slug>/bookmark/",
         BookmarkPostAPIView.as_view(),
         name="bookmark-post"),
    path(
        "<slug:slug>/unbookmark/",
        UnBookmarkPostAPIView.as_view(),
        name="unbookmark-post"
    ),
    path(
        "bookmarked/posts/",
        BookmarkedPostListAPIView.as_view(),
        name="bookmarked-posts"
    ),
    path(
        "<uuid:post_id>/reply/",
        ReplyCreateAPIView.as_view(),
        name="create-reply"
    ),
    path(
        "<uuid:post_id>/replies/",
        ReplyListAPIView.as_view(),
        name="reply-list"
    ),
    path(
        "<uuid:post_id>/upvote/",
        UpvotePostAPIView.as_view(),
        name="upvote-post"
    ),
    path(
        "<uuid:post_id>/downvote/",
        DownvotePostAPIView.as_view(),
        name="downvote-post"
    ),
]
