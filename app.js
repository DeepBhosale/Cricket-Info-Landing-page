const teams = {
  india: {
    name: "India",
    flag: "🇮🇳",
    region: "Asian Cricket Council",
    rank: 1,
    wins: 9,
    losses: 3,
    form: ["W", "W", "L", "W", "W"],
    next: { opponent: "Australia", date: "19 Nov · 09:00 AM", venue: "Perth Stadium" },
    players: [
      { name: "Rohit Sharma", role: "Batter", matches: 265, runs: 10866, average: 49.16, strikeRate: 92.43, wickets: 9 },
      { name: "Virat Kohli", role: "Batter", matches: 295, runs: 13906, average: 58.18, strikeRate: 93.54, wickets: 5 },
      { name: "Shubman Gill", role: "Batter", matches: 47, runs: 2328, average: 58.20, strikeRate: 101.74, wickets: 0 },
      { name: "KL Rahul", role: "Wicketkeeper", matches: 77, runs: 2851, average: 49.15, strikeRate: 87.56, wickets: 0 },
      { name: "Hardik Pandya", role: "All-rounder", matches: 86, runs: 1769, average: 34.01, strikeRate: 110.56, wickets: 84 },
      { name: "Ravindra Jadeja", role: "All-rounder", matches: 197, runs: 2756, average: 32.42, strikeRate: 85.06, wickets: 220 },
      { name: "Jasprit Bumrah", role: "Bowler", matches: 89, runs: 91, average: 7.58, strikeRate: 53.21, wickets: 149 },
      { name: "Kuldeep Yadav", role: "Bowler", matches: 106, runs: 183, average: 8.71, strikeRate: 69.06, wickets: 172 }
    ]
  },
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    region: "Asian Cricket Council",
    rank: 2,
    wins: 8,
    losses: 4,
    form: ["W", "L", "W", "W", "L"],
    next: { opponent: "India", date: "19 Nov · 09:00 AM", venue: "Perth Stadium" },
    players: [
      { name: "Travis Head", role: "Batter", matches: 69, runs: 2773, average: 44.01, strikeRate: 103.47, wickets: 17 },
      { name: "Steve Smith", role: "Batter", matches: 165, runs: 5665, average: 43.91, strikeRate: 86.96, wickets: 28 },
      { name: "Marnus Labuschagne", role: "Batter", matches: 54, runs: 1941, average: 38.82, strikeRate: 82.38, wickets: 12 },
      { name: "Alex Carey", role: "Wicketkeeper", matches: 77, runs: 1825, average: 31.46, strikeRate: 89.46, wickets: 0 },
      { name: "Glenn Maxwell", role: "All-rounder", matches: 149, runs: 3980, average: 33.44, strikeRate: 126.70, wickets: 77 },
      { name: "Mitchell Marsh", role: "All-rounder", matches: 89, runs: 2754, average: 35.76, strikeRate: 94.16, wickets: 56 },
      { name: "Pat Cummins", role: "Bowler", matches: 90, runs: 568, average: 17.75, strikeRate: 80.45, wickets: 143 },
      { name: "Adam Zampa", role: "Bowler", matches: 100, runs: 184, average: 10.22, strikeRate: 69.96, wickets: 169 }
    ]
  },
  england: {
    name: "England",
    flag: "🏴",
    region: "European Cricket Council",
    rank: 3,
    wins: 6,
    losses: 6,
    form: ["L", "W", "L", "W", "L"],
    next: { opponent: "South Africa", date: "22 Nov · 02:00 PM", venue: "Lord's, London" },
    players: [
      { name: "Joe Root", role: "Batter", matches: 178, runs: 6522, average: 47.26, strikeRate: 86.77, wickets: 27 },
      { name: "Ben Duckett", role: "Batter", matches: 29, runs: 1028, average: 36.71, strikeRate: 103.11, wickets: 0 },
      { name: "Harry Brook", role: "Batter", matches: 23, runs: 770, average: 36.66, strikeRate: 101.31, wickets: 0 },
      { name: "Jos Buttler", role: "Wicketkeeper", matches: 181, runs: 5022, average: 39.54, strikeRate: 117.05, wickets: 0 },
      { name: "Liam Livingstone", role: "All-rounder", matches: 33, runs: 712, average: 26.37, strikeRate: 112.83, wickets: 12 },
      { name: "Sam Curran", role: "All-rounder", matches: 33, runs: 456, average: 22.80, strikeRate: 93.25, wickets: 34 },
      { name: "Jofra Archer", role: "Bowler", matches: 28, runs: 113, average: 12.55, strikeRate: 88.97, wickets: 42 },
      { name: "Adil Rashid", role: "Bowler", matches: 138, runs: 735, average: 13.36, strikeRate: 83.52, wickets: 190 }
    ]
  }
};

const fixtures = [
  { date: "19 NOVEMBER · 1ST ODI", home: "India", homeFlag: "🇮🇳", away: "Australia", awayFlag: "🇦🇺", info: "Perth Stadium · 09:00 AM" },
  { date: "22 NOVEMBER · 2ND ODI", home: "England", homeFlag: "🏴", away: "South Africa", awayFlag: "🇿🇦", info: "Lord's, London · 02:00 PM" },
  { date: "26 NOVEMBER · 1ST ODI", home: "New Zealand", homeFlag: "🇳🇿", away: "Pakistan", awayFlag: "🇵🇰", info: "Eden Park · 11:00 AM" }
];

const teamSelect = document.querySelector("#team-select");
const roleSelect = document.querySelector("#role-select");
const searchInput = document.querySelector("#player-search");
let selectedTeam = "india";

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

function fillTeamOptions() {
  const options = Object.entries(teams).map(([key, team]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = team.name;
    return option;
  });
  teamSelect.replaceChildren(...options);
}

function showTeam() {
  const team = teams[selectedTeam];
  document.querySelector("#team-flag").textContent = team.flag;
  document.querySelector("#team-name").textContent = team.name;
  document.querySelector("#team-meta").textContent = `${team.region} · Men's ODI squad`;
  document.querySelector("#team-rank").textContent = `#${team.rank}`;
  document.querySelector("#team-record").textContent = `${team.wins}–${team.losses}`;
  document.querySelector("#team-win-rate").textContent = `${Math.round(team.wins / 12 * 100)}% wins this year`;
  document.querySelector("#next-opponent").textContent = `vs ${team.next.opponent}`;
  document.querySelector("#next-date").textContent = team.next.date;
  const chips = team.form.map((result) => {
    const chip = document.createElement("span");
    chip.className = `form-chip ${result === "W" ? "win" : "loss"}`;
    chip.textContent = result;
    return chip;
  });
  document.querySelector("#form-chips").replaceChildren(...chips);
  renderPlayers();
}

function renderPlayers() {
  const team = teams[selectedTeam];
  const query = searchInput.value.trim();
  const role = roleSelect.value;
  const filtered = team.players.filter((player) => {
    const matchesName = player.name.toLowerCase().includes(query);
    const matchesRole = role === "all" || player.role === role;
    return matchesName && matchesRole;
  });
  const rows = filtered.map((player) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const playerCell = document.createElement("span");
    const avatar = document.createElement("span");
    playerCell.className = "player-cell";
    avatar.className = "player-avatar";
    avatar.textContent = initials(player.name);
    playerCell.append(avatar, document.createTextNode(player.name));
    nameCell.append(playerCell);
    row.append(nameCell);

    const roleCell = document.createElement("td");
    const rolePill = document.createElement("span");
    rolePill.className = "role-pill";
    rolePill.textContent = player.role;
    roleCell.append(rolePill);
    row.append(roleCell);

    [
      player.matches,
      player.runs.toLocaleString("en-IN"),
      player.average.toFixed(2),
      player.strikeRate.toFixed(2),
      player.wickets
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    return row;
  });
  document.querySelector("#player-table").replaceChildren(...rows);
  document.querySelector("#empty-state").hidden = filtered.length !== 0;
}

function renderFixtures() {
  const cards = fixtures.map((fixture) => {
    const card = document.createElement("article");
    const date = document.createElement("p");
    const match = document.createElement("div");
    const vs = document.createElement("span");
    const info = document.createElement("p");
    const createTeam = (name, flag) => {
      const team = document.createElement("span");
      const teamFlag = document.createElement("span");
      team.className = "fixture-team";
      teamFlag.className = "fixture-flag";
      teamFlag.textContent = flag;
      team.append(teamFlag, document.createTextNode(name));
      return team;
    };

    card.className = "fixture-card";
    date.className = "fixture-date";
    date.textContent = fixture.date;
    match.className = "fixture-teams";
    vs.className = "fixture-vs";
    vs.textContent = "VS";
    match.append(createTeam(fixture.home, fixture.homeFlag), vs, createTeam(fixture.away, fixture.awayFlag));
    info.className = "fixture-info";
    info.textContent = fixture.info;
    card.append(date, match, info);
    return card;
  });
  document.querySelector("#fixture-grid").replaceChildren(...cards);
}

fillTeamOption();
renderFixtures();
showTeam();

teamSelect.addEventListener("change", (event) => {
  selectedTeam = event.target.value;
  searchInput.value = "";
  roleSelect.value = "all";
  showTeam();
});
roleSelect.addEventListener("change", renderPlayers);
searchInput.addEventListener("input", renderPlayers);
