import { Button, Header, type ColumnDef } from "@/components/shared";
import { DataTable } from "@/components/shared/datatable";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Crown, Shield, UserPlus, Users } from "lucide-react";

export const Access = () => {
  interface TeamMember {
    id: string
    name: string
    email: string
    role: "Owner" | "Admin" | "Developer" | "Viewer"
    status: "Active" | "Pending" | "Suspended"
    lastActive: string
    joinedDate: string
    avatar?: string
    permissions: string[]
  }

  const teamMembers: TeamMember[] = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "Active",
      lastActive: "2024-03-27T10:30:00Z",
      joinedDate: "2023-01-15",
      avatar: "/placeholder.svg?height=32&width=32",
      permissions: ["all"],
    },
    {
      id: "user-002",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "2024-03-27T09:15:00Z",
      joinedDate: "2023-03-20",
      permissions: ["manage_users", "manage_projects", "view_billing"],
    },
    {
      id: "user-003",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Developer",
      status: "Active",
      lastActive: "2024-03-26T16:45:00Z",
      joinedDate: "2023-06-10",
      permissions: ["manage_projects", "deploy_apps"],
    },
    {
      id: "user-004",
      name: "Carol Davis",
      email: "carol@example.com",
      role: "Developer",
      status: "Pending",
      lastActive: "",
      joinedDate: "2024-03-25",
      permissions: ["manage_projects"],
    },
    {
      id: "user-005",
      name: "David Wilson",
      email: "david@example.com",
      role: "Viewer",
      status: "Suspended",
      lastActive: "2024-03-20T14:20:00Z",
      joinedDate: "2023-11-05",
      permissions: ["view_projects"],
    },
  ]
  const memberColumns: ColumnDef<TeamMember>[] = [
    {
      id: "user",
      header: "User",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          
          <div>
            <p className="text-xs text-gray-900  my-1">{row.name}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          
          <div>
            <p className="text-xs">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.role === "Owner"
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : row.role === "Admin"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : row.role === "Developer"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {row.role === "Owner" && <Crown className="h-3 w-3 mr-1" />}
          {row.role === "Admin" && <Shield className="h-3 w-3 mr-1" />}
          {row.role}
        </Badge>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Owner", value: "Owner" },
        { label: "Admin", value: "Admin" },
        { label: "Developer", value: "Developer" },
        { label: "Viewer", value: "Viewer" },
      ],
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={
            row.status === "Active"
              ? "bg-green-50 text-green-700 border-green-200"
              : row.status === "Pending"
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {row.status === "Active" && <CheckCircle className="h-3 w-3 mr-1" />}
          {row.status === "Suspended" && <AlertTriangle className="h-3 w-3 mr-1" />}
          {row.status}
        </Badge>
      ),
      sortable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
        { label: "Suspended", value: "Suspended" },
      ],
    },
    {
      id: "lastActive",
      header: "Last Active",
      accessorKey: "lastActive",
      cell: (row) => (row.lastActive ? new Date(row.lastActive).toLocaleDateString() : "Never"),
      sortable: true,
    },
    {
      id: "joinedDate",
      header: "Joined",
      accessorKey: "joinedDate",
      cell: (row) => new Date(row.joinedDate).toLocaleDateString(),
      sortable: true,
    },
  ]
  return (
    <div>
    
      <Header
        title="Access"
        description="Manage team members, roles, and access"
      />
      <div className="m-5 lg:m-10 flex lg:flex-row flex-col gap-5">
        <div className="border border-gray-100 max-w-sm">
          <CardContent className="px-6 py-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold ">Team Collaboration</h4>
                <p className="text-xs ">Invite team members</p>
              </div>
            </div>
            <p className="text-xs  mb-3">
              Share access to your cloud resources with your team for better
              collaboration.
            </p>
            <Button label="Invite Members" className=" text-white" />
          </CardContent>
        </div>
        <div className="border border-gray-100 lg:min-w-xs  justify-center  flex items-center ">
          <CardContent className="p-6 flex items-center justify-between w-full space-x-5">
            <div className="space-y-2">
              <h4 className="text-xs ">Pending Invites</h4>
              <p className="text-5xl ">00</p>
              <p className="text-xs ">awaiting response</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </div>
      </div>
      <div className="px-5 flex flex-col">
        <DataTable
          data={teamMembers}
          columns={memberColumns}
          searchPlaceholder="Search server resources by name, ID, or region..."
          pageSize={5}
          // actions={actions}
          // highlightedRowId={rowId}
          // onRowClick={handleRowClick}
          // getRowId={(row) => row.resourceId}
          initialSorting={{ id: "resourceName", desc: false }}
        />
      </div>
    </div>
  );
};
