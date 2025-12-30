import { Item } from "../utils";

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
    </section>
  );
};
export default List;
