import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StockTable from '../components/StockTable/StockTable';
// import StockTable from './StockTable';

// Поддельные данные для вашего селектора
const mockSelectData = [
  {name: LatestPrice, value: 100}
];

// Поддельная функция useDispatch
const mockDispatch = jest.fn();

// Мокаем хуки из react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Мокаем селектор и действие из Redux
jest.mock("/../store/sharesSlice.ts", () => ({
  ...jest.requireActual('../../store/sharesSlice'),
  selectData: jest.fn(),
  getStocks: jest.fn(),
}));



describe('StockTable', () => {
  beforeAll(() => {
    // Устанавливаем поведение моков перед началом тестов
    selectData.mockReturnValue(mockSelectData);
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('отображает компонент StockTable', () => {
    render(<StockTable />);
    const stockTableElement = screen.getByText('Полный отчет'); // Подстройте этот селектор по необходимости
    expect(stockTableElement).toBeInTheDocument();
  });

  // Добавьте здесь другие тесты, чтобы проверить разное поведение компонента

  afterEach(() => {
    // Очищаем моки после каждого теста
    jest.clearAllMocks();
  });
});
