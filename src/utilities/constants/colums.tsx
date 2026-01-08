import type { ColumnDef } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import type { HouseItem } from "@/models/response/houseResponse";
import {
  formatDate,
  formatFileSize,
  getResourceTypeClassName,
  getStatusClassName,
} from "../helper";
import { imgLinks } from "@/assets/assetLink";
import type { roomData } from "@/models/response/roomResponse";
import type { resourceType } from "@/models/response/resourceResponse";
import type { billProps } from "@/models/response/costResponse";
import type { Account } from "@/models/response/organizationResponse";

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
      <span className="text-right line-clamp-1 block ">
        {formatDate(row.houseCreatedAt)}
      </span>
    ),
  },
];

export const serverSiteColumns: ColumnDef<Account>[] = [
  {
    id: "account_id",
    header: "ID",
    accessorKey: "account_id",
    cell: (row) => <span className="">{row.account_id}</span>,
    sortable: true,
  },
  {
    id: "account_name",
    header: "SITE NAME",
    accessorKey: "account_name",
    cell: (row) => (
      <span className="line-clamp-1 font-brfirma-bold text-xs">
        {row.account_name}
      </span>
    ),
    sortable: true,
  },
  {
    id: "account_provider",
    header: "PROVIDER",
    accessorKey: "account_provider",
    headerClassName: "text-center ",
    sortable: true,
    cell: (row) => (
      <span className="text-center justify-center items-left flex">
        {row.account_provider.toLocaleLowerCase() === "aws" ? (
          <img src={imgLinks.awsdark} className="size-5" alt="AWS" />
        ) : (
          <img src={imgLinks.huawei} className="size-5" alt="Huawei" />
        )}
      </span>
    ),
  },
  {
    id: "account_status",
    header: "STATUS",
    accessorKey: "account_status",
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          className={getStatusClassName(row.account_status)}
        >
          {row.account_status}
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
    id: "account_created_at",
    header: "Site Created At",
    headerClassName: "text-right",
    accessorKey: "account_created_at",
    sortable: true,
    cell: (row) => (
      <span className="text-right line-clamp-1 block">
        {formatDate(row.account_created_at)}
      </span>
    ),
  },
  // {
  //   id: "siteEOLAction",
  //   header: "Site EOL Action",
  //   headerClassName: "text-right",
  //   accessorKey: "siteEOLAction",
  //   sortable: true,
  //   cell: (row) => (
  //     <span className="text-right line-clamp-1 block">{row.siteEOLAction}</span>
  //   ),
  // },
  // {
  //   id: "siteBill",
  //   header: "BILL (USD)",
  //   accessorKey: "siteBill",
  //   headerClassName: "text-right",
  //   cell: (row) => (
  //     <span className="block text-green-700 dark:text-green-400 text-right">
  //       {row.siteBill}
  //     </span>
  //   ),
  //   sortable: true,
  // },
];

export const monthlyCostTableColumn: ColumnDef<billProps>[] = [
  {
    id: "service_type_name",
    header: "SERVICE TYPE NAME",
    accessorKey: "service_type_name",
    cell: (row) => <span className="">{row.service_type_name}</span>,
    sortable: true,
  },
  {
    id: "count",
    header: "COUNT",
    accessorKey: "count",
    cell: (row) => <span className="line-clamp-1 text-xs">{row.count}</span>,
    sortable: true,
  },
  {
    id: "official_amount",
    header: "AMOUNT ($)",
    accessorKey: "official_amount",
    headerClassName: "text-right",
    cell: (row) => (
      <span className="hover:text-red-500 text-right line-clamp-1">
        {row.official_amount}
      </span>
    ),
    sortable: true,
  },
  {
    id: "official_discount_amount",
    header: "DISCOUNT AMOUNT ($)",
    accessorKey: "official_discount_amount",
    headerClassName: "text-right",
    sortable: true,
    cell: (row) => (
      <span className="hover:text-red-500 text-right line-clamp-1">
        {row.official_discount_amount}
      </span>
    ),
  },
  {
    id: "debt_amount",
    header: "DEBT ($)",
    headerClassName: "text-right",
    accessorKey: "debt_amount",
    sortable: true,
    cell: (row) => (
      <span className="hover:text-red-500 text-right line-clamp-1">
        {row.debt_amount}
      </span>
    ),
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
    cell: (row) => (
      <span className="line-clamp-1 ellipses">{row.roomName}</span>
    ),
    sortable: true,
  },
  {
    id: "roomCode",
    header: "ROOM CODE",
    accessorKey: "roomCode",
    cell: (row) => (
      <span className=" line-clamp-1 ellipses">{row.roomCode}</span>
    ),
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
      <span className="text-right line-clamp-1 block">
        {formatDate(row.roomCreatedAt)}
      </span>
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
      <span className="text-center  justify-center flex">
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
      <span className="text-right line-clamp-1 block">
        {row?.resourceCreatedAt}
      </span>
    ),
  },
];

export type containerRegistryType = {
  imageType: string;
  pushedAt: string;
  imageUrl: string;
  size: number;
  pull: string;
};

export const containerRegistryColumn: ColumnDef<containerRegistryType>[] = [
  {
    id: "imageType",
    header: " Image Type",
    accessorKey: "imageType",
    cell: (row) => <span className="line-clamp-1">{row.imageType}</span>,
    sortable: true,
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
    id: "pushedAt",
    header: "Pushed At",
    accessorKey: "pushedAt",
    sortable: true,
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          className={`text-[10px] border-green-600 text-green-600`}
        >
          {row.pushedAt}
        </Badge>
      </div>
    ),
  },

  {
    id: "imageUrl",
    header: "Image Url",
    accessorKey: "imageUrl",
    sortable: true,
    cell: (row) => (
      <a href={row.imageUrl} target="_blank" rel="noopener noreferrer">
        <div className="underline hover:text-red-600">{row.imageUrl}</div>
      </a>
    ),
  },
  {
    id: "pull",
    header: "Pull",
    accessorKey: "pull",
    cell: (row) => <span className="line-clamp-1">{row.pull}</span>,
    sortable: true,
  },
];

export type obsType = {
  Key: string | null;
  Size: number;
  Url: string;
};

export const obsColumns: ColumnDef<obsType>[] = [
  {
    id: "Key",
    header: " Key",
    accessorKey: "Key",
    cell: (row) => <span className="line-clamp-1">{row.Key}</span>,
    sortable: true,
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
    id: "Size",
    header: "Size",
    accessorKey: "Size",
    sortable: true,
    cell: (row) => (
      <div className="">
        <Badge
          variant="outline"
          className={`text-[10px] border-green-600 text-green-600`}
        >
          {formatFileSize(row.Size)}
        </Badge>
      </div>
    ),
  },

  {
    id: "Url",
    header: "Url",
    accessorKey: "Url",
    sortable: true,
    cell: (row) => (
      <a href={row.Url} target="_blank" rel="noopener noreferrer">
        <div className="underline hover:text-red-600">{row.Url}</div>
      </a>
    ),
  },
];

export type certificateManagerType = {
  name: string;
  domainName: string;
  domainType: string;
  certificatinType: string;
  expiryDate: string;
  status: string;
  validityPeriod: string;
};

export const certificateManagerColumns: ColumnDef<certificateManagerType>[] = [
  {
    id: "name",
    header: "Certificate Name/ID",
    accessorKey: "name",
    cell: (row) => <span className="line-clamp-1">{row.name}</span>,
    sortable: true,
  },
  {
    id: "domainName",
    header: "Domain Name",
    accessorKey: "domainName",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.domainName}</span>,
  },
  {
    id: "domainType",
    header: "Domain Type",
    accessorKey: "domainType",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.domainType}</span>,
  },
  {
    id: "certificatinType",
    header: "Certificatin Type",
    accessorKey: "certificatinType",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.certificatinType}</span>,
  },

  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.status}</span>,
  },
  {
    id: "validityPeriod",
    header: "Validity Period",
    accessorKey: "validityPeriod",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.validityPeriod}</span>,
  },
  {
    id: "expiryDate",
    header: "Expiry Date",
    accessorKey: "expiryDate",
    sortable: true,
    cell: (row) => <span className="line-clamp-1">{row.expiryDate}</span>,
  },
];
