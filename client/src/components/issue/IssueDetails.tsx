"use client";

import {
	useDeleteIssueMutation,
	useGetSingleIssueQuery,
} from "@/lib/redux/features/issues/IssueApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { extractErrorMessage } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { AuthFormHeader } from "../forms/auth";
import { CheckCheck, CircleDot, EyeIcon, Hotel } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Spinner from "../shared/Spinner";

export default function IssueDetails() {
	const params = useParams();
	const id = params?.id as string;

	const { data, isLoading, error } = useGetSingleIssueQuery(id);
	const issue = data?.issue;
	const router = useRouter();

	const { data: currentUser } = useGetUserProfileQuery();

	const canUpdate = issue?.assigned_to === currentUser?.profile.full_name;
	const canDelete = issue?.reported_by === currentUser?.profile.full_name;
	const [deleteIssue] = useDeleteIssueMutation();

	const handleDeleteIssue = async () => {
		if (issue?.id) {
			try {
				await deleteIssue(issue.id).unwrap();
				router.push("/profile");
				toast.success("Your Issue was deleted");
			} catch (e) {
				const errorMessage = extractErrorMessage(e);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};

	if (isLoading) {
		return (
			<div className="flex-center pt-20">
				<Spinner />
			</div>
		);
	}

	if (error || !issue) {
		const errorMessage = extractErrorMessage(error);
		return (
			<div className="flex-center pt-20 text-red-500">
				<p>Failed to load issue details. Please try again.</p>
				{errorMessage}
			</div>
		);
	}

	return (
		<Card className="dark:border-gray rounded-xl border border-dashed">
			<AuthFormHeader
				title={issue?.title}
				linkText="Go back to profile"
				linkHref="/profile"
			/>
			<CardHeader className="border-b-eerieBlack flex flex-row justify-between gap-4 border-b p-4 sm:p-6 md:flex-row md:items-center md:gap-6 ">
				<div className="grid gap-0.5">
					<CardTitle className="dark:text-platinum">
						<div className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="dark:text-babyPowder font-bold">Apartment Number: </span>
							<span className="text-2xl">{issue?.apartment_unit}</span>
						</div>
					</CardTitle>
					<CardDescription className="mt-2">
						<div className="flex items-center space-x-2">
							<CheckCheck className="tab-icon" />
							<span className="text-xl-font-baby">Occupied By: </span>
							<span className="text-xl-font-baby">{issue?.reported_by}</span>
						</div>
					</CardDescription>
				</div>
				<div className="flex flex-col gap-y-3">
					{canUpdate && (
						<Link href={`/issue/update-issue/${id}`}>
							<Button className="bg-electricIndigo text-babyPowder ml-auto h-10 max-w-[200px]" size="sm" variant="outline">
								Update Issue
							</Button>
						</Link>
					)}

					{canDelete && (
						<Button
							onClick={handleDeleteIssue}
							className="text-babyPowder bg-red-500 ml-auto h-10 max-w-[200px]"
							size="sm"
							variant="outline"
						>
							Delete Issue
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-xl-font-baby">{issue?.description}</span>
					</div>
				</CardDescription>
			</CardContent>
			<CardFooter className="mt-2 flex flex-row justify-between dark:text-lime-500">
				<div className="text-lg">
					assigned to: <span className="dark:text-platinum">{issue?.assigned_to || "Not assigned Yet!"}</span>
				</div>
				<div className="text-lg">
					Status: <span className="dark:text-platinum">{issue?.status}</span>
				</div>
				<div className="text-lg">
					Priority: <span className="dark:text-platinum">{issue?.priority}</span>
				</div>
				<div className="flex flex-row items-center">
					<EyeIcon className="mr-1 size-5" />
					<span className="dark:text-platinum text-lg">
						View Count: {issue?.view_count}
					</span>
				</div>
			</CardFooter>
		</Card>
	);
}