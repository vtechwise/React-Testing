import { Item } from "../utils";
import ItemCard from "./ItemCard";

const List = ({
  items,
  onDeleteItem,
}: {
  items: Item[];
  onDeleteItem: (id: string) => void;
}) => {
  return (
    <section className="mt-8">
      <h2 className="text=xl font-semibold mb-2">Flow Board</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          return <ItemCard key={item.id} {...item} onDelete={onDeleteItem} />;
        })}
      </div>
    </section>
  );
};
export default List;
