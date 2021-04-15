import React from "react";
import { IterationContext } from "../../utils";
import * as style from "./img-block.module.scss";

export interface IImageBlock {
  id?: number;

  src: string;
  title: string;
  description: string;
  active: boolean;
}

interface IProps {
  imgBlock: IImageBlock;
  pickedID: number;
  parentID: number | string;
}

const ImgBlock = ({ imgBlock, pickedID, parentID }: IProps) => {
  const { onPick } = React.useContext(IterationContext);

  return (
    <div
      onClick={(e) => onPick(parentID as number, imgBlock.id!)}
      className={`${style.block} ${pickedID === 0 ? "" : pickedID === imgBlock.id ? style.active : style.inactive}`}
    >
      <div className={style.wrapper}>
        <img src={imgBlock.src} alt={imgBlock.title} />
      </div>

      <div className={style.description}>
        <h3>{imgBlock.title}</h3>
        <span>{imgBlock.description}</span>
      </div>
    </div>
  );
};

export default ImgBlock;
