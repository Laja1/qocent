import { Button, Header } from "@/components/shared";
import { ServerCards } from "./server-cards";
import { serverRooms } from "@/utils/constants/config";

export const ServerRoom = () => {
    
  return (
    <div className="">
      <Header title="Server Room" description="Manage your server room">
        <Button label="Server Room" />
      </Header>

      <div className="p-5 flex flex-col">
        <h3 className="text-base font-medium pb-4">
          Select a server room to view its resources
        </h3>
        <ServerCards serverData={serverRooms} />
      </div>
    </div>
  );
};
