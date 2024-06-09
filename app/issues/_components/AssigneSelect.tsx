"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

export default function AssigneSelect() {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		retry: 3,
		staleTime: 60 * 1000,
	});

	if (isLoading) return <Skeleton height={"2rem"} />;

	if (error) return null;
	return (
		<Select.Root>
			<Select.Trigger placeholder="Asssigne.." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users?.map((user) => (
						<Select.Item value={user.id}>{user.name}</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
}
