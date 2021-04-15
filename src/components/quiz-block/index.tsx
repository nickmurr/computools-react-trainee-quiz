import React from "react";
import ImgBlock, { IImageBlock } from "../img-block";
import * as style from "./quiz-block.module.scss";

export interface IQuizBlock {
  id: number | string;
  title: string;
  variants: IImageBlock[];
  picked: number;
}

interface IProps {
  quizBlock: IQuizBlock;
}

const QuizBlock = ({ quizBlock }: IProps) => {
  return (
    <div className={style.wrapper} id={`quiz-block-${quizBlock.id}`}>
      <div className={style.title}>
        <h2>{quizBlock.title}</h2>
      </div>

      <div className={style.imgBlocks}>
        {quizBlock.variants.map((i, idx) => (
          <ImgBlock
            key={idx + 1}
            parentID={quizBlock.id}
            imgBlock={{ ...i, id: idx + 1 }}
            pickedID={quizBlock.picked}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(QuizBlock, (prev, next) => {
  return prev.quizBlock.picked === next.quizBlock.picked;
});
