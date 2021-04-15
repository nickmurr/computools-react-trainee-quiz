import React from "react";
import { IQuizBlock } from "../components/quiz-block";

export interface IIteractionContext {
  onPick: (parentID: number, pickedItem: number) => void;
  onRetake: () => void;
}

export const IterationContext = React.createContext<IIteractionContext>({} as any);

export function scroll(newData: IQuizBlock[]) {
  const idx = newData.findIndex((i, idx) => i.picked === 0) + 1;

  if (idx === 0) {
    setTimeout(() => {
      document.querySelector("#result")?.scrollIntoView({ block: "start", behavior: "smooth" }); // Scroll to the top
    }, 50);
  } else {
    document.querySelector(`#quiz-block-${idx} `)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

export function mode<T>(arr: T[]) {
  return arr.sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length).pop();
}
