import type { ColumnDef } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import type { HouseItem } from "@/models/response/houseResponse";
import {
  formatDate,
  getResourceTypeClassName,
  getStatusClassName,
} from "../helper";
import type { SiteData } from "@/models/response/siteResponse";
import { imgLinks } from "@/assets/assetLink";
import type { roomData } from "@/models/response/roomResponse";
import type { resourceType } from "@/models/response/resourceResponse";

export const serverHouseColumn: ColumnDef<HouseItem>[] = [
  {
    id: "houseId",
    header: "HOUSE ID",
    accessorKey: "houseId",
    cell: (row) => <span className="line-clamp-1">{row?.houseId}</span>,
    sortable: true,
  },
  {
    id: "houseName",
    header: "HOUSE NAME",
    accessorKey: "houseName",
    cell: (row) => (
      <span className="line-clamp-1 font-brfirma-bold">{row.houseName}</span>
    ),
    sortable: true,
  },
  {
    id: "houseCode",
    header: "HOUSE CODE",
    accessorKey: "houseCode",
    cell: (row) => <span className=" line-clamp-1">{row.houseCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "houseSite",
    header: "House Site",
    accessorKey: "houseSite",
    sortable: true,
    cell: (row) => <span>{row.houseSite}</span>,
  },
  {
    id: "houseStatus",
    header: "STATUS",
    accessorKey: "houseStatus",
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          className={getStatusClassName(row.houseStatus)}
        >
          {row.houseStatus}
        </Badge>
      </div>
    ),
    sortable: true,
    filterType: "select",
    filterOptions: [
      { label: "Active", value: "Active" },
      { label: "Pending", value: "Pending" },
    ],
  },
  // {
  //   id: "resourceMaker",
  //   header: "PROVIDER",
  //   accessorKey: "resourceMaker",
  //   sortable: true,
  //   cell: (row) => (
  //     <span className="text-center justify-center flex line-clamp-1">
  //       {row. === "1" ? (
  //         <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
  //       ) : (
  //         <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
  //       )}
  //     </span>
  //   ),
  // },
  {
    id: "houseCidr",
    header: "House Cidr",
    accessorKey: "houseCidr",
    sortable: true,
    cell: (row) => <span className=" ">{row.houseCidr}</span>,
  },
  {
    id: "houseCreatedAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "houseCreatedAt",
    sortable: true,
    cell: (row) => (
      <span className="text-right block ">
        {formatDate(row.houseCreatedAt)}
      </span>
    ),
  },
];

export const serverSiteColumns: ColumnDef<SiteData>[] = [
  {
    id: "siteId",
    header: "ID",
    accessorKey: "siteId",
    cell: (row) => <span className="">{row.siteId}</span>,
    sortable: true,
  },
  {
    id: "siteName",
    header: "SITE NAME",
    accessorKey: "siteName",
    cell: (row) => (
      <span className="line-clamp-1 font-brfirma-bold text-xs">
        {row.siteName}
      </span>
    ),
    sortable: true,
  },
  {
    id: "siteCode",
    header: "SITE CODE",
    accessorKey: "siteCode",
    cell: (row) => (
      <span className="hover:text-red-500 line-clamp-1">{row.siteCode}</span>
    ),
    sortable: true,
  },
  {
    id: "siteProvider",
    header: "PROVIDER",
    accessorKey: "siteProvider",
    headerClassName: "text-center ",
    sortable: true,
    cell: (row) => (
      <span className="text-center justify-center items-left flex">
        {row.siteProvider === "aws" ? (
          <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
        ) : (
          <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
        )}
      </span>
    ),
  },
  {
    id: "siteStatus",
    header: "STATUS",
    accessorKey: "siteStatus",
    cell: (row) => (
      <div className="">
        <Badge variant="outline" className={getStatusClassName(row.siteStatus)}>
          {row.siteStatus}
        </Badge>
      </div>
    ),
    sortable: true,
    filterType: "select",
    filterOptions: [
      { label: "Active", value: "Active" },
      { label: "Pending", value: "Pending" },
    ],
  },
  {
    id: "siteCreatedAt",
    header: "Site Created At",
    headerClassName: "text-right",
    accessorKey: "siteCreatedAt",
    sortable: true,
    cell: (row) => (
      <span className="text-right block">{formatDate(row.siteCreatedAt)}</span>
    ),
  },
  {
    id: "siteEOLAction",
    header: "Site EOL Action",
    headerClassName: "text-right",
    accessorKey: "siteEOLAction",
    sortable: true,
    cell: (row) => (
      <span className="text-right block">{row.siteEOLAction}</span>
    ),
  },
  {
    id: "siteBill",
    header: "BILL (USD)",
    accessorKey: "siteBill",
    headerClassName: "text-right",
    cell: (row) => (
      <span className="block text-green-700 dark:text-green-400 text-right">
        {row.siteBill}
      </span>
    ),
    sortable: true,
  },
];

export const serverRoomColumns: ColumnDef<roomData>[] = [
  {
    id: "roomId",
    header: "ROOM ID",
    accessorKey: "roomId",
    cell: (row) => <span className="">{row.roomId}</span>,
    sortable: true,
  },
  {
    id: "roomName",
    header: "ROOM NAME",
    accessorKey: "roomName",
    cell: (row) => <span className="line-clamp-1 ">{row.roomName}</span>,
    sortable: true,
  },
  {
    id: "roomCode",
    header: "ROOM CODE",
    accessorKey: "roomCode",
    cell: (row) => <span className=" line-clamp-1">{row.roomCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "roomHouse",
    header: "HOUSE CODE",
    accessorKey: "roomHouse",
    cell: (row) => <span className="line-clamp-1">{row.roomHouse}</span>,
    sortable: true,
    filterType: "select",
  },
  // {
  //   id: "siteCode",
  //   header: "SITE CODE",
  //   accessorKey: "siteCode",
  //   cell: (row) => (
  //     <span className="text-amber-800 line-clamp-1">{row.siteCode}</span>
  //   ),
  //   sortable: true,
  //   filterType: "select",
  // },

  // {
  //   id: "provider",
  //   header: "PROVIDER",
  //   accessorKey: "provider",
  //   sortable: true,
  //   cell: (row) => (
  //     <span className="text-center justify-center flex">
  //       {row.provider === "AWS" ? (
  //         <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
  //       ) : (
  //         <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
  //       )}
  //     </span>
  //   ),
  // },
  {
    id: "roomCidr",
    header: "IP RANGE",

    accessorKey: "roomCidr",
    sortable: true,
    cell: (row) => <span className="block">{row.roomCidr}</span>,
  },
  {
    id: "roomStatus",
    header: "Room Status",
    accessorKey: "roomStatus",
    sortable: true,
    cell: (row) => (
      <div className="">
        <Badge variant="outline" className={getStatusClassName(row.roomStatus)}>
          {row.roomStatus}
        </Badge>
      </div>
    ),
  },
  {
    id: "roomType",
    header: "TYPE",
    accessorKey: "roomType",
    headerClassName: "text-center",
    sortable: true,
    cell: (row) => (
      <Badge
        variant="outline"
        className={`${
          row.roomType === "Private"
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-amber-500 bg-amber-50 text-amber-700"
        } text-right justify-center flex w-full`}
      >
        {row.roomType}
      </Badge>
    ),
  },

  {
    id: "roomCreatedAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "roomCreatedAt",
    sortable: true,
    cell: (row) => (
      <span className="text-right block">{formatDate(row.roomCreatedAt)}</span>
    ),
  },
  // {
  //   id: "resourcesDeployed",
  //   header: "RESOURCES",
  //   accessorKey: "resourcesDeployed",
  //   sortable: true,
  //   cell: (row) => (
  //     <span className="text-center justify-center flex">
  //       {row.roomCode}
  //     </span>
  //   ),
  // },
];

export const resourcesColumns: ColumnDef<resourceType>[] = [
  {
    id: "resourceId",
    header: "RESOURCE ID",
    accessorKey: "resourceId",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.resourceId}</span>
    ),
    sortable: true,
  },
  {
    id: "resourceName",
    header: "RESOURCE NAME",
    accessorKey: "resourceName",
    cell: (row) => <span className="line-clamp-1">{row.resourceName}</span>,
    sortable: true,
  },
  {
    id: "resourceCode",
    header: "CODE",
    accessorKey: "resourceCode",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.resourceCode}</span>
    ),
    sortable: true,
    filterType: "select",
  },
  // {
  //   id: "resourceSiteCode",
  //   header: "SITE CODE",
  //   accessorKey: "resourceSiteCode",
  //   cell: (row) => <span className="line-clamp-1">{row.resourceSiteCode}</span>,
  //   sortable: true,
  //   filterType: "select",
  // },
  {
    id: "resourceHouseCode",
    header: "HOUSE CODE",
    accessorKey: "resourceHouseCode",
    cell: (row) => (
      <span className="line-clamp-1">{row.resourceHouseCode}</span>
    ),
    sortable: true,
    filterType: "select",
  },
  {
    id: "resourceRoomCode",
    header: "ROOM CODE",
    accessorKey: "resourceRoomCode",
    cell: (row) => <span className="line-clamp-1">{row.resourceRoomCode}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "resourceIP",
    header: "Resource IP",
    accessorKey: "resourceIP",
    cell: (row) => <span className="line-clamp-1">{row.resourceIP}</span>,
    sortable: true,
    filterType: "select",
  },
  {
    id: "resourceType",
    header: "TYPE",
    accessorKey: "resourceType",
    sortable: true,
    cell: (row) => (
      <Badge
        variant="outline"
        className={`${getResourceTypeClassName(
          row.resourceType
        )} text-right justify-center flex w-full`}
      >
        {row.resourceType}
      </Badge>
    ),
  },
  {
    id: "resourceProvider",
    header: "PROVIDER",
    accessorKey: "resourceProvider",
    sortable: true,
    cell: (row) => (
      <span className="text-center justify-center flex">
        {row.resourceProvider === "AWS" ? (
          <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
        ) : (
          <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
        )}
      </span>
    ),
  },
  {
    id: "resourceStatus",
    header: "Resource Status",
    accessorKey: "resourceStatus",
    sortable: true,
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          className={`text-[10px] ${getStatusClassName(row.resourceStatus)}`}
        >
          {row.resourceStatus}
        </Badge>
      </div>
    ),
  },
  {
    id: "resourceCreatedAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "resourceCreatedAt",
    sortable: true,
    cell: (row) => (
      <span className="text-right block">{row?.resourceCreatedAt}</span>
    ),
  },
];

export type obsType = {
  id: number;
  code: string;
  name: string | null;
  type: string;
  status: string;

  createdAt: string; // e.g. "07/24/2025 10:12:45 AM"
};

export const obsColumns: ColumnDef<obsType>[] = [
  {
    id: "Id",
    header: "ID",
    accessorKey: "id",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.id}</span>
    ),
    sortable: true,
  },
  {
    id: "name",
    header: " NAME",
    accessorKey: "name",
    cell: (row) => <span className="line-clamp-1">{row.name}</span>,
    sortable: true,
  },
  {
    id: "Code",
    header: "CODE",
    accessorKey: "code",
    cell: (row) => (
      <span className="text-amber-800 line-clamp-1">{row.code}</span>
    ),
    sortable: true,
    filterType: "select",
  },
  // {
  //   id: "SiteCode",
  //   header: "SITE CODE",
  //   accessorKey: "SiteCode",
  //   cell: (row) => <span className="line-clamp-1">{row.SiteCode}</span>,
  //   sortable: true,
  //   filterType: "select",
  // },

  {
    id: "Status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          // className={`text-[10px] ${getStatusClassName(row.resourceStatus)}`}
        >
          {row.status}
        </Badge>
      </div>
    ),
  },
  {
    id: "CreatedAt",
    header: "DATE CREATED",
    headerClassName: "text-right",
    accessorKey: "createdAt",
    sortable: true,
    cell: (row) => <span className="text-right block">{row?.createdAt}</span>,
  },
];
