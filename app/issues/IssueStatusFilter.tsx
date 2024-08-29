'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssueStatusFilter = () => {
  const statuses: { lable: string, value?: Status}[] = [
    { lable: "All"},
    { lable: "Open", value: 'OPEN' },
    { lable: "Closed", value: 'CLOSED' },
    { lable: "In Progress", value: 'IN_PROGRESS' },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        { statuses.map( status => <Select.Item key={status.value} value={status.value || "null"}>{status.lable}</Select.Item>) }
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
