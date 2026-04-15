// 3 city clocks (different time zones)
const cities = [
  { id: "newyork", zone: "America/New_York" },
  { id: "london", zone: "Europe/London" },
  { id: "tokyo", zone: "Asia/Tokyo" }
];

// Format time
function getTime(zone) {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
    timeStyle: "medium",
    dateStyle: "full"
  });
}

// Update all clocks
function updateTime() {

  // city cards
  cities.forEach(city => {
    document.getElementById(city.id).textContent = getTime(city.zone);
  });

  // local time
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("localTime").textContent = getTime(localZone);

  // selected time
  const selectedZone = document.getElementById("locationSelect").value;
  document.getElementById("selectedTime").textContent = getTime(selectedZone);
}

// Show/hide home link when selection changes
function handleSelectChange() {
  const select = document.getElementById("locationSelect");
  const homeLink = document.getElementById("homeLinkContainer");

  if (select.value) {
    homeLink.style.display = "block";
  }

  updateTime();
}

// Events
document.getElementById("locationSelect")
  .addEventListener("change", handleSelectChange);

// initial load
updateTime();

// live update
setInterval(updateTime, 1000);