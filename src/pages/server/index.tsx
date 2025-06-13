import { resources } from "@/utils/constants/config";
import { useParams } from "react-router-dom";
import { DataTable } from "@/components/shared";
import { Header } from "./header";
import { Architecture } from "./architecure";

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
      cell: (row) => <span className="font-mono  block">{row.id}</span>,
    },
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
      cell: (row) => <span className="font-mono  block">{row.name}</span>,
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      cell: (row) => <span className="font-mono  block">{row.type}</span>,
    },
    {
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: (row) => <span className="font-mono  block">{row.status}</span>,
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
        <Header serverRoom={serverRoom} />
        <div className="flex flex-col w-full">
          <div>
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
