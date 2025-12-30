import { Trash } from "lucide-react";
import { Item } from "../utils";

type ItemCardProps = Item & {
  onDelete: (id: string) => void;
};

const categoryColors = {
  urgent: "bg-red-500",
  important: "bg-yellow-500",
  normal: "bg-blue-500",
  low: "bg-green-500",
};

const ItemCard = ({
  id,
  category,
  title,
  description,
  onDelete,
}: ItemCardProps) => {
  return (
    <article className="w-full rounded-lg border shadow-sm">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <button
          onClick={() => onDelete(id)}
          className="inline-flex h-9 items-center justify-center"
          aria-label={`delete task : ${id}`}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm mb-2">{description}</p>
        <div className={`inline-block ${categoryColors[category]}`}>
          {category}
        </div>
      </div>
    </article>
  );
};
export default ItemCard;
