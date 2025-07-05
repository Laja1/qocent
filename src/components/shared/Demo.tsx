import  { useState } from "react";
import { EditableDataTable } from "./table";

type User = {
  name: string;
  email: string;
  role: string;
};

const Demo = () => {
  const [users, setUsers] = useState<User[]>([
    { name: "Ife", email: "ifeadelaja@gmail.com", role: "admin" },
    { name: "John", email: "john@example.com", role: "user" },
  ]);

  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name" as keyof User,
      editable: true,
      editType: "text" as const,
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email" as keyof User,
      editable: true,
      editType: "text" as const,
      sortable: true,
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role" as keyof User,
      editable: true,
      editType: "select" as const,
      sortable: true,
      editOptions: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ],
    },
  ];

  const handleDataChange = (newData: User[]) => {
    setUsers(newData);
    console.log("Data changed:", newData);
  };

  return (
    <div className="p-4">
      <EditableDataTable 
        data={users} 
        columns={columns} 
        editable={true}
        onDataChange={handleDataChange}
       showDownload={false}
       showSearch={false}
      />
    </div>
  );
};

export default Demo;