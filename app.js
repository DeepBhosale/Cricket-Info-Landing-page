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
      { name: "Pat Cummins", role: "Bowler", matches: 90, runs