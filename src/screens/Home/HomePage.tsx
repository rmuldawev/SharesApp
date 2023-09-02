import React, { useEffect, useState } from "react";
import { getShares, selectData } from "../../store/sharesSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SharesItem from "../../components/sharesItem/SharesItem";
import "../Home/styles.css";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const shares = useAppSelector(selectData);

  const [values, setValues] = useState(shares);

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
      const reordedValues = [...values];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedValue] = reordedValues.splice(sourceIndex, 1);
      reordedValues.splice(destinationIndex, 0, removedValue);
      return setValues(reordedValues);
    }
  };

  console.log(values.length);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="container">
          <Droppable droppableId="ROOT" type="group">
            {(proveded) => (
              <div {...proveded.droppableProps} ref={proveded.innerRef}>
                {values.map((e: any, i: number) => (
                  <Draggable
                    draggableId={i.toString()}
                    key={i.toString()}
                    index={i}
                  >
                    {(proveded) => (
                      <div
                        {...proveded.dragHandleProps}
                        {...proveded.draggableProps}
                        ref={proveded.innerRef}
                      >
                        <SharesItem title={e.name} value={e.value} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {proveded.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
