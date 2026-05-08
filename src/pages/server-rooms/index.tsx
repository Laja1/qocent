import { Button, Header, Tabs } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Edit, Eye, Trash2, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAllRoomQuery,
  useGetResourceInRoomQuery,
} from "@/service/kotlin/roomApi";
import type { RootState } from "@/store";
import type { roomData } from "@/models/response/roomResponse";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { Card } from "@/components/ui/card";
import { serverRoomColumns } from "@/utilities/constants/colums";
import { useState } from "react";
import { ResourceTable } from "../server-sites/server-sites-table";
import { SecurityTable } from "../server-sites/security-table";

export const ServerRooms = () => {
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.account);
  const [selectedRoomCode, setSelectedRoomCode] = useState("");
  const [tabShow, setTabShow] = useState(false);
  const [rowId, setRowId] = useState("");
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const { data, isLoading } = useGetAllRoomQuery(
    {
      accountCode: account?.accountCode,
      provider: dashboard?.provider,
      type: account.type,
    },
    {
      skip: !account?.accountCode,
    }
  );
  const { data: resourceInRoom, isLoading: isResourceLoading } =
    useGetResourceInRoomQuery(
      {
        roomCode: selectedRoomCode,
      },
      {
        skip: !selectedRoomCode,
      }
    );
  // const [rowId, setRowId] = useState("R-0001");

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: (row: roomData) => {
        NiceModal.show(ModalConstant.DrawerModal, row);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: async (row: roomData) => {
        console.log("Edit server room:", row.roomId);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: async (row: roomData) => {
        console.log("Delete server room:", row.roomId);
        NiceModal.show(ModalConstant.DeleteRoomModal, row);
      },
      variant: "destructive" as const,
    },
  ];

  const handleRowClick = async (row: roomData) => {
    setTabShow(true);
    setRowId(row.roomId);
    setSelectedRoomCode(row.roomCode);

    // setIsArtificialLoading(true);

    // const timeout = setTimeout(() => {
    //   setIsArtificialLoading(false);
    // }, 1500);

    // setLoadingTimeout(timeout);

    try {
      // await refetchDataFlow();
    } catch (error) {
      console.error("Error refetching data flow:", error);
      // setIsArtificialLoading(false);
    }
  };
  const tabData = [
    {
      id: 2,
      text: "Resources",
      component: (
        <div className="">
          <ResourceTable
            resourcesInSiteData={resourceInRoom?.data || []}
            isLoading={isResourceLoading}
          />
        </div>
      ),
    },
    // {
    //   id: 3,
    //   text: "Architecture",
    //   component: (
    //     // <div>
    //     //   {/* Show cute loader while data is loading */}
    //     //   {dataFlowLoading ? (
    //     //     <DataFlowLoader />
    //     //   ) : (
    //     //     <div className="my-10">
    //     //       {/* <FlowGrid
    //     //         data={{ data: dataFlow?.data || [] }}
    //     //         connections={{ connections: dataFlow?.connections || [] }}
    //     //       /> */}
    //     //     </div>
    //     //   )}
    //     // </div>
    //   )
    // },
    {
      id: 4,
      text: "Security",
      component: <SecurityTable />,
    },
  ];
  return (
    <div className=" h-full">
      <Header title="Server Rooms" description="Manage your server room">
        <Button
          intent="tertiary"
          label="Create New Room"
          onClick={() => navigate("/create-new-room")}
          prefixIcon={<PlusIcon className="size-4" />}
          size="small"
        />
      </Header>

      <Card className="mx-5 px-5 mt-5 rounded-sm">
        <DataTable
          data={data?.data || []}
          columns={serverRoomColumns}
          isLoading={isLoading}
          title={"SERVER ROOMS"}
          searchPlaceholder="Search server rooms by name, ID, or region..."
          pageSize={5}
          actions={actions}
          highlightedRowId={rowId}
          onRowClick={(row) => handleRowClick(row)}
          getRowId={(row) => row.roomId}
          initialSorting={{ id: "roomCreatedAt", desc: false }}
        />
      </Card>
      {tabShow && (
        <div className="mx-5 mt-5">
          <Tabs tabs={tabData} />
        </div>
      )}
    </div>
  );
};
