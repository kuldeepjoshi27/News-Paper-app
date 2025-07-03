import { format } from "date-fns";

// Format date function
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Check if date is invalid
    return "";
  }
  return format(date, "eeee, d MMMM"); // Format as 'Friday, 8 September'
};
