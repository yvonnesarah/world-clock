const cities = [
  { id: "newyork", zone: "America/New_York" },
  { id: "london", zone: "Europe/London" },
  { id: "tokyo", zone: "Asia/Tokyo" }
];

// STATE
let is24Hour = localStorage.getItem("is24Hour") === "true";
let theme = localStorage.getItem("theme") || "dark";

// FORMAT TIME
function getTime(zone) {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
    hour12: !is24Hour,
    timeStyle: "medium",
    dateStyle: "full"
  });
}

// UPDATE CLOCKS
function updateTime() {
  cities.forEach(city => {
    document.getElementById(city.id).textContent = getTime(city.zone);
  });

  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("localTime").textContent = getTime(localZone);

  const select = document.getElementById("locationSelect");
  const selectedZone = select.value;

  // Selected time
  document.getElementById("selectedTime").textContent = getTime(selectedZone);

  // ✅ FIX: Selected city name
  document.getElementById("selectedCity").textContent =
    select.options[select.selectedIndex].text;
}

// SELECT CHANGE
document.getElementById("locationSelect").addEventListener("change", (e) => {
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

// AUTO USER TIMEZONE
function autoSelect() {
  const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const select = document.getElementById("locationSelect");

  for (let option of select.options) {
    if (option.value === userZone) {
      option.selected = true;
      break;
    }
  }

  // ✅ ensure UI updates after selection
  updateTime();
}

// INIT
autoSelect();
document.body.classList.toggle("light", theme === "light");
updateTime();
setInterval(updateTime, 1000);