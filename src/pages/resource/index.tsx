import { CardContent } from "@/components/ui/card";
import {
  MatrixTable,
  type MatrixColumn,
  type MatrixRow,
} from "@/components/shared/matrix-table";
import { Button, Header } from "@/components/shared";
import { PlusIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Resource = () => {
    const location = useLocation()
    const row = location.state
    console.log(row)
  const columns: MatrixColumn[] = [
    { id: "server1", label: "WEB SERVER", description: "Frontend" },
    { id: "server2", label: "API SERVER", description: "Backend" },
    { id: "server3", label: "DB SERVER", description: "Database" },
  ];

  const rows: MatrixRow[] = [
    {
      id: "cpu",
      label: "CPU Cores",
      // description: "Database type",
      cells: {
        server1: { value: "4 cores", editable: false },
        server2: { value: "8 cores", editable: false },
        server3: { value: "16 cores", editable: false },
      },
    },
    {
      id: "memory",
      label: "Memory",
      cells: {
        server1: { value: "8 GB", editable: false },
        server2: { value: "16 GB", editable: false },
        server3: { value: "64 GB", editable: false },
      },
    },
    {
      id: "storage",
      label: "Storage",
      cells: {
        server1: { value: "100 GB SSD", editable: false },
        server2: { value: "500 GB SSD", editable: false },
        server3: { value: "2 TB SSD", editable: false },
      },
    },
    {
      id: "vpcid",
      label: "VpcId",

      cells: {
        server1: { value: "vpc-12345", editable: false },
        server2: { value: "vpc-23456", editable: false },
        server3: { value: "vpc-34567", editable: false },
        server4: { value: "vpc-45678", editable: false },
      },
    },
    {
      id: "type",
      label: "Type",
      description: "Database type",
      cells: {
        server1: { value: "PostgreSQL", editable: false },
        server2: { value: "PostgreSQL", editable: false },
        server3: { value: "PostgreSQL", editable: false },
        server4: { value: "PostgreSQL", editable: false },
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Header title={row?.parent} description={row?.cateogry}>
        <Button
          intent="tertiary"
          label={`Create New ${row.cateogry}`}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <div>
        <CardContent>
          <MatrixTable
            // title="Server Specifications"
            // description="Read-only comparison of server specifications"
            topLeftHeader="SPECIFICATIONS"
            secondRowLeftHeader="SPEC CODE"
            columns={columns}
            rows={rows}
            maxHeight="400px"
            stickyHeaders={true}
          />
        </CardContent>
      </div>
    </div>
  );
};
