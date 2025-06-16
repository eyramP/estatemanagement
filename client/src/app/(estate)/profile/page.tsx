import About from "@/components/profile/About"
import Header from "@/components/profile/Header"
import Posts from "@/components/profile/Posts"
import ProtectedRoute from "@/components/shared/ProtectedRoutes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Estate Managements",
    description: 'Signed in users can view their profile information'
}

function ProfilePageContent() {

    return (
    <>
        <div className="grid items-start gap-4 px-4 md:gap-6 md:px-6">
        <Header />
        {/*///////////////// Tabs ///////////////*/}
        <div className="w-full">
        <Tabs className="dark:border-eerieBlack rounded-lg border" defaultValue="about">
            <TabsList className="bg-baby_rich flex space-x-4 py-2">
                <TabsTrigger value="about" className="h3-semibold tab rounded-xl py-1">About</TabsTrigger>
                <TabsTrigger value="posts" className="h3-semibold tab rounded-xl py-1">Posts</TabsTrigger>
                <TabsTrigger value="my-ssues" className="h3-semibold tab rounded-xl py-1">My Issues</TabsTrigger>
                <TabsTrigger value="my-reports" className="h3-semibold tab rounded-xl py-1">My Reports</TabsTrigger>
                <TabsTrigger value="assigned-issues" className="h3-semibold tab rounded-xl py-1">Assigned Issues</TabsTrigger>
            </TabsList>

            {/*////////// About tab content /////////*/}
            <About />

            {/*////////// Post tab content /////////*/}
            <Posts />

            {/*////////// Issue tab content /////////*/}
            {/*////////// Report tab content /////////*/}
            {/*////////// Assigned Issue tab content /////////*/}

        </Tabs>
        </div>
        </div>
        <div className="flex cursor-pointer flex-grow justify-between">
            <Link href="/profile/edit">
            <Button className="h3-semibold ml-6 mt-4 electricIndigo-gradient text-babyPowder w-64 rounded-lg">
                Update Profile
            </Button>
            </Link>
            <Link href="/apartment">
            <Button className="h3-semibold mr-6 mt-4 electricIndigo-gradient text-babyPowder w-64 rounded-lg">
                Add your apartment
            </Button>
            </Link>
        </div>
    </>
  )
}

export default function ProfilePage(){
    return (
        <ProtectedRoute>
            <ProfilePageContent />
        </ProtectedRoute>
    )
}