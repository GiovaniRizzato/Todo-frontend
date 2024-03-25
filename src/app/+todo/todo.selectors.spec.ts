import * as TodoSelectors from "./todo.selectors";
import { TodoState } from "./todo.reducer";
import { Message, MessageType } from "./todo.models";

describe("Selectors", () => {
  const initialState = {
    todoList: [{
      id: "id1",
      label: "label1",
      isDone: true
    },{
      id: "id2",
      label: "label2",
      isDone: false
    }],
    loading: true,
    message: {
      message: "Test Message",
      type: MessageType.SUCCESS
    },
    oldState: {} as TodoState
  };

  it("should select the list of todos", () => {
    const result = TodoSelectors.selectAllTodoList.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual("id1");
    expect(result[0].label).toEqual("label1");
    expect(result[0].isDone).toBeTruthy();
    expect(result[1].id).toEqual("id2");
    expect(result[1].label).toEqual("label2");
    expect(result[1].isDone).toBeFalsy();
  });

  it("should check if the service state is loading", () => {
    const result = TodoSelectors.selectLoadingState.projector(initialState);
    expect(result).toBeTruthy();
  });

  it("should select the messages to the user", () => {
    const result = TodoSelectors.selectMessage.projector(initialState);
    expect(result.message).toEqual("Test Message");
    expect(result.type).toEqual(MessageType.SUCCESS);
  });
});