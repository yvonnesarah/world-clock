const cities = [
  { id: "newyork", zone: "America/New_York", flag: "🇺🇸" },
  { id: "london", zone: "Europe/London", flag: "🇬🇧" },
  { id: "tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" }
];

// STATE
let is24Hour = localStorage.getItem("is24Hour") === "true";
let theme = localStorage.getItem("theme") || "dark";

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

  // ⏱️ TIME DIFFERENCE (LOCAL vs SELECTED)
  const diff = getOffsetHours(selectedZone) - getOffsetHours(localZone);

  if (diff === 0) {
    document.getElementById("timeDiff").textContent =
      `${selectedCity} is in the same time zone as your local time`;
  } else {
    document.getElementById("timeDiff").textContent =
      `${selectedCity} is ${Math.abs(diff)} hour(s) ${
        diff > 0 ? "ahead of" : "behind"
      } your local time`;
  }

  document.getElementById("lastUpdated").textContent =
    new Date().toLocaleTimeString();
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