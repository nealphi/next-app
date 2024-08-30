import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams: { page } }: Props) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <div>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
}
