import { resources } from "@/utilities/constants/config";
import { useParams } from "react-router-dom";
import { DataTable, Header } from "@/components/shared";
import { Architecture } from "./architecure";
import { Badge } from "@/components/ui/badge";

export const Server = () => {
  const params = useParams();

  // Extract the server room based on the provided id in the params
  const serverRoom = resources.find(
    (serverRoom) => serverRoom.id === params.id
  );

  const serverRoomColumns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: (row) => <span className="block text-amber-800">{row.id}</span>,
    },
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
      cell: (row) => <span className="block ">{row.name}</span>,
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      cell: (row) => <span className="block text-amber-800">{row.type}</span>,
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
              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
              : "bg-red-50 text-red-700 text-[10px] border-red-200"
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  // Gather all resource data (servers, databases, file cabinets, etc.)
  const resourceData = serverRoom?.resources.flatMap((resource) => [
    ...resource.servers.map((server) => ({
      id: server.id,
      name: server.name,
      type: server.type,
      status: server.status,
    })),
    ...resource.databases.map((database) => ({
      id: database.id,
      name: database.name,
      type: database.type,
      status: database.status,
    })),
    ...resource.fileCabinets.map((fileCabinet) => ({
      id: fileCabinet.id,
      name: fileCabinet.name,
      type: fileCabinet.type,
      status: fileCabinet.status,
    })),
    ...resource.sanDisks.map((sanDisk) => ({
      id: sanDisk.id,
      name: sanDisk.name,
      type: sanDisk.type,
      status: sanDisk.status,
    })),
    ...resource.subnets.map((subnet) => ({
      id: subnet.id,
      name: subnet.name,
      type: subnet.type,
      status: subnet.status,
    })),
    ...resource.vpc.map((vpc) => ({
      id: vpc.id,
      name: vpc.name,
      type: vpc.type,
      status: vpc.status,
    })),
  ]);

  return (
    <div>
      <div>
      <Header navigateBack={true} title={serverRoom?.name} description={serverRoom?.id} />
       
      
        <div className="flex flex-col w-full">
          <div className="p-5">
            <DataTable
              data={resourceData || []}
              columns={serverRoomColumns}
              title={`${serverRoom?.name} Resources`}
              description={`${resourceData?.length} resources`}
              searchPlaceholder="Search by resource type..."
              onRowClick={(row) => console.log("Clicked:", row.original)}
              initialSorting={{ id: "name", desc: false }}
            />
          </div>
          <Architecture />
        </div>
      </div>
    </div>
  );
};
