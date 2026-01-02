import Form from "./components/Form";
import List from "./components/List";
import { useFlowContext } from "./FlowContext";

function AppWithContext() {
  const { handleAddItem, handleDeleteItem, items } = useFlowContext();

  return (
    <main className="container mx-auto max-w-6xl p-4">
      <h2 className="mb-8 text-3zl font-bold">Focus Flow</h2>
      <Form onSubmit={handleAddItem} />
      <List items={items} onDeleteItem={handleDeleteItem} />
    </main>
  );
}
export default AppWithContext;
