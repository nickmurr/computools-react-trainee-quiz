import React from "react";
import "./App.scss";
import QuizBlock from "./components/quiz-block";
import { IQuizBlock } from "./components/quiz-block/index";
import Result from "./components/result/index";

interface IIteractionContext {
  onPick: (parentID: number, pickedItem: number) => void;
  onRetake: () => void;
}

export const IterationContext = React.createContext<IIteractionContext>({} as any);

function scroll(newData: IQuizBlock[]) {
  const idx = newData.findIndex((i, idx) => i.picked === 0) + 1;

  if (idx === 0) {
    setTimeout(() => {
      document.querySelector("#result")?.scrollIntoView({ block: "start", behavior: "smooth" }); // Scroll to the top
    }, 50);
  } else {
    document.querySelector(`#quiz-block-${idx} `)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function mode<T>(arr: T[]) {
  return arr.sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length).pop();
}

function App() {
  const [data, setData] = React.useState<IQuizBlock[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState<{ [key: number]: number }>({});

  React.useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = () => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((res: IQuizBlock[]) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onPick = (parentID: number, pickedItem: number) => {
    const newData = data.map((i, idx) => (parentID === idx + 1 ? { ...i, picked: pickedItem } : i));
    setResult((p) => ({ ...p, [parentID]: pickedItem }));

    setData(newData);
    scroll(newData);
  };

  const onRetake = () => {
    document.body?.scrollIntoView({ block: "start", behavior: "smooth" }); // Scroll to the top
    loadData();
    setResult({});
  };

  return (
    <IterationContext.Provider value={{ onPick, onRetake }}>
      <div className="container">
        {loading
          ? "loading" // TODO implement loader or loader screen
          : data.map((item, idx) => <QuizBlock quizBlock={{ ...item, id: idx + 1 }} key={idx + 1} />)}

        {Object.keys(result).length === data.length && <Result commonPick={mode(Object.values(result))!} />}
      </div>
    </IterationContext.Provider>
  );
}

export default App;
