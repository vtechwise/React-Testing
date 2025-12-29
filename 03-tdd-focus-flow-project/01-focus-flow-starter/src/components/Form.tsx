import { FormEvent, useState } from "react";
import { ItemCategory, ItemWithoutId } from "../utils";

const Form = ({ onSubmit }: { onSubmit: (item: ItemWithoutId) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ItemCategory | "">("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !category) return;
    onSubmit({ title, description, category });
  };

  const labelStyles = "block leading-none font-medium mb-2 text-sm";
  const inputStyles = "flex h-10 w-full rounded-md border px-3 py-2 text-sm";
  return (
    <div className="max-w-xl">
      <h2 className="font-semibold text-xl mb-2">Add New Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="title" className={labelStyles}>
            Title
          </label>
          <input
            type="text"
            className={inputStyles}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <input
            type="text"
            className={inputStyles}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelStyles}>
            Category
          </label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ItemCategory)}
            className={inputStyles}
          >
            <option value=""> select Category</option>
            <option value="urgent" className="capitalize">
              {" "}
              select Category
            </option>
            <option value="important" className="capitalize">
              {" "}
              important
            </option>
            <option value="normal" className="capitalize">
              {" "}
              normal
            </option>
            <option value="low">low</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 font-medium text-white text-sm h-10 px-4 py-2"
        >
          add task
        </button>
      </form>
    </div>
  );
};
export default Form;
