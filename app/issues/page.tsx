import prisma from "@/prisma/client";
import React from "react";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // validate the status
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: status },
  });

  // await delay(2000);
  return (
    <Flex direction={'column'} gap={'3'}>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

//to render the page dynamicly
export const dynamic = "force-dynamic";
 
export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}