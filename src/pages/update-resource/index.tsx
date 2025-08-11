// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Header, RenderField } from "@/components/shared";
// import { useModal } from "@/components/shared/modal";
// import { ArrowRight, Info } from "lucide-react";
// import { useFormik } from "formik";
// import { IconMichelinStar } from "@tabler/icons-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { generateDynamicSchema } from "@/utilities/schema/resourceSchema";
// import { SiteDeployModal } from "@/components/not-shared/site-modal";
// import { useState } from "react";
// import { showCustomToast } from "@/components/shared/toast";
// import { RouteConstant } from "@/router/routes";
// import { ErrorHandler } from "@/service/httpClient/errorHandler";
// import type { RootState } from "@/store";
// import resourceTemplate from "./data.json";
// import { useCreateResourceMutation } from "@/service/kotlin/resourceApi";
// import { useSelector } from "react-redux";

// export const UpdateResources = () => {
//   const navigate = useNavigate();
//   const { openModal, closeModal } = useModal();
//   const roomData = {
//     roomHouse: "roomHouse",
//     roomCode: "roomCode",
//     resourceType: "resourceType",
//     resourceName: "Server House",
//   };
//   const [createResource, { isLoading: isCreatingLoading }] =
//     useCreateResourceMutation();
//   const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
//   const location = useLocation();
//   const [progress, setProgress] = useState(0);

//   const dashboard = useSelector((state: RootState) => state.dashboard);
//   const locationState = location.state as any;

//   console.log(resourceTemplate);
//   // Initialize form values
//   // Prefill logic
//   const initialValues =
//     resourceTemplate?.data?.reduce((acc: Record<string, string>, item) => {
//       const fieldName = item.ParameterField;
//       // If roomData has a matching key, use it, otherwise empty string
//       acc[fieldName] = roomData[fieldName] || "";
//       return acc;
//     }, {}) || {};

//   const handleSubmit = async (values) => {
//     try {
//       await createResource(values).unwrap();

//       // Simulate deployment progress
//       for (let i = 0; i <= 100; i += 10) {
//         setProgress(i);
//         await new Promise((resolve) => setTimeout(resolve, 100));
//       }

//       //   showCustomToast(`${locationState.resourceType} successfully created`, {
//       //     toastOptions: { type: "success", autoClose: 5000 },
//       //   });

//       setProgress(0);
//       navigate(RouteConstant.dashboard.resources.path);
//       setIsDeployModalOpen(false);
//     } catch (error: any) {
//       console.error("Create Resource Error:", error);
//       const message = ErrorHandler.extractMessage(error);
//       showCustomToast(message, {
//         toastOptions: { type: "error", autoClose: 5000 },
//       });
//       setProgress(0);
//     }
//   };
//   const formik = useFormik({
//     initialValues,
//     onSubmit: handleSubmit,
//     validationSchema: () => generateDynamicSchema(resourceTemplate?.data),
//     validateOnMount: true,
//     enableReinitialize: true,
//   });

//   const descriptionModal = (row) => {
//     openModal({
//       id: "info-modal",
//       content: () => (
//         <div className="flex max-w-xs flex-col gap-4 p-4">
//           <h2 className="text-lg uppercase border-b pb-2">
//             {row.ParameterLabel}
//           </h2>
//           <div className="text-sm text-gray-600 space-y-2">
//             {row.ParameterInfo1 && <p>{row.ParameterInfo1}</p>}
//             {row.ParameterInfo2 && <p>{row.ParameterInfo2}</p>}
//             {row.ParameterInfo3 && <p>{row.ParameterInfo3}</p>}
//           </div>
//           <div className="flex justify-end">
//             <Button label="Close" onClick={closeModal} />
//           </div>
//         </div>
//       ),
//     });
//   };

//   const handleProceedClick = () => {
//     setIsDeployModalOpen(true);
//   };

//   console.log("Dynamic config with formik values:");

//   return (
//     <div className="flex flex-col">
//       <Header
//         title="Create New Resource"
//         description="A server can have one or more server houses. A server house is provided by a provider."
//       />

//       <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
//         <div className="bg-gradient-to-r flex justify-between from-black to-gray-800 rounded-t-md px-3 sm:px-5 py-5">
//           <div>
//             <p className="text-base sm:text-lg text-white">
//               {/* {locationState.resourceType} */}
//             </p>
//             <p className="text-xs text-gray-400 leading-tight">
//               {locationState?.selectedField?.serviceDescription}
//             </p>
//           </div>
//           <div>
//             <IconMichelinStar color="white" size={40} />
//           </div>
//         </div>

//         <div className="flex mt-5 flex-col">
//           {resourceTemplate?.data?.map((item) => (
//             <div
//               className="flex lg:flex-row flex-col lg:items-center w-full py-[1px] border-b"
//               key={item.ParameterSerial}
//             >
//               <p className="text-xs lg:w-1/6 w-1/2 pr-3 lg:text-right">
//                 {item.ParameterMandatory && (
//                   <span className="text-red-500 ml-1">*</span>
//                 )}
//                 {item.ParameterLabel}
//               </p>
//               <div className="lg:w-2/5 w-full pr-3 flex gap-1">
//                 <RenderField
//                   name={item.ParameterField}
//                   formik={formik}
//                   placeholder={`Enter your ${item.ParameterLabel}`}
//                   //   parameterLookup={item.ParameterLookup}
//                   type={item.ParameterInputType || "text"}
//                   autoComplete="off"
//                 />
//                 <button
//                   onClick={() => descriptionModal(item)}
//                   className="rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
//                   title="View more info"
//                 >
//                   <Info size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex m-3 sm:m-5 justify-end">
//           <Button
//             label="Proceed"
//             disabled={!formik.isValid}
//             onClick={handleProceedClick}
//             surfixIcon={<ArrowRight className="size-3" />}
//           />
//         </div>
//       </div>
//       <SiteDeployModal
//         isOpen={isDeployModalOpen}
//         onClose={() => setIsDeployModalOpen(false)}
//         formik={formik}
//         json={resourceTemplate?.data || []}
//         isLoading={isCreatingLoading}
//         progress={progress}
//         onDeploy={formik.handleSubmit}
//       />
//     </div>
//   );
// };



export const UpdateResources = () => {
  return (
    <div>index</div>
  )
}

