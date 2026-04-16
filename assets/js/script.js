// CITIES
const cities = [
  { id: "newyork", zone: "America/New_York", flag: "🇺🇸" },
  { id: "london", zone: "Europe/London", flag: "🇬🇧" },
  { id: "tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" }
];

// STATE
let is24Hour = localStorage.getItem("is24Hour") === "true";
let theme = localStorage.getItem("theme") || "dark";

// 🌍 GLOBAL + CITY EVENTS
const worldEvents = {
  global: [
    {
      name: "🎆 New Year",
      date: (zone) => {
        const now = getZonedDate(zone);
        return new Date(`${now.getFullYear() + 1}-01-01T00:00:00`);
      }
    },
    {
      name: "🎄 Christmas",
      date: (zone) => {
        const now = getZonedDate(zone);
        return new Date(`${now.getFullYear()}-12-25T00:00:00`);
      }
    },
    {
      name: "🌍 Olympics 2028",
      date: () => new Date("2028-07-14T00:00:00")
    },
    {
      name: "⚽ World Cup 2026",
      date: () => new Date("2026-06-11T00:00:00")
    }
  ],

  // 🇬🇧 LONDON (4)
  "Europe/London": [
    {
      name: "👑 Trooping the Colour",
      date: () => new Date("2026-06-13T10:00:00")
    },
    {
      name: "🎾 Wimbledon Finals",
      date: () => new Date("2026-07-12T14:00:00")
    },
    {
      name: "🎡 Notting Hill Carnival",
      date: () => new Date("2026-08-30T10:00:00")
    },
    {
      name: "🎆 London NYE Fireworks",
      date: () => new Date("2026-12-31T23:59:59")
    }
  ],

  // 🇺🇸 NEW YORK (4)
  "America/New_York": [
    {
      name: "🎆 Independence Day",
      date: () => new Date("2026-07-04T00:00:00")
    },
    {
      name: "🎈 Macy’s Thanksgiving Parade",
      date: () => new Date("2026-11-26T09:00:00")
    },
    {
      name: "🦃 Thanksgiving",
      date: () => new Date("2026-11-26T00:00:00")
    },
    {
      name: "🎉 Times Square NYE",
      date: () => new Date("2026-12-31T23:59:59")
    }
  ],

  // 🇯🇵 TOKYO (4)
  "Asia/Tokyo": [
    {
      name: "🌸 Cherry Blossom Peak",
      date: () => new Date("2026-03-27T00:00:00")
    },
    {
      name: "🎌 Golden Week",
      date: () => new Date("2026-05-03T00:00:00")
    },
    {
      name: "🎆 Sumida River Fireworks",
      date: () => new Date("2026-07-25T19:00:00")
    },
    {
      name: "🎎 Culture Day",
      date: () => new Date("2026-11-03T00:00:00")
    }
  ],

  // 🇫🇷 PARIS (4)
  "Europe/Paris": [
    {
      name: "🎆 Bastille Day",
      date: () => new Date("2026-07-14T00:00:00")
    },
    {
      name: "👗 Paris Fashion Week",
      date: () => new Date("2026-09-28T10:00:00")
    },
    {
      name: "🎨 Nuit Blanche",
      date: () => new Date("2026-10-03T19:00:00")
    },
    {
      name: "🎄 Christmas Markets",
      date: () => new Date("2026-12-10T10:00:00")
    }
  ],

  // 🇦🇺 SYDNEY (4)
  "Australia/Sydney": [
    {
      name: "🎆 Sydney NYE Fireworks",
      date: () => new Date("2026-12-31T21:00:00")
    },
    {
      name: "🇦🇺 Australia Day",
      date: () => new Date("2027-01-26T00:00:00")
    },
    {
      name: "🎭 Sydney Festival",
      date: () => new Date("2027-01-10T10:00:00")
    },
    {
      name: "🏄 Bondi Beach Festival",
      date: () => new Date("2026-02-15T10:00:00")
    }
  ],

  // 🇺🇸 LOS ANGELES (4)
  "America/Los_Angeles": [
    {
      name: "🎬 Oscars",
      date: () => new Date("2026-03-15T17:00:00")
    },
    {
      name: "🎶 Coachella Festival",
      date: () => new Date("2026-04-10T12:00:00")
    },
    {
      name: "🎃 Halloween",
      date: () => new Date("2026-10-31T00:00:00")
    },
    {
      name: "🎥 LA Film Festival",
      date: () => new Date("2026-06-18T18:00:00")
    }
  ]
};

// TIME FORMAT
function getTime(zone) {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
    hour12: !is24Hour,
    timeStyle: "medium",
    dateStyle: "full"
  });
}

// GET HOUR
function getHour(zone) {
  return Number(
    new Date().toLocaleString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      hour12: false
    })
  );
}

// 🌙☀️ SUN STATUS
function getSunStatus(zone) {
  const hour = getHour(zone);

  if (hour >= 5 && hour < 8) return "🌅 Sunrise";
  if (hour >= 8 && hour < 17) return "☀️ Day";
  if (hour >= 17 && hour < 20) return "🌇 Sunset";
  return "🌙 Night";
}

// OFFSET HOURS
function getOffsetHours(zone) {
  const now = new Date();

  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(now.toLocaleString("en-US", { timeZone: zone }));

  return (local - utc) / (1000 * 60 * 60);
}

// ZONED DATE
function getZonedDate(zone) {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: zone })
  );
}

// FORMAT COUNTDOWN
function formatCountdown(ms) {
  if (ms <= 0) return "🎉 Happening now!";

  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// 🌍 UPDATE EVENTS PANEL
function updateEvents(zone) {
  const panel = document.getElementById("eventPanel");
  const now = getZonedDate(zone);

  const events = [
    ...(worldEvents.global || []),
    ...(worldEvents[zone] || [])
  ];

  if (events.length === 0) {
    panel.innerHTML = "<p>No events available</p>";
    return;
  }

  // SORT by soonest
  events.sort((a, b) => {
    const dateA = typeof a.date === "function" ? a.date(zone) : new Date(a.date);
    const dateB = typeof b.date === "function" ? b.date(zone) : new Date(b.date);
    return dateA - dateB;
  });

  let html = `<p><strong>🌍 World Events</strong></p>`;

  events.forEach(event => {
    const eventDate =
      typeof event.date === "function"
        ? event.date(zone)
        : new Date(event.date);

    const diff = eventDate - now;

    html += `<p>${event.name}: ${formatCountdown(diff)}</p>`;
  });

  panel.innerHTML = html;
}

// UPDATE CLOCKS
function updateTime() {
  cities.forEach(city => {
    const timeEl = document.getElementById(city.id);
    const card = timeEl.parentElement;
    const dayNightEl = card.querySelector(".daynight");

    timeEl.textContent = `${city.flag} ${getTime(city.zone)}`;
    dayNightEl.textContent = getSunStatus(city.zone);
  });

  const localZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  document.getElementById("localTime").textContent =
    getTime(localZone);

  const select = document.getElementById("locationSelect");
  const selectedZone = select.value;
  const selectedCity = select.options[select.selectedIndex].text;

  document.getElementById("selectedTime").textContent =
    getTime(selectedZone);

  document.getElementById("selectedCity").textContent =
    selectedCity;

  // TIME DIFFERENCE
  const diff = getOffsetHours(selectedZone) - getOffsetHours(localZone);

  document.getElementById("timeDiff").textContent =
    diff === 0
      ? `${selectedCity} is in the same time zone as your local time`
      : `${selectedCity} is ${Math.abs(diff)} hour(s) ${
          diff > 0 ? "ahead of" : "behind"
        } your local time`;

  document.getElementById("lastUpdated").textContent =
    new Date().toLocaleTimeString();

  // 🔥 NEW: update events
  updateEvents(selectedZone);
}

// SELECT CHANGE
document.getElementById("locationSelect").addEventListener("change", (e) => {
  localStorage.setItem("selectedCity", e.target.value);
  document.getElementById("homeLinkContainer").style.display = "block";
  updateTime();
});

// THEME
document.getElementById("themeToggle").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  document.body.classList.toggle("light");
});

// FORMAT
document.getElementById("formatToggle").addEventListener("click", () => {
  is24Hour = !is24Hour;
  localStorage.setItem("is24Hour", is24Hour);
  updateTime();
});

// AUTO SELECT
function autoSelect() {
  const saved = localStorage.getItem("selectedCity");
  const userZone =
    saved || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const select = document.getElementById("locationSelect");

  for (let option of select.options) {
    if (option.value === userZone) {
      option.selected = true;
      break;
    }
  }

  updateTime();
}

// INIT
autoSelect();
document.body.classList.toggle("light", theme === "light");
updateTime();
setInterval(updateTime, 1000);