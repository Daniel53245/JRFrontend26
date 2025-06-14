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

export function mapResponseToForecast(apiResponse: any) {
  const forecastMap = new Map<string, any[]>();
  const todayDateStr = new Date().toISOString().split("T")[0];

  for (const entry of apiResponse.list) {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().split("T")[0]; // yyyy-mm-dd

    if (key === todayDateStr) continue; // skip today's data

    if (!forecastMap.has(key)) {
      forecastMap.set(key, []);
    }

    forecastMap.get(key)?.push(entry);
  }

  const result: any[] = [];
  let dayIndex = 0;

  for (const [dateStr, entries] of forecastMap) {
    if (dayIndex >= 4) break;

    const temps = entries.map(e => e.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayFormatted = `${date.getDate()} ${date.toLocaleDateString("en-US", { month: "long" })}`;

    // Pick the weather at around 12:00 PM if possible
    let weatherEntry = entries.find(e => new Date(e.dt * 1000).getHours() === 12);
    if (!weatherEntry) weatherEntry = entries[Math.floor(entries.length / 2)];

    result.push({
      id: `${dayIndex}`,
      day: dayName,
      date: dayFormatted,
      weather: weatherEntry.weather[0].main,
      minTemp: Math.round(minTemp).toString(),
      maxTemp: Math.round(maxTemp).toString()
    });

    dayIndex++;
  }

  return result;
}
