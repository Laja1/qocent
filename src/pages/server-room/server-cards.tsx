import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ServerCrash } from "lucide-react";

export  type ServerCardsProps = {
  id: string;
  resourceCount: number;
  name: string;
  description: string;
  region: string;
  status: string;
  createdAt: string;
};

export type ServerDataProps = {
  serverData: ServerCardsProps[];
};

export const ServerCards = ({ serverData }: ServerDataProps) => {
  const badgeToRender = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <ServerCrash className="text-green-800 size-5" /> {status}
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <ServerCrash className="text-red-800 size-5" /> {status}
          </Badge>
        );
      case "Maintenance":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <ServerCrash className="text-orange-800 size-5" /> {status}
          </Badge>
        );
    }
  };
  const navigate = useNavigate();
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 gap-4">
      {serverData.map((server: ServerCardsProps) => (
        <div
          key={server.id}
          onClick={() => navigate(`/dashboard/server/${server.id}`)}
          className="bg-white  text-black justify-between w-full rounded-lg cursor-pointer hover:shadow-md transition-shadow border p-3 h-[170px] flex flex-col "
        >
          <div className="flex items-center justify-between">
            {badgeToRender(server.status)}
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              {server.region}
            </Badge>
          </div>
          <div>
            <p className="text-lg font-bold  mt-2">{server.name} </p>
            <p className="line-clamp-2 text-sm">{server.description}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <p className="text-gray-500">Resources: {server.resourceCount}</p>
            <p className="text-gray-500">Created: {server.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
