// =====================
// CITIES DATA (MAIN WORLD CLOCK CITIES)
// =====================
const cities = [
  {
    id: "New York",
    zone: "America/New_York",
    flag: "🇺🇸",
    skyline: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "London",
    zone: "Europe/London",
    flag: "🇬🇧",
    skyline: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "Tokyo",
    zone: "Asia/Tokyo",
    flag: "🇯🇵",
    skyline: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=60"
  },

  {
    id: "Paris",
    zone: "Europe/Paris",
    flag: "🇫🇷",
    skyline: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "Sydney",
    zone: "Australia/Sydney",
    flag: "🇦🇺",
    skyline: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "Los Angeles",
    zone: "America/Los_Angeles",
    flag: "🇺🇸",
    skyline: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60"
  }
];

// =====================
// UI STATE (DISPLAYED CITIES ON HOME GRID)
// =====================
let displayedCities = [];


// =====================
// UTILITY: SHUFFLE ARRAY (RANDOMISE CITIES)
// =====================
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// =====================
// RENDER: RANDOM CITY CARDS (HOME GRID)
// =====================
function renderCities() {
  const grid = document.querySelector(".grid");

  // Pick 3 random cities each refresh
  displayedCities = shuffleArray(cities).slice(0, 3);

   // Render cards dynamically
  grid.innerHTML = displayedCities.map(city => `
    <div class="card">
      <img class="skyline" id="${city.id}-img" alt="${city.id} skyline">
      <h2>${city.id.charAt(0).toUpperCase() + city.id.slice(1)}</h2>
      <p id="${city.id}" class="time"></p>
      <span class="daynight"></span>
    </div>
  `).join("");
}


// =====================
// CITY FACTS DATA (FUN FACTS PER CITY)
// =====================
const cityFacts = {
  "New York": [
    "🏙 Known as 'The City That Never Sleeps'",
    "🗽 Home to the Statue of Liberty",
    "🌉 Has over 2 million buildings",
    "🚕 Yellow taxis are iconic worldwide",
    "🧠 NYC has 5 boroughs: Manhattan, Brooklyn, Queens, Bronx, Staten Island",
    "🌳 Central Park is larger than some small countries' capitals",
    "🍕 New York-style pizza is famous worldwide",
    "🎭 Broadway is the heart of American theatre"
  ],

  "London": [
    "🎡 Home to the London Eye",
    "👑 The UK Prime Minister lives at 10 Downing Street",
    "🚇 The Underground is the oldest metro system",
    "🌉 Tower Bridge is often mistaken for London Bridge",
    "⛅ London weather is famously unpredictable",
    "🏰 The Tower of London is over 900 years old",
    "🕰 Big Ben is actually the bell, not the tower",
    "🚌 Red double-decker buses are a city icon"
  ],

  "Tokyo": [
    "🗼 Tokyo is the largest city in the world",
    "🚄 Home of the Shinkansen bullet train",
    "🍣 Famous for sushi culture",
    "🌸 Cherry blossoms attract millions yearly",
    "🏙 Tokyo has over 37 million people in its metro area",
    "🎮 Akihabara is a global tech & gaming hub",
    "🚇 One of the most punctual train systems in the world",
    "🏯 Mix of ultra-modern and ancient temples"
  ],

  "Paris": [
    "🗼 The Eiffel Tower was meant to be temporary",
    "🥐 Famous for pastries and cafes",
    "🎨 Home to the Louvre museum",
    "🚶 One of the most visited cities in the world",
    "💡 Called 'The City of Light'",
    "🖼 Mona Lisa is displayed in the Louvre",
    "🌉 The Seine River divides the city",
    "👗 Paris is a global fashion capital"
  ],

  "Sydney": [
    "🎭 Famous for the Sydney Opera House",
    "🏖 Bondi Beach is world-famous",
    "🌉 Sydney Harbour Bridge is climbable",
    "🦘 Australia has more kangaroos than people",
    "🌊 Sydney has over 100 beaches",
    "🐨 Koalas are native to Australia (not just kangaroos!)",
    "☀️ Sydney enjoys over 2,600 hours of sunshine yearly",
    "⛵ The harbour is one of the most beautiful in the world"
  ],

  "Los Angeles": [
    "🎬 Hollywood is the center of the film industry",
    "🌴 Known for palm-lined streets",
    "🚗 Car culture dominates the city",
    "🎢 Home to Universal Studios",
    "🌞 LA has around 300 sunny days per year",
    "🎥 The Hollywood Sign is over 100 years old",
    "🏄 Venice Beach is famous for skate culture",
    "🎤 Many global music stars come from LA"
  ]
};


// =====================
// CITY QUIZ DATA (TRIVIA QUESTIONS)
// =====================
const cityQuiz = {

  "New York": [
    {
      q: "What is New York nicknamed?",
      options: ["The Big Apple", "The Windy City", "City of Light", "Golden City"],
      answer: "The Big Apple"
    },
    {
      q: "Which landmark is in New York?",
      options: ["Big Ben", "Statue of Liberty", "Eiffel Tower", "Colosseum"],
      answer: "Statue of Liberty"
    },
    {
      q: "Which river flows through NYC?",
      options: ["Hudson River", "Thames", "Seine", "Danube"],
      answer: "Hudson River"
    },
    {
      q: "Which borough is Manhattan in?",
      options: ["Brooklyn", "Manhattan", "Queens", "Bronx"],
      answer: "Manhattan"
    },
    {
      q: "What is Times Square known for?",
      options: ["Mountains", "Bright billboards", "Forests", "Deserts"],
      answer: "Bright billboards"
    },
    {
      q: "What park is famous in NYC?",
      options: ["Hyde Park", "Central Park", "Ueno Park", "Luxembourg Gardens"],
      answer: "Central Park"
    },
    {
      q: "What food is New York famous for?",
      options: ["Sushi", "Tacos", "New York pizza", "Croissants"],
      answer: "New York pizza"
    },
    {
      q: "How many boroughs does NYC have?",
      options: ["3", "4", "5", "6"],
      answer: "5"
    }
  ],

  "London": [
    {
      q: "What river runs through London?",
      options: ["Thames", "Seine", "Danube", "Nile"],
      answer: "Thames"
    },
    {
      q: "What is Big Ben?",
      options: ["A bell", "A bridge", "A palace", "A train station"],
      answer: "A bell"
    },
    {
      q: "Which country is London in?",
      options: ["France", "UK", "USA", "Germany"],
      answer: "UK"
    },
    {
      q: "What is London’s metro called?",
      options: ["Subway", "Underground", "Metro", "Tube"],
      answer: "Underground"
    },
    {
      q: "Which landmark is a ferris wheel?",
      options: ["London Eye", "Big Ben", "Tower Bridge", "Buckingham Palace"],
      answer: "London Eye"
    },
    {
      q: "What palace is the King’s residence?",
      options: ["Buckingham Palace", "Versailles", "White House", "Tower of London"],
      answer: "Buckingham Palace"
    },
    {
      q: "What color are London buses?",
      options: ["Blue", "Red", "Yellow", "Green"],
      answer: "Red"
    },
    {
      q: "What is the famous royal guard called?",
      options: ["Beefeaters", "Samurai", "Legionnaires", "Rangers"],
      answer: "Beefeaters"
    }
  ],

  "Tokyo": [
    {
      q: "What is Tokyo famous for?",
      options: ["Tech & sushi", "Pyramids", "Wine regions", "Deserts"],
      answer: "Tech & sushi"
    },
    {
      q: "Japan’s bullet train is called?",
      options: ["Shinkansen", "Eurostar", "MetroRail", "SkyTrain"],
      answer: "Shinkansen"
    },
    {
      q: "Tokyo is located in which country?",
      options: ["China", "South Korea", "Japan", "Thailand"],
      answer: "Japan"
    },
    {
      q: "What is a famous Tokyo tradition?",
      options: ["Cherry blossoms", "Safari hunting", "Snow surfing", "Volcano diving"],
      answer: "Cherry blossoms"
    },
    {
      q: "Tokyo is known for what type of life?",
      options: ["Slow rural", "Fast-paced urban", "Desert lifestyle", "Island fishing only"],
      answer: "Fast-paced urban"
    },
    {
      q: "What district is famous for gaming & anime?",
      options: ["Shibuya", "Akihabara", "Ginza", "Asakusa"],
      answer: "Akihabara"
    },
    {
      q: "What is Tokyo Tower inspired by?",
      options: ["Eiffel Tower", "Big Ben", "Empire State", "Burj Khalifa"],
      answer: "Eiffel Tower"
    },
    {
      q: "What is Tokyo’s population known for?",
      options: ["Very small", "Very large", "Mostly rural", "Mostly tourists only"],
      answer: "Very large"
    }
  ],

  "Paris": [
    {
      q: "What is Paris known as?",
      options: ["City of Light", "Big Apple", "Golden City", "Windy City"],
      answer: "City of Light"
    },
    {
      q: "Which landmark is in Paris?",
      options: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Colosseum"],
      answer: "Eiffel Tower"
    },
    {
      q: "What river flows through Paris?",
      options: ["Seine", "Thames", "Danube", "Rhine"],
      answer: "Seine"
    },
    {
      q: "Paris is famous for what food?",
      options: ["Sushi", "Pizza", "Croissants", "Burger"],
      answer: "Croissants"
    },
    {
      q: "Which museum is in Paris?",
      options: ["Louvre", "MET", "Prado", "National Gallery"],
      answer: "Louvre"
    },
    {
      q: "What famous painting is in the Louvre?",
      options: ["Mona Lisa", "Starry Night", "The Scream", "Guernica"],
      answer: "Mona Lisa"
    },
    {
      q: "Paris is the capital of which country?",
      options: ["Italy", "France", "Spain", "Germany"],
      answer: "France"
    },
    {
      q: "What is Paris famous for in fashion?",
      options: ["Streetwear only", "Fashion capital", "Sportswear only", "Military fashion"],
      answer: "Fashion capital"
    }
  ],

  "Sydney": [
    {
      q: "Which landmark is in Sydney?",
      options: ["Sydney Opera House", "Eiffel Tower", "Big Ben", "Colosseum"],
      answer: "Sydney Opera House"
    },
    {
      q: "Which country is Sydney in?",
      options: ["USA", "Australia", "Canada", "UK"],
      answer: "Australia"
    },
    {
      q: "What is Bondi Beach known for?",
      options: ["Surfing", "Mountains", "Snow skiing", "Desert tours"],
      answer: "Surfing"
    },
    {
      q: "Sydney Harbour Bridge can be what?",
      options: ["Climbed", "Eaten", "Flown", "Skated underground"],
      answer: "Climbed"
    },
    {
      q: "Australia is famous for which animal?",
      options: ["Kangaroo", "Lion", "Penguin", "Tiger"],
      answer: "Kangaroo"
    },
    {
      q: "What is Sydney’s climate mostly like?",
      options: ["Tropical storms", "Sunny", "Arctic cold", "Snowy all year"],
      answer: "Sunny"
    },
    {
      q: "What ocean is Sydney near?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean"
    },
    {
      q: "What is a famous Sydney building?",
      options: ["Opera House", "Eiffel Tower", "Big Ben", "Colosseum"],
      answer: "Opera House"
    }
  ],

  "Los Angeles": [
    {
      q: "What is Los Angeles famous for?",
      options: ["Hollywood", "Ski resorts", "Pyramids", "Rainforests"],
      answer: "Hollywood"
    },
    {
      q: "Which industry is big in LA?",
      options: ["Film industry", "Fishing", "Mining", "Farming only"],
      answer: "Film industry"
    },
    {
      q: "LA is in which US state?",
      options: ["Texas", "California", "Florida", "Nevada"],
      answer: "California"
    },
    {
      q: "What is a famous LA attraction?",
      options: ["Universal Studios", "Eiffel Tower", "Big Ben", "Colosseum"],
      answer: "Universal Studios"
    },
    {
      q: "LA weather is usually?",
      options: ["Sunny", "Snowy", "Freezing", "Monsoon only"],
      answer: "Sunny"
    },
    {
      q: "What famous sign is in LA?",
      options: ["Hollywood Sign", "London Eye", "Times Square", "Eiffel Tower"],
      answer: "Hollywood Sign"
    },
    {
      q: "Which beach is famous in LA?",
      options: ["Venice Beach", "Bondi Beach", "Copacabana", "Miami Beach"],
      answer: "Venice Beach"
    },
    {
      q: "What city nickname is LA known for?",
      options: ["City of Angels", "Big Apple", "City of Light", "Windy City"],
      answer: "City of Angels"
    }
  ]
};

// =====================
// GLOBAL UI SETTINGS STATE
// =====================
let is24Hour = localStorage.getItem("is24Hour") === "true";
let theme = localStorage.getItem("theme") || "dark";

// =====================
// WORLD EVENTS DATA (GLOBAL + CITY SPECIFIC)
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
// UI TOGGLE: SHOW/HIDE CITY FEATURES
// =====================
function showCityFeatures(show) {
  document.getElementById("timeDisplay").classList.toggle("hidden", !show);
  document.querySelector(".quiz-block").classList.toggle("hidden", !show);
}

// =====================
// TIME HELPERS (CORE CLOCK LOGIC)
// =====================

// Format time in a timezone
function getTime(zone) {
  return new Date().toLocaleString("en-US", {
    timeZone: zone,
    hour12: !is24Hour,
    timeStyle: "medium",
    dateStyle: "full"
  });
}

// Get hour only (used for day/night logic)
function getHour(zone) {
  return Number(
    new Date().toLocaleString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      hour12: false
    })
  );
}

// Determine day/night state
function getSunStatus(zone) {
  const hour = getHour(zone);

  if (hour >= 5 && hour < 8) return "🌅 Sunrise";
  if (hour >= 8 && hour < 17) return "☀️ Day";
  if (hour >= 17 && hour < 20) return "🌇 Sunset";
  return "🌙 Night";
}

// Get timezone offset difference
function getOffsetHours(zone) {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(now.toLocaleString("en-US", { timeZone: zone }));
  return (local - utc) / (1000 * 60 * 60);
}

// Get date in a timezone
function getZonedDate(zone) {
  return new Date(new Date().toLocaleString("en-US", { timeZone: zone }));
}

// Format countdown timer (days/hours/min/sec)
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
// EVENTS SYSTEM (WORLD EVENT COUNTDOWN)
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
// CITY FACT SYSTEM (ROTATING FACTS)
// =====================
let currentFactIndex = 0;
let currentCity = "";

function updateCityFact(cityName, next = false) {
  const factEl = document.getElementById("cityFact");

  if (!cityFacts[cityName]) {
    factEl.textContent = "No facts available.";
    return;
  }

  // Reset when switching city
  if (cityName !== currentCity) {
    currentCity = cityName;
    currentFactIndex = 0;
  } else if (next) {
    currentFactIndex++;
  }

  const facts = cityFacts[cityName];

  // Loop back to start
  if (currentFactIndex >= facts.length) {
    currentFactIndex = 0;
  }

  factEl.textContent = facts[currentFactIndex];
}

// =====================
// QUIZ STATE
// =====================
let quizActive = false;
let quizIndex = 0;
let quizScore = 0;
let currentQuizCity = "";

// =====================
// RESET QUIZ UI
// =====================
function resetQuizUI() {
  quizIndex = 0;
  quizScore = 0;
  currentQuizCity = "";

  document.getElementById("quizQuestion").textContent = "Click start to begin";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("quizScore").textContent = "";
  document.getElementById("quizProgress").textContent = "";
  document.getElementById("quizFeedback").textContent = "";

  document.getElementById("nextQuizBtn").disabled = true;
}

// =====================
// START QUIZ
// =====================
function startQuiz(cityName) {
  currentQuizCity = cityName;
  quizIndex = 0;
  quizScore = 0;
  quizActive = true;

  document.getElementById("quizScore").textContent = "";
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("nextQuizBtn").disabled = true;

  loadQuestion();
}

// =====================
// LOAD QUESTION
// =====================
function loadQuestion() {
  const quiz = cityQuiz[currentQuizCity];

  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const scoreEl = document.getElementById("quizScore");
  const progressEl = document.getElementById("quizProgress");
  const feedbackEl = document.getElementById("quizFeedback");

  if (!quiz || quiz.length === 0) {
    questionEl.textContent = "No quiz available for this city.";
    return;
  }

  // ===== FINISH QUIZ =====
  if (quizIndex >= quiz.length) {
    questionEl.textContent = "🎉 Quiz finished!";
    progressEl.textContent = "";
    feedbackEl.textContent = `Final Score: ${quizScore}/${quiz.length}`;
    feedbackEl.style.color = "#38bdf8";

    optionsEl.innerHTML = "";
    document.getElementById("nextQuizBtn").disabled = true;

    quizActive = false;
    return;
  }

  const current = quiz[quizIndex];

  // ✅ Show question number
  progressEl.textContent = `Question ${quizIndex + 1} of ${quiz.length}`;

  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      if (btn.disabled) return;

      const isCorrect = opt === current.answer;

      // ✅ Feedback text
      if (isCorrect) {
        quizScore++;
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "#22c55e";
      } else {
        feedbackEl.textContent = `❌ Incorrect! Correct answer: ${current.answer}`;
        feedbackEl.style.color = "#ef4444";
      }

      // Disable all buttons + highlight correct
      Array.from(optionsEl.children).forEach(b => {
        b.disabled = true;

        if (b.textContent === current.answer) {
          b.style.backgroundColor = "#22c55e";
          b.style.color = "white";
        }
      });

      // Highlight wrong selection
      if (!isCorrect) {
        btn.style.backgroundColor = "#ef4444";
        btn.style.color = "white";
      }

      scoreEl.textContent = `Score: ${quizScore}`;
      document.getElementById("nextQuizBtn").disabled = false;
    };

    optionsEl.appendChild(btn);
  });

  scoreEl.textContent = `Score: ${quizScore}`;
}

// =====================
// BUTTON EVENTS
// =====================
document.getElementById("startQuizBtn").addEventListener("click", () => {
  const select = document.getElementById("locationSelect");
  const city = select.options[select.selectedIndex]?.text || "";

  resetQuizUI();
  startQuiz(city);
});

document.getElementById("nextQuizBtn").addEventListener("click", () => {
  quizIndex++;
  loadQuestion();

  document.getElementById("nextQuizBtn").disabled = true;

  // ✅ FIX: scroll back to top so full question shows
  document.querySelector(".quiz-block").scrollTop = 0;
});

// =====================
// MAIN UPDATE
// =====================
function updateTime() {
  displayedCities.forEach(city => {
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

    updateCityFact(selectedCity);
    updateEvents(selectedZone);
  }

  document.getElementById("lastUpdated").textContent =
    new Date().toLocaleTimeString();
}

// =====================
// DROPDOWN CHANGE
// =====================
document.getElementById("locationSelect").addEventListener("change", (e) => {
  if (quizActive) {
    alert("Finish the quiz before changing city!");
    e.target.value = currentQuizCity ? currentQuizCity : e.target.value;
    return;
  }

  const value = e.target.value;
  if (!value) return;

  localStorage.setItem("selectedCity", value);

  document.getElementById("homeLinkContainer").style.display = "block";

  showCityFeatures(true);
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
  showCityFeatures(false);
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
// FLIGHT PLANNER (AUTO DURATION)
// =====================

const zones = [
  { name: "London", zone: "Europe/London", avgOffset: 0 },
  { name: "New York", zone: "America/New_York", avgOffset: -5 },
  { name: "Paris", zone: "Europe/Paris", avgOffset: 1 },
  { name: "Los Angeles", zone: "America/Los_Angeles", avgOffset: -8 },
  { name: "Tokyo", zone: "Asia/Tokyo", avgOffset: 9 },
  { name: "Sydney", zone: "Australia/Sydney", avgOffset: 11 }
];

function populateFlightPlanner() {
  const from = document.getElementById("fromZone");
  const to = document.getElementById("toZone");

  from.innerHTML = "";
  to.innerHTML = "";

  zones.forEach(city => {
    const option = `<option value="${city.zone}">${city.name}</option>`;
    from.innerHTML += option;
    to.innerHTML += option;
  });

  from.value = "Europe/London";
  to.value = "Asia/Tokyo";

  updateAutoFlightDuration();
}

function getZoneOffset(zone) {
  const match = zones.find(z => z.zone === zone);
  return match ? match.avgOffset : 0;
}

function updateAutoFlightDuration() {
  const fromZone = document.getElementById("fromZone").value;
  const toZone = document.getElementById("toZone").value;

  if (fromZone === toZone) {
    document.getElementById("flightHours").value = 0;
    return;
  }

  const diff = Math.abs(getZoneOffset(toZone) - getZoneOffset(fromZone));

  let hours;

  if (diff <= 1) hours = 2;
  else if (diff <= 3) hours = 4;
  else if (diff <= 6) hours = 8;
  else if (diff <= 9) hours = 11;
  else hours = 14;

  document.getElementById("flightHours").value = hours;
}

function setDefaultDeparture() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById("departureTime").value = now.toISOString().slice(0,16);
}

function calculateFlight() {
  const fromZone = document.getElementById("fromZone").value;
  const toZone = document.getElementById("toZone").value;
  const hours = Number(document.getElementById("flightHours").value);
  const departureInput = document.getElementById("departureTime").value;
  const manualArrival = document.getElementById("manualArrivalToggle").checked;
  const arrivalInput = document.getElementById("arrivalTime").value;

  if (fromZone === toZone) {
    document.getElementById("flightResult").innerHTML = `
      <p style="color:#ff6b6b;font-weight:bold;">
        ❌ Departure and destination cannot be the same city.
      </p>
    `;
    return;
  }

  if (!departureInput) {
    alert("Please select a departure date and time.");
    return;
  }

  const departLocal = new Date(departureInput);

  let arrivalInDest;

  if (manualArrival && arrivalInput) {
    arrivalInDest = new Date(arrivalInput);
  } else {
    const arrivalUTC = new Date(departLocal.getTime() + hours * 60 * 60 * 1000);
    arrivalInDest = new Date(
      arrivalUTC.toLocaleString("en-US", { timeZone: toZone })
    );

    document.getElementById("arrivalTime").value =
      arrivalInDest.toISOString().slice(0,16);
  }

  // 🌍 Time difference
  const diff = Math.abs(getZoneOffset(toZone) - getZoneOffset(fromZone));

  // 🧳 Jet lag
  let jetLag = "😌 Minimal";
  if (diff >= 3) jetLag = "😴 Mild";
  if (diff >= 6) jetLag = "🥱 Moderate";
  if (diff >= 9) jetLag = "💀 Severe";

  // ✨ Output
  document.getElementById("flightResult").innerHTML = `
    <p>🛫 Departure: <strong>${departLocal.toLocaleString()}</strong></p>
    <p>🛬 Arrival: <strong>${arrivalInDest.toLocaleString()}</strong></p>
    <p>⏱ Duration: <strong>${hours} hours</strong></p>
    <p>🌍 Time Difference: <strong>${diff} hour(s)</strong></p>
    <p>🧳 Jet Lag: <strong>${jetLag}</strong></p>
  `;
}

document.getElementById("calcFlight").addEventListener("click", calculateFlight);

document.getElementById("fromZone").addEventListener("change", () => {
  updateAutoFlightDuration();
});

document.getElementById("toZone").addEventListener("change", () => {
  updateAutoFlightDuration();
});

document.getElementById("manualArrivalToggle").addEventListener("change", (e) => {
  document.getElementById("arrivalTime").disabled = !e.target.checked;
});

document.getElementById("nextFactBtn").addEventListener("click", () => {
  const select = document.getElementById("locationSelect");
  const selectedCity = select.options[select.selectedIndex]?.text || "";

  updateCityFact(selectedCity, true); // move to next fact
});

// =====================
// INIT
// =====================
autoSelect();
document.body.classList.toggle("light", theme === "light");

renderCities();   // 🔥 SHOW 3 RANDOM CITIES

updateTime();
setInterval(updateTime, 1000);

populateFlightPlanner();
setDefaultDeparture();