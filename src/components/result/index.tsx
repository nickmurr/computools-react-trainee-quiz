import React from "react";
import { IterationContext } from "../../utils";
import * as style from "./result.module.scss";

interface IProps {
  commonPick: number;
}

const ResultView = ({ title, description }: { title: string; description: string }) => {
  const { onRetake } = React.useContext(IterationContext);
  return (
    <div className={style.resultView} id="result">
      <h2>{title}!</h2>
      <span>{description}</span>
      <button onClick={onRetake}>Retake</button>
    </div>
  );
};

const Result = (props: IProps) => {
  switch (props.commonPick) {
    case 1:
      return <ResultView title="Stern" description="You’re a very serious person!" />;
    case 2:
      return <ResultView title="Funny" description="You have a wicked sense of humour!" />;
    case 3:
      return <ResultView title="Outgoing" description="You’re a perfect mix of funny, chill, and intelligence!" />;
    case 4:
      return <ResultView title="Shy" description="You’re shy and reserved!" />;

    default:
      return <div></div>;
  }
};

export default Result;
