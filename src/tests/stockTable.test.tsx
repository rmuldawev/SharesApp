import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StockTable from "../components/StockTable/StockTable";
import { Provider } from "react-redux";
import { store } from "../store";

test("renders StockTable component with pagination", () => {
  jest.mock("../store/sharesSlice", () => ({
    __esModule: true,
    getStocks: jest.fn(),
    selectData: jest.fn(() => mockData),
    selectObj: jest.fn(),
  }));

  const mockData: { name: string; value: string }[] = [
    { name: "CompanyName", value: "Google" },
    { name: "CompanyName", value: "Microsoft" },
    { name: "CompanyName", value: "Amazon" },
  ];

  const { getByText } = render(
    <Provider store={store}>
      <StockTable />
    </Provider>
  );

  mockData.forEach((item) => {
    const itemName = getByText(item.name);
    expect(itemName).toBeInTheDocument();
  });

  const prevButton = getByText("Prev");
  const nextButton = getByText("Next");

  expect(prevButton).toBeDisabled();

  fireEvent.click(nextButton);

  expect(prevButton).not.toBeDisabled();

  fireEvent.click(prevButton);

  expect(prevButton).toBeDisabled();
});
