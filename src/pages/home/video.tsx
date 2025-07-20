import { motion } from "framer-motion";
export const Video = () => {
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mx-auto  rounded-xl p-2  w-full"
      >
        <div className="rounded-lg overflow-hidden lg:m-20 shadow-2xl ">
          <div className="w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/7T7SyMZihwo?rel=0"
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </motion.div>{" "}
    </div>
  );
};
