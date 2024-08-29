"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { lable: string; value?: Status }[] = [
    { lable: "All" },
    { lable: "Open", value: "OPEN" },
    { lable: "Closed", value: "CLOSED" },
    { lable: "In Progress", value: "IN_PROGRESS" },
  ];

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "null" ? `?status=${status}` : " ";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.lable} value={status.value || "null"}>
            {status.lable}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
