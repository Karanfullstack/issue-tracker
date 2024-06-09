"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

export default function AssigneSelect() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const controller = new AbortController();

		const fetchUsesr = async () => {
			try {
				const { data } = await axios.get<User[]>("/api/users", {
					signal: controller.signal,
				});
				setUsers(data);
			} catch (error) {
				if (error instanceof CanceledError) return;
			}
		};
		fetchUsesr();
		return () => controller.abort();
	}, []);
	return (
		<Select.Root>
			<Select.Trigger placeholder="Asssigne.." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users.map((user) => (
						<Select.Item value={user.id}>{user.name}</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
}
