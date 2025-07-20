import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";

interface EmailProps {
  clicked: boolean;
  handleIsClicked: () => void;
}

const JoinEmailField: React.FC<EmailProps> = ({ clicked, handleIsClicked }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    // Regex for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);

    try {
      const payload = {
        email,
      };

      const response = await fetch(
        "https://tour-server-gules.vercel.app/email/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEmail("");
      toast.success("Email successfully added");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Error adding email");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent any default behavior
    handleIsClicked();

    // Trigger form submission
    const form = e.currentTarget.closest("form");
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 3 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
      >
        <div
          className={`mt-3 relative flex items-center rounded-full ${
            clicked ? "new-glow" : ""
          }`}
        >
          <input
            onChange={handleChange}
            required
            value={email}
            placeholder="Your best email"
            className="border-1 placeholder-gray-500 placeholder:font-bold border-[#ffffff8c] text-primaryRegular pl-4 pr-12 placeholder:text-sm bg-black w-[350px] lg:w-[600px] rounded-lg py-1"
            disabled={isSubmitting}
          />
          <div
            className="absolute right-[2px] top-1/2 -translate-y-1/2 pr-1.5 cursor-pointer"
            onClick={handleButtonClick}
          >
            <div
              className={`text-black p-1 rounded-full border transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <ArrowRight className="text-white size-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default JoinEmailField;
