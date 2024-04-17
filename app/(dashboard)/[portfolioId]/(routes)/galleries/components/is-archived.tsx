import { Badge } from "@/components/ui/badge";
import React from "react";

type isArchivedIsArchivedProps = {
  IsArchived: boolean;
};

const IsArchived: React.FC<isArchivedIsArchivedProps> = ({ IsArchived }) => {
  const text = IsArchived ? "Yes" : "No";
  const color = IsArchived
    ? "bg-green-500 text-xs font-sans text-slate-800 px-5"
    : "bg-gray-200 text-xs font-sans text-slate-800 px-5";

  return <span className={`${color} p-1 rounded-md`}>{text}</span>;
};

export default IsArchived;
