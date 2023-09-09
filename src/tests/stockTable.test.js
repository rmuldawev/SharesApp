import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StockTable from "../components/StockTable/StockTable.tsx";

test("renders StockTable component with pagination", () => {
  // Мокируем функции и хуки
  jest.mock("../../store/sharesSlice", () => ({
    __esModule: true,
    getStocks: jest.fn(),
    selectData: jest.fn(() => mockData),
    selectObj: jest.fn(),
  }));

  // Мокируем данные, которые вернет useAppSelector
  const mockData = [
    { name: "CompanyName", value: "Google" },
    { name: "CompanyName", value: "Microsoft" },
    { name: "CompanyName", value: "Amazon" },
  ];

  // Рендерим компонент
  const { getByText } = render(<StockTable />);

  // Проверяем, что компонент корректно отображает данные
  mockData.forEach((item) => {
    const itemName = getByText(item.name);
    expect(itemName).toBeInTheDocument();
  });

  // Проверяем работу кнопок пагинации
  const prevButton = getByText("Prev");
  const nextButton = getByText("Next");

  // Проверяем, что кнопка Prev заблокирована на первой странице
  expect(prevButton).toBeDisabled();

  // Симулируем нажатие на кнопку Next
  fireEvent.click(nextButton);

  // Теперь кнопка Prev должна быть активной
  expect(prevButton).not.toBeDisabled();

  // Симулируем нажатие на кнопку Prev
  fireEvent.click(prevButton);

  // После нажатия на Prev снова кнопка Prev должна быть заблокирована
  expect(prevButton).toBeDisabled();
});
