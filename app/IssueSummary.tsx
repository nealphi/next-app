import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { lable: string; value: number; status: Status }[] = [
    { lable: "Open Issues", value: open, status: "OPEN" },
    { lable: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { lable: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"4"}>
      {containers.map((container) => (
        <Card key={container.lable}>
          <Flex direction={"column"} gap={'1'}>
            <Link className="text-sm font-medium" href={`/issues?status=${container.status}`}>
              {container.lable}
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
