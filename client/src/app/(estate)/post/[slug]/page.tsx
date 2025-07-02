import PostDetails from "@/components/post/PostDetails";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: "Estate Management | Post details",
  description: "Authenticated users can get the details of a post",
};

export default function PostDetailPage() {
  return (
    <>
    <PostDetails />
    </>
  )
}