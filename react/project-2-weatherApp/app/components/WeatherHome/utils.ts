export function formatUTCString(
  timestamp: number,
  timeZone: string = "Australia/Sydney"
): string {
  const date = new Date(timestamp * 1000); // Ensure timestamp is in seconds

  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    weekday: "long",   // e.g. "Monday"
    day: "2-digit",    // e.g. "09"
    month: "short",  // e.g. "06"
    hour: "2-digit",   // e.g. "14"
    minute: "2-digit", // e.g. "00"
    hour12: false,     // 24-hour time
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  const getPart = (type: string): string => {
    const part = parts.find((p) => p.type === type);
    if (!part) {
      console.warn(`Missing part: ${type}`);
      return "??";
    }
    return part.value;
  };

  const dd = getPart("day");
  const mm = getPart("month");
  const weekday = getPart("weekday");
  const time = `${getPart("hour")}:${getPart("minute")}`;

  return `${dd} ${mm} ${weekday} ${time}`;
}
