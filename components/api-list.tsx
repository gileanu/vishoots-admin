"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseURL = `${origin}/api/${params.portfolioId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        desc={`${baseURL}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        desc={`${baseURL}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="secret"
        desc={`${baseURL}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="secret"
        desc={`${baseURL}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="secret"
        desc={`${baseURL}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
