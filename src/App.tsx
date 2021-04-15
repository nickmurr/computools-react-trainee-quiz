import React from "react";
import "./App.scss";
import QuizBlock from "./components/quiz-block";
import { IQuizBlock } from "./components/quiz-block/index";

interface IIteractionContext {
  onPick: (parentID: number, pickedItem: number) => void;
}
export const IterationContext = React.createContext<IIteractionContext>({} as any);

function App() {
  const [data, setData] = React.useState<IQuizBlock[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    fetch("./data.json")
      .then((res) => res.json())
      .then((res: IQuizBlock[]) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const onPick = (parentID: number, pickedItem: number) => {
    setData(
      data.map((i, idx) => {
        if (parentID === idx + 1) {
          return { ...i, picked: pickedItem };
        }
        return i;
      })
    );
  };

  return (
    <IterationContext.Provider value={{ onPick }}>
      <div className="container">
        {loading
          ? "loading"
          : data.map((item, idx) => <QuizBlock quizBlock={{ ...item, id: idx + 1 }} key={idx + 1} />)}
      </div>
    </IterationContext.Provider>
  );
}

export default App;
