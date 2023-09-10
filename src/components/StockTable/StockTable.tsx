import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
//types
import { ItemProps } from "../../types/stocks";

//conponents
import SharesItem from "../sharesItem/SharesItem";

//redux
import { useAppDispatch, useAppSelector } from "../../store";
import { getStocks, selectData } from "../../store/sharesSlice";

//styles
import "../StockTable/styles.css";

const StockTable = () => {
  const dispatch = useAppDispatch();
  const stockData = useAppSelector(selectData);
  const [values, setValues] = useState(stockData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setValues(stockData);
  }, [stockData]);

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch]);

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedValues = [...values];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedValue] = reorderedValues.splice(sourceIndex, 1);
      reorderedValues.splice(destinationIndex, 0, removedValue);
      setValues(reorderedValues);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = values.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(values.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const convertCamelCaseToNormal = (text: string) =>
    text.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });

  return (
    <div className="main">
      <p className="textHeader">Полный отчет</p>
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="container">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {currentItems.map((e: ItemProps, i: number) => (
                  <Draggable
                    draggableId={i.toString()}
                    key={i.toString()}
                    index={i + startIndex}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <SharesItem
                          id={(i + startIndex + 1).toString()}
                          title={convertCamelCaseToNormal(e.name)}
                          value={e.value}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div className="nextPrevButtons">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="buttonStyle"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(values.length / itemsPerPage) - 1}
          className="buttonStyle"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockTable;
