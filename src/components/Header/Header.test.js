import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const mockReducer = (state = { auth: { loggedIn: false } }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, auth: { loggedIn: true } };
    case "LOGOUT":
      return { ...state, auth: { loggedIn: false } };
    default:
      return state;
  }
};

const createMockStore = (initialState) => {
  return configureStore({
    reducer: mockReducer,
    preloadedState: initialState, // Provide initial state here
  });
};
//create mock redux store

test("renders logout button when loggedIn is true", async () => {
  //initial mock state
  const initialState = {
    auth: {
      loggedIn: true,
      user: { id: 1 },
    },
  }
  //create mock redux store with initial state
  const store = createMockStore(initialState)

  render(
    // for redux store
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  //await userEvent.click(dropdownToggle);

  const dropdownToggle = within(screen.getByLabelText(/personButton/i)).getByRole('button')
  await userEvent.click(dropdownToggle)

  // await usage in here is critical for the find the dropdown item after a waiting
  const logoutButton = await screen.findByText(/logout/i)

  //expect assertion and the function from Jest
  expect(logoutButton).toBeInTheDocument()
});
