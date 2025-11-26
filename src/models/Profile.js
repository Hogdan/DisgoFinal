export class Profile {
  constructor(data = {}) {
    this.name = data.name || 'Player';
    this.level = data.level || 0;
    this.experience = data.experience || 0;
    this.currentStreak = data.currentStreak || 0;
    this.bestStreak = data.bestStreak || 0;
    this.totalGames = data.totalGames || 0;
    this.totalWins = data.totalWins || 0;
    this.perfectGames = data.perfectGames || 0;
    this.achievements = data.achievements || [];
    this.history = data.history || [];
  }

  static levelUp(profile) {
    profile.experience = profile.experience - profile.getExperienceToNextLevel();
    profile.level += 1;
  }

  // convenience methods
  getName() {
    return this.name;
  }

  getLevel() {
    return this.level;
  }

  getExperience() {
    return this.experience;
  }

  getExperienceToNextLevel() {
    return 100 + (this.level * 10);
  }

  getWinPercentage() {
    if (this.totalGames === 0) return 0;
    return Math.round((this.totalWins / this.totalGames) * 100);
  }

  getLastResult() {
    if (this.history.length === 0) return null;
    return this.history[this.history.length - 1].score;
  }

  addExperience(amount) {
    this.experience += amount;
    while (this.experience >= this.getExperienceToNextLevel()) {
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
    if (this.history.length === 0) return false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const lastEntryDate = typeof this.history[this.history.length - 1].date === 'string'
      ? this.history[this.history.length - 1].date
      : this.history[this.history.length - 1].date.toDateString();
    return lastEntryDate === yesterday.toDateString();
  }

  playedToday() {
    if (this.history.length === 0) return false;
    const today = new Date().toDateString();
    const lastEntryDate = typeof this.history[this.history.length - 1].date === 'string'
      ? this.history[this.history.length - 1].date
      : this.history[this.history.length - 1].date.toDateString();
    return lastEntryDate === today;
  }

  gameOver(score) {
    if (!this.history) return false;
    // If already played today, don't allow another entry
    if (this.playedToday()) return false;

    // Only record if score is provided
    if (score) {

      // Update streaks - pass true if played yesterday (consecutive), false otherwise
      this.updateStreak(this.playedYesterday());

      // Increment total wins if score indicates a win
      if (score >= 0) {
        this.totalWins += 1;
        // Perfect game is when user wins on first try
        if (score === 5) {
          this.perfectGames += 1;
        }
      }

      // Add experience
      const experienceGained = (score * 10) + 50 || 50;
      this.addExperience(experienceGained);

      // Record in history with date string for consistency
      const today = new Date().toDateString();
      this.addHistoryEntry({
        date: today,
        score: score,
      });
      this.totalGames = this.history.length;
      return true;
    }

    return false;
  }

  addHistoryEntry(entry) {
    this.history.push(entry);
  }

  // for localStorage/API serialization
  historyToJSON() {
    return this.history.map((entry) => ({
      date: entry.date,
      score: entry.score,
    }));
  }

  static historyFromJSON(jsonArray) {
    return jsonArray.map((entry) => ({
      date: entry.date,
      score: entry.score,
    }));
  }

  toJSON() {
    return {
      name: this.name,
      level: this.level,
      experience: this.experience,
      currentStreak: this.currentStreak,
      bestStreak: this.bestStreak,
      totalGames: this.totalGames,
      totalWins: this.totalWins,
      perfectGames: this.perfectGames,
      achievements: this.achievements,
      history: this.historyToJSON()
    };
  }

  static fromJSON(json) {
    const profile = Profile.create(json);
    if (json.history) {
      profile.history = Profile.historyFromJSON(json.history);
    }
    return profile;
  }

  // factory
  static create(overrides = {}) {
    return new Profile(overrides);
  }

}
