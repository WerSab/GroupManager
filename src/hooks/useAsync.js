import React, {useCallback, useEffect, useState} from 'react';

fetch();

// w idealnym swiecie: () => Promise<T>
// export const useAsync <T,> = (asyncFn: () => Promise<T>) => {// implementacja hook'a};
// const exampleFn = () => Promise.resolve("hello world"); -> return type Promise'a funkcji exampleFn to: Promise<string>
// useAsync(exampleFn);

// getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;

// asyncFn: () => Promise<any>;

/**
    Ten hook obsluguje asynchroniczna funkcje w kontekscie React'a
    Zwraca:
    data - Dane zresolvowane przez funkcje @param asyncFn
    loading - informacje o tym czy fn asynchroniczna zostala zresolvowana czy nie
    error - potencjalny/opcjkonalny blad wykonywania funkcji asynch.
*/
export const useAsync = (asyncFn, invokeImmediately = true) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const execute = useCallback(async () => {
    //zapamiętujemy referencję na execute
    try {
      const result = await asyncFn();
      setData(result);
      setLoading(false);
    } catch (_error) {
      console.error('useAsync:', _error);
      setError(_error);
      setLoading(false);
    }
  }, [asyncFn]);

  useEffect(() => {
    // IIFE - immidiately invoked function expression
    // asyncFn().then().catch();
    // const x = async () => {};
    // x();
    // (() => {})();

    if (!invokeImmediately) {
      return;
    }
    execute();
  }, [execute, invokeImmediately]);

  return {
    data,
    loading,
    error,
    execute,
  };
};

//const [myFn, setMyFn] = useState(() => {});
//

// bt -> onPress -> execute();

//trigger();
// 30.03. 2023trigger();- ktoś nie chce od razu wywoływać funkcji tylko w konkretnym momencie

// const funkcjaLukasza = () => {
// tu jest moja funkcja ktora cos robi
// }
// const {} = useAsync(funkcjaLukasza)

// REACT LIFECYCLE
// 1. component
// 2.

const MyFunctionalComponent = () => {
  useEffect(() => {
    // funkcja wywola sie raz przy starcie komponentu
    return () => {};
  }, []);

  useEffect(() => {}, ['a', 'b', 'c']);
};

class MyComponent extends React.Component {
  constructor(props) {
    // props.x -> y
    this.state = {
      a: 10,
      b: {},
    };
    // this.setState({a: 30, b: null});
    // this.setState(prevState => {
    // wykorzystac poprzedni stan mozna i dokonac zmian
    // })
  }

  componentDidMount() {
    // funkcja wywola sie raz przy starcie komponentu
  }

  componentDidUpdate(prevProps, prevState, snapshost) {
    //
  }

  componentWillUnmount() {
    // cleanup function
  }

  componentDidCatch() {
    // o tym mozna doczytac w docsach react
  }
}

<MyComponent x="y" />;
