import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

//Record is a utility type in ts that allows us to define key-value pairs that have particular type
const statusMap: Record < Status, { lable: string; color: "red" | "violet" | "green" }> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  CLOSED: { lable: "Closed", color: "green" },
};

interface Props {
  status: Status 
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
  <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge> 

  )
}

export default IssueStatusBadge;
