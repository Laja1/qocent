import { DataTable, Header, type ColumnDef } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { serverRooms, type ServerRoomType } from "@/utilities/constants/config";
import { useNavigate } from "react-router-dom";

export const ServerRoom = () => {
  const navigate = useNavigate();
  const serverRoomColumns: ColumnDef<ServerRoomType>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => (
        <span className=" text-amber-800 ">{row.id}</span>
      ),
      sortable: true,
    },
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "region",
      header: "REGION",
      accessorKey: "region",
      cell: (row) => <span className="text-amber-800">{row.region}</span>,
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
      cell: (row) => <span className="">{row.createdAt}</span>,
    },
    {
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={ `text-xs `+
            row.status === "ACTIVE"
              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
              : "bg-red-50 text-red-700 text-[10px] border-red-200"
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
        <span className=" text-green-700   text-right">
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
        <span className=" text-green-700  justify-end text-right">
          {row.credit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
      sortable: true,
    },
  ];

 

  // const handlePageClick = (val: number) => {
  //   setParams((prev) => ({ ...prev, page: val }));
  // };

  // const handlePageCountChange = (val: number) => {
  //   setParams((prev) => ({ ...prev, size: val }));
  // };
  return (
    <div className="">
      <Header title="Server Rooms" description="Manage your server room">
        {/* <Button label="Server Rooms" /> */}
        <p className="text-white text-xs">tosin@example.com</p>
      </Header>

      <div className="p-5 flex flex-col">
        <DataTable
          data={serverRooms}
          columns={serverRoomColumns}
          title="Server Rooms"
          description={`${serverRooms.length} server rooms available`}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          onRowClick={(row) => navigate(`/dashboard/server/${row.id}`)}
          initialSorting={{ id: "name", desc: false }}
        />
      </div>
      {/* <Table
        columns={columns}
        data={dummyUsers}
        // loading={isGettingUser}
        // isFetching={isFetching}
        // actions={(row) =>
        //   hasPermission(permissions.manageUserAccount) ? TableAction(row) : undefined
        // }
      /> */}
    </div>
  );
};
