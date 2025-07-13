import { useState } from "react";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { imgLinks } from "@/assets/assetLink";
import { Button } from "../shared";
import { useModal } from "../shared/modal";
import { RouteConstant } from "@/router/routes";
import { dashboardStore } from "@/store/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// This is the component you use in your page
export const AdsOverviewContainer = () => {
  const [visible, setVisible] = useState(true); // Visible on load

  if (!visible) return null;

  return <AdsOverviewCard closeModall={() => setVisible(false)} />;
};

type AdsOverviewCardProps = {
  closeModall: () => void;
};

export const AdsOverviewCard = ({ closeModall }: AdsOverviewCardProps) => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (provider: "huawei" | "aws") => {
    dispatch(dashboardStore.action.setProvider(provider));
    navigate(RouteConstant.dashboard.serverSite.path);
    closeModal();
  };
  const handleOpen = () =>
    openModal({
      id: ``,
      content: () => (
        <>
          <div className="text-sm pb-2 text-center font-bold">
            Select a provider
          </div>
          <div className="flex flex-row gap-3">
            <div
              onClick={() => handleClick("aws")}
              className="bg-gray-100 p-3 rounded-sm w-full tex-center justify-center flex flex-col items-center"
            >
              <img src={imgLinks.awsdark} className="size-6" />
              <p className="text-[10px]">AWS</p>
            </div>
            <div
              onClick={() => handleClick("huawei")}
              className="bg-gray-100 p-3 rounded-smc w-full justify-center flex flex-col items-center"
            >
              <img src={imgLinks.huawei} className="size-6" />
              <p className="text-[10px]">Huawei</p>
            </div>
          </div>
        </>
      ),
    });
  return (
    <div className="h-fit border rounded-xs py-3">
      <CardHeader>
        <CardTitle className="text-custom-white">
          Join GitHub Education!
        </CardTitle>
        <CardDescription className="text-black">
        A site provider can be any of the following supported Cloud service providers (CSPs):  AWS - Amazon Web Services, HCS - HUAWEI Cloud Services, GCP - Google Cloud Services and Microsoft Azure
        </CardDescription>
        <CardAction onClick={closeModall}>
          <X className="text-black cursor-pointer" />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2 !px-3">
        <img
          src={imgLinks.image}
          alt="GitHub Education"
          className="w-full object-center rounded-sm"
        />
      </CardContent>

      <CardFooter>
        <Button label="Deploy a site now" onClick={() => handleOpen()} />
      </CardFooter>
    </div>
  );
};
