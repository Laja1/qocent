import { Button, DataTable, Header, type ColumnDef } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { serverRooms, type ServerRoomType } from "@/utils/constants/config";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export const ServerRoom = () => {
  const navigate = useNavigate();
  const serverRoomColumns: ColumnDef<ServerRoomType>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => <span className="font-mono text-sm">{row.id}</span>,
      sortable: true,
    },
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "view",
      header: "VIEW",
      accessorKey: (row) => row.id,
      cell: (row) => (
        <div
          className="text-purple-500 flex-row flex items-center hover:text-blue-800 p-0 h-auto cursor-pointer hover:underline"
          onClick={() => {
            navigate(`/dashboard/server/${row.id}`);
          }}
        >
          <Eye className="h-4 w-4 mr-1" />
          View {row.id}
        </div>
      ),
    },
    {
      id: "region",
      header: "REGION",
      accessorKey: "region",
      cell: (row) => <span className="text-blue-600">{row.region}</span>,
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "US", value: "US" },
        { label: "UK", value: "UK" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "South Africa", value: "South Africa" },
      ],
    },
    {
      id: "createdAt",
      header: "DATE",
      accessorKey: "createdAt",
      sortable: true,
    },
    {
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.status === "ACTIVE"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "ACTIVE" },
        { label: "Maintenance", value: "MAINTENANCE" },
      ],
    },
    {
      id: "bill",
      header: "BILL (USD)",
      accessorKey: "bill",
      cell: (row) => (
        <span className="font-mono text-right block">
          {row.bill.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
    {
      id: "credit",
      header: "CREDIT (USD)",
      accessorKey: "credit",
      cell: (row) => (
        <span className="font-mono text-right block">
          {row.credit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="">
      <Header title="Server Room" description="Manage your server room">
        <Button label="Server Room" />
      </Header>

      <div className="p-5 flex flex-col">
        <h3 className="text-base font-medium pb-4">
          Select a server room to view its resources
        </h3>

        <DataTable
          data={serverRooms}
          columns={serverRoomColumns}
          title="Server Rooms"
          description={`${serverRooms.length} server rooms available`}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          onRowClick={(row) => navigate(`/dashboard/server/${row.id}`)}
          filterableColumns={["status", "region"]}
          initialSorting={{ id: "name", desc: false }}
        />
      </div>
    </div>
  );
};
