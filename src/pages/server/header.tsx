import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import type { ServerCardsProps } from "../server-room/server-cards";

type HeaderProps = {
    serverRoom: ServerCardsProps;
}

export const Header = ({serverRoom}: HeaderProps) => {
    const navigate = useNavigate();
  return (
      <div>
             <header className="border-b w-full text-black border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate(-1)}
              className="flex cursor-pointer  items-center space-x-2"
            >
              <ArrowLeftCircle className="size-6" />
              <div className="flex flex-col ">
                <h1 className="text-lg font-bold ">{serverRoom?.name}</h1>
                <p className="text-xs text-gray-600">{serverRoom?.region}</p>
              </div>{" "}
            </div>
            <div>
              <Button label="Add Server Room" />
            </div>
          </div>
        </header>
    </div>
  )
}
