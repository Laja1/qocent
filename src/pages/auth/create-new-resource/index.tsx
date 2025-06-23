import { Button, Header, SelectField, Textfield } from "@/components/shared";
import { useFormik } from "formik";
import {
  houseCodeOptions,
  roomCodeOptions,
  ipRangeOptions,
  typeOptions,
  resourceTypeOptions,
  siteCodeOptions,
} from "./config";

export const CreateResource = () => {
  const onSubmit = () => {};
  const formik = useFormik({
    initialValues: { category: "" },
    onSubmit,
  });
  return (
    <div className="flex flex-col">
      <Header
        title="Create Resources"
        description="A server Room can have one or more server centres. A server centre is provided by a provider."
      />
      <div className="flex mx-5 my-5 gap-3">
        <div className=" w-1/3  rounded-sm p-2">
          <SelectField
            name="siteCode"
            label="Site Code"
            placeholder="Select a site code..."
            formik={formik}
            className="w-full"
            options={siteCodeOptions}
          />

          <SelectField
            name="siteRoomCode"
            label="Server Room Code"
            placeholder="Select a server room code..."
            formik={formik}
            className="w-full"
            options={roomCodeOptions}
          />

          <SelectField
            name="resourceType"
            label="Resource Type"
            placeholder="Select a resource type..."
            formik={formik}
            className="w-full"
            options={resourceTypeOptions}
          />
          <Textfield
            name="Room ID"
            label="Room ID"
            formik={formik}
            className="w-full"
            disabled={true}
            value="100033"
          />
          <Textfield
            name="siteRoomName"
            label="Server Room Name"
            formik={formik}
            className="w-full"
          />
          <SelectField
            name="roomCode"
            label="Room Code"
            placeholder="Select a room code..."
            formik={formik}
            className="w-full"
            options={roomCodeOptions}
          />

          <SelectField
            name="houseCode"
            label="House Code"
            placeholder="Select a house code..."
            formik={formik}
            className="w-full"
            options={houseCodeOptions}
          />

          <SelectField
            name="type"
            label="Type"
            placeholder="Select a type..."
            formik={formik}
            className="w-full"
            options={typeOptions}
          />

          <SelectField
            name="ipRange"
            label="IP Range"
            placeholder="Select IP Range..."
            formik={formik}
            className="w-full"
            options={ipRangeOptions}
          />

          <Button label="Create" className="mt-2 w-full" />
        </div>
        <div className="bg-black rounded-md w-2/3 shadow-md p-2"></div>
      </div>
    </div>
  );
};
