import { useEffect, useState } from "react";

const Alert = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <p className="text-center">{message}</p>
    </div>
  );
};

export default Alert;
