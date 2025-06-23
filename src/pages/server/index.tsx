import { resources } from "@/utilities/constants/config";
import { useParams } from "react-router-dom";
import { Button, DataTable, Header, type ColumnDef } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { ArchitectureOverview } from "./architecture-overview";

export const Server = () => {
  const params = useParams();

  // Extract the server room based on the provided id in the params
  const serverRoom = resources.find(
    (serverRoom) => serverRoom.id === params.id
  );

  type ServerRoom = {
    id: string;
    name: string;
    type: string;
    status: "Active" | "Suspended";
  };

  const serverRoomColumns: ColumnDef<ServerRoom>[] = [
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
            row.status === "Active"
              ? "bg-green-50 text-green-700 text-[10px] border-green-200"
              : "bg-red-50 text-red-700 text-[10px] border-red-200"
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  type resourceDataType = {
    id: string;
    name: string;
    type: string;
    status: 'Active' | 'Suspended';
  }
  // Gather all resource data (servers, databases, file cabinets, etc.)
  const resourceData: resourceDataType[] =
  serverRoom?.resources?.flatMap((resource) => [
    ...resource.servers.map((server) => ({
      id: server.id,
      name: server.name,
      type: server.type,
      status: server.status as 'Active' | 'Suspended' // <-- If needed
    })),
    ...resource.databases.map((database) => ({
      id: database.id,
      name: database.name,
      type: database.type,
      status: database.status as 'Active' | 'Suspended'
    })),
    ...resource.fileCabinets.map((fileCabinet) => ({
      id: fileCabinet.id,
      name: fileCabinet.name,
      type: fileCabinet.type,
      status: fileCabinet.status as 'Active' | 'Suspended'
    })),
    ...resource.sanDisks.map((sanDisk) => ({
      id: sanDisk.id,
      name: sanDisk.name,
      type: sanDisk.type,
      status: sanDisk.status as 'Active' | 'Suspended'
    })),
    ...resource.subnets.map((subnet) => ({
      id: subnet.id,
      name: subnet.name,
      type: subnet.type,
      status: subnet.status as 'Active' | 'Suspended'
    })),
    ...resource.vpc.map((vpc) => ({
      id: vpc.id,
      name: vpc.name,
      type: vpc.type,
      status: vpc.status as 'Active' | 'Suspended'
    })),
  ]) ?? []; 

  


  return (
    <div>
      <div>
        <Header
          navigateBack={true}
          title={serverRoom?.name}
          description={serverRoom?.id}
        ><Button intent='secondary' size="small" prefixIcon={<Plus className="size-4"/>} label="Deploy new resource"/></Header>

        <div className="flex flex-col w-full">
          <div className="p-5">
            <DataTable<resourceDataType>
              data={resourceData || []}
              columns={serverRoomColumns}
              title={`${serverRoom?.name} Resources`}
              description={`${resourceData?.length} resources`}
              searchPlaceholder="Search by resource type..."
              // onRowClick={(row) => console.log("Clicked:")}
              initialSorting={{ id: "name", desc: false }}
            />

            <div className=" w-full  pt-5 flex flex-col">
              <p className="text-xl font-bold">Data Center</p>
              <ArchitectureOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
