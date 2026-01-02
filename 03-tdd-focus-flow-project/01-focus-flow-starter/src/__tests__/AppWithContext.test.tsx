import { render, screen } from "@testing-library/react";
import { FlowProvider } from "../FlowContext";
import AppWithContext from "../AppWithContext";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

const customRenderAppWithContext = () => {
  return render(
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  );
};

const addTestItem = async (user: UserEvent) => {
  const { titleInput, descriptionInput, categorySelect, submitButton } =
    getFormElements();

  await user.type(titleInput, "title");
  await user.type(descriptionInput, "test description");
  await user.selectOptions(categorySelect, "urgent");
  await user.click(submitButton);
};

describe("AppWithContext components", () => {
  let user: UserEvent;
  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    customRenderAppWithContext();
  });
  test("render heading and form elements", () => {
    expect(
      screen.getByRole("heading", { name: /focus flow/i, level: 2 })
    ).toBeInTheDocument();
    const elements = getFormElements();
    Object.values(elements).forEach((element) => {
      return expect(element).toHaveValue("");
    });
  });
  test("add new item to the list", async () => {
    const beforeCards = screen.queryAllByRole("article");
    expect(beforeCards).toHaveLength(0);
    await addTestItem(user);
    const afterCard = screen.getAllByRole("article");

    expect(afterCard).toHaveLength(1);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("test description")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });
  test("test deleting of an item", async () => {
    await addTestItem(user);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.queryByText("title")).not.toBeInTheDocument();
  });
});
