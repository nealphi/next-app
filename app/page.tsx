import React from "react";
import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: {
    page: string
  }
}

export default function Home({searchParams: {page}}: Props) {
  return <div>
    <LatestIssues/>
  </div>
}
