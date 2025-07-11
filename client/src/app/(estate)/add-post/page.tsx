import CreatePostForm from "@/components/forms/add-post/CreatePostForm"
import { AuthFormHeader } from "@/components/forms/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Estate Management | Add a Post",
    description: "Authenticated users can ask any question or post useful content for all users to see"
}

export default function AddPostPage() {
  return (
    <div>
        <AuthFormHeader
        title="Create a post"
        staticText="Ask questions, share thoughts or information with everyone"
        linkText="Back to home page"
        linkHref="/welcome"
        />
        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
            <CreatePostForm />
            </div>
        </div>
    </div>
  )
}