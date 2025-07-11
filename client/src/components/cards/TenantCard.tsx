"use client";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApiSlice"
import { useTheme } from "next-themes"
import Spinner from "../shared/Spinner"
import UserSearch from "../shared/search/UsersSearch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import TenantInfo from "./TenantInfo"
import { BrickWall, Briefcase, Building, CalendarDays, Map, School } from "lucide-react"
import { formatDate } from "@/utils"
import ProtectedRoute from "../shared/ProtectedRoutes"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import PaginationSection from "../shared/PaginationSection";


function TenantsCardContent(){
    const {theme} = useTheme()
    const searchTerm = useAppSelector((state) => state.user.searchTerm);
    const page = useAppSelector((state) => state.user.page)
    const {data, isLoading} = useGetAllUsersQuery({ searchTerm, page });

    const totalCount = data?.profiles.count || 0;
    const totalPages = Math.ceil(totalCount / 9)

    if (isLoading){
        <div className="flex-center pt-32">
            <Spinner size="xl" />
        </div>
    }

    return <div>
        <UserSearch />
        <h1 className="flex-center font-robotoSlab dark:text-pumpkin text-4xl sm:text-5xl">
            All Tenants - ({data?.profiles.results.length})
        </h1>
        <div className="mt-4 grid gridcols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data && data.profiles.results.length > 0 ? (
            data.profiles.results.map((tenant) => (
                <Card key={tenant.id}>
                    <CardContent className="rounded-lg p-4">
                    <CardHeader className="flex-col-center text-center">
                    <Avatar className="border-slate-400 mx-auto size-28 overflow-hidden rounded-full border-2 object-cover">
                        <AvatarImage className="rounded-full" alt="User profile avatar" src={
                            tenant.avatar || (
                                theme === "dark"
                                ? "/assets/icons/user-profile-circle.svg"
                                : "/assets/icons/user-profile-light-circle.svg"
                            )
                        }
                        />
                    </Avatar>
                    <CardTitle className="h3-semibold font-robotoSlab dark:text-platinum">
                        {tenant.full_name}
                    </CardTitle>
                    </CardHeader>
                    <CardTitle className="flex-center">
                        <p className="h4-semibold dark:text-lime-500">@{tenant.username}</p>
                    </CardTitle>
                    <CardDescription className="mt-4 space-y border-b-0">
                        <div>
                            <TenantInfo
                            label="Country of origin"
                            value={tenant.country_of_origin}
                            icon={Map}
                            />
                            <TenantInfo
                            label="Occupation"
                            value={tenant.occupation}
                            icon={Briefcase}
                            />
                            <TenantInfo
                            label="Date Joined"
                            value={formatDate(tenant.date_joined).toString()}
                            icon={CalendarDays}
                            />
                        </div>
                        {tenant.apartment && (
                            <>
                                <TenantInfo
                                label="Building"
                                value={tenant.apartment.building}
                                icon={Building}
                                />
                                <TenantInfo
                                label="Apartment Floor"
                                value={tenant.apartment.floor}
                                icon={School}
                                />
                                <TenantInfo
                                label="Unit Number"
                                value={tenant.apartment.unit_number}
                                icon={BrickWall}
                                />
                            </>
                        )}
                    </CardDescription>
                    </CardContent>
                </Card>
            ))
        ): (
            <p>No tenants found</p>
        )}
        </div>
        <PaginationSection totalPages={totalPages} entityType="user"/>
    </div>
}

export default function TenantCard() {
  return (
    <ProtectedRoute>
        <TenantsCardContent />
    </ProtectedRoute>
  )
}