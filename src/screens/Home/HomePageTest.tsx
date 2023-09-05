import React, { useEffect, useState } from "react";
import { getShares, selectData } from "../../store/sharesSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SharesItem from "../../components/sharesItem/SharesItem";
import "../Home/styles.css";
import PageHeader from "../../components/PageHeader/PageHeader";

const StockTable = () => {
  const dispatch = useAppDispatch();
  const shares = useAppSelector(selectData);

  const [values, setValues] = useState(shares);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  console.log("shares", shares);

  useEffect(() => {
    setValues(shares);
  }, [shares]);

  useEffect(() => {
    dispatch(getShares());
  }, []);

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.draggableId === destination.draggableId &&
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
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="container">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {currentItems.map((e: any, i: number) => (
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
