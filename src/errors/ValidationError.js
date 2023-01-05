class ValidationError extends Error {
  constructor({field, message}) {
    super(message); //wywołuje konstruktor klasy bazowej - rodzica
    console.log('field:', field, message);
    this.field = field;
    this.message = message;
  }
}

export default ValidationError;
