import Link from "next/link";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Hotel } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Issue {
	id: string;
	title: string;
	description: string;
	apartment_unit: string;
	status: string;
	priority: string;
}

interface IssueCardProps {
	issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
	return (
		<Link href={`/issue/${issue.id}`} key={issue.id}>
			<Card
				key={issue.id}
				className="hover:border-pumpkin dark:border-gray hover:dark:border-platinum rounded-xl border border-dashed"
			>
				<CardHeader>
					<CardTitle className="flex-center h3-semibold font-robotoSlab dark:text-lime-500">
						{issue.title.length > 20
							? `${issue.title.substring(0, 20)}....`
							: issue.title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="dark:text-platinum">
						<div className="h4-semibold">
							{issue.description.length > 35
								? `${issue.description.substring(0, 35)}....`
								: issue.description}
						</div>
					</CardDescription>
				</CardContent>
				<CardContent>
					<CardDescription className="dark:text-platinum">
						<div className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="tab-font">Apartment Number: </span>
							<span className="text-lg">{issue.apartment_unit}</span>
						</div>
					</CardDescription>
				</CardContent>
				<CardFooter className="dark:text-babyPowder flex flex-row justify-between">
					<div>
						<span className="mr-0.5 font-bold">Status: </span>
						<Badge className="bg-eerieBlack text-babyPowder dark:bg-electricIndigo dark:text-babyPowder">
							{issue.status}
						</Badge>
					</div>

					<div>
						<span className="mr-0.5 font-bold">Priority: </span>
						<Badge className="bg-eerieBlack text-babyPowder dark:text-veryBlack dark:bg-lime-500">
							{issue.priority}
						</Badge>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}