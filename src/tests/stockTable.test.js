import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StockTable from '../screens/Home/StockTable';

describe('StockTable component', () => {
  it('renders without errors', () => {
    // Тест 1: Проверяем, что компонент отрендерился без ошибок
    render(<StockTable />);
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    // Добавьте дополнительные проверки по вашим потребностям
  });

  it('handles pagination correctly', () => {
    // Тест 2: Проверяем, что при нажатии кнопки "Next" меняется текущая страница
    render(<StockTable />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('Page 2')).toBeInTheDocument();
    // Добавьте дополнительные проверки по вашим потребностям
  });

  it('handles drag and drop correctly', () => {
    // Тест 3: Симулируем события перетаскивания элементов и проверяем, что порядок изменился
    render(<StockTable />);
    const draggableElement = screen.getByText('Some Share Name'); // Замените на реальный текст
    const dropzone = screen.getByDroppableId('ROOT'); // Замените на реальный droppableId

    fireEvent.dragStart(draggableElement);
    fireEvent.dragEnter(dropzone);
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone);

    // Проверьте, что порядок элементов изменился, если это предусмотрено
  });

  // Добавьте дополнительные тесты для других частей компонента по вашим потребностям
});
