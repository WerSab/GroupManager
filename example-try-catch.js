const a = () => {
  throw new AError();
};

const b = () => {
  const bErrorInstance = new BError();
  throw bErrorInstance;
};

const result = () => {
  try {
    a();
    b();
  } catch (error) {
    if (error instanceof AError) {
      // obsluga bledu A
      // tutaj mozemy dac alert z info o nieprawidlowym np. URL
      return;
    }
    if (error instanceof BError) {
      // obsluga bledu B
      // alert z info o bledzie serwera lub brak neta itp
    }
  }
};

const result2 = () => {
  try {
    a();
  } catch (error) {
    // obsluga bledu A
    // tutaj mozemy dac alert z info o nieprawidlowym np. URL
  }
  try {
    b();
  } catch (error) {
    // obsluga bledu B
    // tutaj mozemy dac alert z info o bledzie serwera itp
  }
};

class AError extends Error {
  constructor() {
    super('A error occurred');
  }
}

class BError extends Error {
  constructor() {
    this.properties = {};
    super('B error occurred');
  }
}
