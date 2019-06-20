class Teams {
  static getTeams() {
    return {
      teams: {
        team1: { members: ["john"], limit: 0 },
        team2: { members: [], limit: 0 },
        team3: { members: ["schachte"], limit: 2 },
        team4: { members: [], limit: 0 }
      }
    };
  }
}

module.exports = Teams;
