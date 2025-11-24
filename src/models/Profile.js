export class Profile {
  constructor(data = {}) {
    this.name = data.name || 'Player';
    this.level = data.level || 1;
    this.experience = data.experience || 0;
    this.currentStreak = data.currentStreak || 0;
    this.bestStreak = data.bestStreak || 0;
    this.totalGames = data.totalGames || 0;
    this.perfectGames = data.perfectGames || 0;
    this.achievements = data.achievements || [];
    this.history = data.history || [];
  }

  // convenience methods
  getName() {
    return this.name;
  }

  addExperience(amount) {
    this.experience += amount;
    while (this.experience >= this.level * (100 + this.level * 10)) {
      Profile.levelUp(this);
    }
  }

  updateStreak(isConsecutive) {
    if (isConsecutive) {
      this.currentStreak += 1;
    } else {
      this.currentStreak = 1;
    }
    if (this.currentStreak >= this.bestStreak) {
      this.bestStreak = this.currentStreak;
    }
  }

  playedYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      this.history[this.history.length - 1].date.toDateString() ===
      yesterday.toDateString()
    );
  }

  completedToday(gameResult) {
    const today = new Date();
    this.addHistoryEntry({
      date: today,
      experienceGained: gameResult.experienceGained,
      level: this.level,
      gameResult: gameResult,
    });
  }

  addHistoryEntry(entry) {
    this.history.push(entry);
  }

  // for localStorage/API serialization
  historyToJSON() {
    return this.history.map((entry) => ({
      date: entry.date.toDateString(),
      experienceGained: entry.experienceGained,
      level: entry.level,
      gameResult: entry.gameResult,
    }));
  }

  static historyFromJSON(jsonArray) {
    return jsonArray.map((entry) => ({
      date: entry.date,
      experienceGained: entry.experienceGained,
      level: entry.level,
      gameResult: entry.gameResult,
    }));
  }

  toJSON() {
    return {
      name: this.name,
      level: this.level,
      experience: this.experience,
      currentStreak: this.currentStreak,
      bestStreak: this.bestStreak,
    };
  }

  static fromJSON(json) {
    return Profile.create(json);
  }

  // factory
  static create(overrides = {}) {
    return new Profile(overrides);
  }

  static levelUp(profile) {
    profile.experience = 0;
    profile.level += 1;
  }
}
