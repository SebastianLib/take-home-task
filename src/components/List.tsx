import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  card: ListItem;
  isDeleted?: boolean;
};

export const Card: FC<CardProps> = ({ card, isDeleted }: CardProps) => {
  const { id, title, description, expanded } = card;
  const { deleteCard, toggleExpanded } = useStore();

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {!isDeleted && (
            <ExpandButton
              onClick={() => toggleExpanded(id)}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`} 
            >
              <ChevronUpIcon />
            </ExpandButton>
          )}

          {!isDeleted && <DeleteButton onClick={() => deleteCard(id)} />}
        </div>
      </div>
      <p
        className={`text-sm overflow-hidden duration-300 ease-in-out ${
          expanded && !isDeleted ? "max-h-60" : "max-h-0"
        }`}
      >
        {description}
      </p>
    </div>
  );
};
