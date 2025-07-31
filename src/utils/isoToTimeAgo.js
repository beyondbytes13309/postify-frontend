import { formatDistanceToNow, parseISO } from "date-fns";

const convertIsoToRelativeTime = (isoString) => {
  try {
    if (!isoString) return "Unknown time";
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch (e) {
    return "Invalid data";
  }
};

export default convertIsoToRelativeTime;
