import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import { BiErrorCircle } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

const typeStyles = {
  info: {
    bg: "bg-blue-500",
    icon: <InformationCircleIcon className="h-6 w-6" />,
  },
  success: {
    bg: "bg-green-500",
    icon: <CheckCircleIcon className="h-6 w-6" />,
  },
  warning: {
    bg: "bg-yellow-500",
    icon: <ExclamationCircleIcon className="h-6 w-6" />,
  },
  error: {
    bg: "bg-red-500",
    icon: <BiErrorCircle className="h-6 w-6" />,
  },
  loading: {
    bg: "bg-gray-500",
    icon: <FaSpinner className="animate-spin" width="24" strokeWidth="5" />,
  },
};

export default function AlertModal({ message, type, onClose, duration = 3 }) {
  useEffect(() => {
    if (message && type !== "loading") {
      const timer = setTimeout(() => {
        onClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose, type]);

  if (!message) return null;

  const { bg, icon } = typeStyles[type] || typeStyles.info;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/60 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 ${bg}`}
      >
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
}

AlertModal.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "success", "warning", "error", "loading"]),
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

AlertModal.defaultProps = {
  type: "info",
  duration: 3,
};
