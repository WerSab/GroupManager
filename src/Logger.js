class Logger {
  getCurrentTimeDisplayable() {
    return new Date().toISOString();
  }

  log(tag, message) {
    if (__DEV__) {
      console.log(`[${tag} ${this.getCurrentTimeDisplayable()}] ${message}`);
      return;
    }
  }
  warn() {}
  error() {}
}

const LoggerSingletonInstance = new Logger();

export default LoggerSingletonInstance;
