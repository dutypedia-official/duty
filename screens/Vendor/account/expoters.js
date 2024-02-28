import useLang from "../../../Hooks/UseLang";

export const exporters = (key) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return isBn ? "Waiting for accept order" : "Waiting for accept order";
    case "ACCEPTED":
      return isBn ? "Waiting for payment" : "Waiting for payment";
    case "WAITING_FOR_PAYMENT":
      return isBn ? "Waiting for payment" : "Waiting for payment";
    case "PROCESSING":
      return isBn ? "প্রক্রিয়াকরণ হচ্ছে" : "Processing";
    case "DELIVERED":
      return isBn ? "" : "Delivered";
    case "REFUNDED":
      return isBn ? "" : "Refunded";
    case "CANCELLED":
      return isBn ? "বাতিল করা হয়েছে" : "Cancelled";
    case "COMPLETED":
      return isBn ? "সম্পন্ন হয়েছে" : "Completed";
    case "PENDING":
      return isBn ? "পেন্ডিং আছে" : "Pending";
    default:
      return isBn ? "" : "Unknown";
  }
};
export const allExporters = [
  {
    title: "Processing",
    titleBn: "প্রক্রিয়াকরণ",
    key: "PROCESSING",
  },
  {
    title: "Pending",
    titleBn: "পেন্ডিং",
    key: "PENDING",
  },
  {
    title: "Accepted",
    titleBn: "গ্রহণকৃত",
    key: "ACCEPTED",
  },
  {
    title: "Cancelled",
    titleBn: "বাতিল",
    key: "CANCELLED",
  },
  {
    title: "Completed",
    titleBn: "সম্পন্ন",
    key: "COMPLETED",
  },
];
