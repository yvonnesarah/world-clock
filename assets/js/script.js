// =====================
// CITIES
// =====================
const cities = [
  { id: "newyork", zone: "America/New_York", flag: "🇺🇸", skyline: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=800&q=60" },
  { id: "london", zone: "Europe/London", flag: "🇬🇧", skyline: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=60" },
  { id: "tokyo", zone: "Asia/Tokyo", flag: "🇯🇵", skyline: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=60" }
];

// =====================
// STATE
// =====================
let is24Hour = localStorage.getItem("is24Hour") === "true";
let theme = localStorage.getItem("theme") || "dark";

// =====================
// WORLD EVENTS
// =====================
const worldEvents = {
  global: [
    { name: "🎆 New Year", date: (zone) => new Date(`${getZonedDate(zone).getFullYear() + 1}-01-01T00:00:00`) },
    { name: "🎄 Christmas", date: (zone) => new Date(`${getZonedDate(zone).getFullYear()}-12-25T00:00:00`) },
    { name: "🌍 Olympics 2028", date: () => new Date("2028-07-14T00:00:00") },
    { name: "⚽ World Cup 2026", date: () => new Date("2026-06-11T00:00:00") }
  ],

  "Europe/London": [
    { name: "👑 Trooping the Colour", date: () => new Date("2026-06-13T10:00:00") },
    { name: "🎾 Wimbledon Finals", date: () => new Date("2026-07-12T14:00:00") },
    { name: "🎡 Notting Hill Carnival", date: () => new Date("2026-08-30T10:00:00") },
    { name: "🎆 London NYE Fireworks", date: () => new Date("2026-12-31T23:59:59") }
  ],

  "America/New_York": [
    { name: "🎆 Independence Day", date: () => new Date("2026-07-04T00:00:00") },
    { name: "🎈 Macy’s Thanksgiving Parade", date: () => new Date("2026-11-26T09:00:00") },
    { name: "🦃 Thanksgiving", date: () => new Date("2026-11-26T00:00:00") },
    { name: "🎉 Times Square NYE", date: () => new Date("2026-12-31T23:59:59") }
  ],

  "Asia/Tokyo": [
    { name: "🌸 Cherry Blossom Peak", date: () => new Date("2026-03-27T00:00:00") },
    { name: "🎌 Golden Week", date: () => new Date("2026-05-03T00:00:00") },
    { name: "🎆 Sumida River Fireworks", date: () => new Date("2026-07-25T19:00:00") },
    { name: "🎎 Culture Day", date: () => new Date("2026-11-03T00:00:00") }
  ],

  "Europe/Paris": [
    { name: "🎆 Bastille Day", date: () => new Date("2026-07-14T00:00:00") },
    { name: "👗 Paris Fashion Week", date: () => new Date("2026-09-28T10:00:00") },
    { name: "🎨 Nuit Blanche", date: () => new Date("2026-10-03T19:00:00") },
    { name: "🎄 Christmas Markets", date: () => new Date("2026-12-10T10:00:00") }
  ],

  "Australia/Sydney": [
    { name: "🎆 Sydney NYE Fireworks", date: () => new Date("2026-12-31T21:00:00") },
    { name: "🇦🇺 Australia Day", date: () => new Date("2027-01-26T00:00:00") },
    { name: "🎭 Sydney Festival", date: () => new Date("2027-01-10T10:00:00") },
    { name: "🏄 Bondi Beach Festival", date: () => new Date("2026-02-15T10:00:00") }
  ],

  "America/Los_Angeles": [
    { name: "🎬 Oscars", date: () => new Date("2026-03-15T17:00:00") },
    { name: "🎶 Coachella Festival", date: () => new Date("2026-04-10T12:00:00") },
    { name: "🎃 Halloween", date: () => new Date("2026-10-31T00:00:00") },
    { name: "🎥 LA Film Festival", date: () => new Date("2026-06-18T18:00:00") }
  ]
};

// =====================
// HELPERS
// =====================
function getTime(zone) {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
    hour12: !is24Hour,
    timeStyle: "medium",
    dateStyle: "full"
  });
}

function getHour(zone) {
  return Number(
    new Date().toLocaleString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      hour12: false
    })
  );
}

function getSunStatus(zone) {
  const hour = getHour(zone);

  if (hour >= 5 && hour < 8) return "🌅 Sunrise";
  if (hour >= 8 && hour < 17) return "☀️ Day";
  if (hour >= 17 && hour < 20) return "🌇 Sunset";
  return "🌙 Night";
}

function getOffsetHours(zone) {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(now.toLocaleString("en-US", { timeZone: zone }));
  return (local - utc) / (1000 * 60 * 60);
}

function getZonedDate(zone) {
  return new Date(new Date().toLocaleString("en-US", { timeZone: zone }));
}

function formatCountdown(ms) {
  if (ms <= 0) return "🎉 Happening now!";

  const total = Math.floor(ms / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return `${d}d ${h}h ${m}m ${s}s`;
}

// =====================
// EVENTS
// =====================
function updateEvents(zone) {
  const panel = document.getElementById("eventPanel");
  const now = getZonedDate(zone);

  const events = [
    ...(worldEvents.global || []),
    ...(worldEvents[zone] || [])
  ];

  events.sort((a, b) => {
    const aDate = typeof a.date === "function" ? a.date(zone) : new Date(a.date);
    const bDate = typeof b.date === "function" ? b.date(zone) : new Date(b.date);
    return aDate - bDate;
  });

  let html = `<p><strong>🌍 World Events</strong></p>`;

  events.forEach(event => {
    const eventDate = typeof event.date === "function"
      ? event.date(zone)
      : new Date(event.date);

    html += `<p>${event.name}: ${formatCountdown(eventDate - now)}</p>`;
  });

  panel.innerHTML = html;
}

// =====================
// WEATHER
// =====================
async function getWeather(cityName) {
  try {
    const apiKey = "8bcecf3b930c0252ec9aa584f9do621t";
    const url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("weather").textContent = data.condition.description;
    document.getElementById("temperature").textContent =
      `${Math.round(data.temperature.current)}°C`;

    document.getElementById("weatherIcon").innerHTML =
      `<img src="${data.condition.icon_url}" alt="weather" />`;

  } catch {
    document.getElementById("weather").textContent = "Unavailable";
    document.getElementById("temperature").textContent = "-";
    document.getElementById("weatherIcon").innerHTML = "";
  }
}

// =====================
// MAIN UPDATE
// =====================
function updateTime() {
  cities.forEach(city => {
    const timeEl = document.getElementById(city.id);
    const card = timeEl.parentElement;
    const dayNightEl = card.querySelector(".daynight");

    timeEl.textContent = `${city.flag} ${getTime(city.zone)}`;
    dayNightEl.textContent = getSunStatus(city.zone);

    document.getElementById(`${city.id}-img`).src = city.skyline;
  });

  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  document.getElementById("localTime").textContent = getTime(localZone);

  const select = document.getElementById("locationSelect");
  const selectedZone = select.value;
  const selectedCity = select.options[select.selectedIndex]?.text || "";

  if (selectedZone) {
    document.getElementById("selectedTime").textContent = getTime(selectedZone);
    document.getElementById("selectedCity").textContent = selectedCity;

    const diff = getOffsetHours(selectedZone) - getOffsetHours(localZone);

    document.getElementById("timeDiff").textContent =
      diff === 0
        ? `${selectedCity} is in the same time zone`
        : `${selectedCity} is ${Math.abs(diff)} hour(s) ${diff > 0 ? "ahead" : "behind"}`;

    getWeather(selectedCity);
    updateEvents(selectedZone);
  }

  document.getElementById("lastUpdated").textContent =
    new Date().toLocaleTimeString();
}

// =====================
// DROPDOWN CHANGE
// =====================
document.getElementById("locationSelect").addEventListener("change", (e) => {
  const value = e.target.value;
  if (!value) return;

  localStorage.setItem("selectedCity", value);

  document.getElementById("homeLinkContainer").style.display = "block";
  document.getElementById("timeDisplay").classList.remove("hidden");

  updateTime();
});

// =====================
// THEME
// =====================
document.getElementById("themeToggle").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  document.body.classList.toggle("light");
});

// =====================
// FORMAT
// =====================
document.getElementById("formatToggle").addEventListener("click", () => {
  is24Hour = !is24Hour;
  localStorage.setItem("is24Hour", is24Hour);
  updateTime();
});

// =====================
// AUTO SELECT (FIXED)
// =====================
function autoSelect() {
  const saved = localStorage.getItem("selectedCity");
  const select = document.getElementById("locationSelect");

  if (!saved) {
    document.getElementById("timeDisplay").classList.add("hidden");
    return;
  }

  for (let option of select.options) {
    if (option.value === saved) {
      option.selected = true;
      break;
    }
  }

  document.getElementById("timeDisplay").classList.remove("hidden");
  updateTime();
}

// =====================
// INIT
// =====================
autoSelect();
document.body.classList.toggle("light", theme === "light");
updateTime();
setInterval(updateTime, 1000);