import { Button } from "@/components/shared";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";

export const CallToAction = () => {
  const handleIsClicked = () => {
    NiceModal.show(ModalConstant.BookDemoModal);
    // setTimeout(() => setClicked(false), 6000);
  };
  return (
    <div id="join-waitlist">
      <div className="lg:px-10 w-full mx-auto pt-10 flex">
        <div className="bg-muted/50 items-center flex flex-col space-y-5 text-center w-full rounded-sm p-5 lg:p-20">
          <p className="bg-gradient-to-r text-xl lg:text-3xl font-poppins from-primary to-primary/70 inline-block text-transparent bg-clip-text">
            Everything You Need, Nothing You Don't
          </p>
          <p className="text-foreground text-xs lg:text-sm leading-loose max-w-3xl">
            Qocent puts the power of every major cloud in one place, so you can
            deploy, manage, and scale without limits. With unmatched multicloud
            flexibility, simplified operations, and unbeatable value, we help
            you build faster, smarter, and with complete control.
          </p>

          <Button
            label="Book a demo"
            intent="secondary"
            onClick={handleIsClicked}
          />
        </div>
      </div>
    </div>
  );
};
