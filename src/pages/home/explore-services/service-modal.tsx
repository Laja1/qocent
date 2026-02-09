import { Textfield } from "@/components/shared";
import { SERVICES_CONFIG } from "@/components/shared/service.config";
import type { FormFieldConfig } from "@/components/shared/types";
import { GridItem } from "./glowing-cards";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";

interface ServiceFormProps {
  fields: FormFieldConfig[];
}

export function ServiceForm({ fields }: ServiceFormProps) {
  return (
    <>
      {fields.map((field) => (
        <Textfield
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          className="border border-black w-full"
        />
      ))}
    </>
  );
}

export default function Service() {
  return (
    <div className="pt-10 w-full bg-white">
      <div className=" items-center w-full flex justify-center mb-10 flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900   text-center">
          Professional Services
        </h2>
        <p className="text-center max-w-3xl">
          Expert guidance to help you plan, deploy, and manage your cloud
          environment with confidence. We ensure your systems are designed for
          scalability, compliance, and real business impact.
        </p>
      </div>
      <div className=" flex flex-wrap gap-6 items-center justify-center">
        {SERVICES_CONFIG.map((service, index) => (
          <div
            key={index}
            onClick={() =>
              NiceModal.show(ModalConstant.ServiceModal, {
                title: service.triggerText,
                content: service.content,
              })
            }
          >
            <GridItem
              icon={service.triggerIcon}
              title={service.triggerText}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
