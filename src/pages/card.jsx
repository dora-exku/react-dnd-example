import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {Type} from "./type";

export default function Card({id, title, index, moveItem, style}) {
  const ref = useRef(null)

  const [{handlerId}, drop] = useDrop(() => ({
    accept: Type.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (_item, monitor) => {
      if (!ref?.current) {
        return
      }

      const dragIndex = _item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingClientRect = ref?.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingClientRect.bottom - hoverBoundingClientRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingClientRect.top;


      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveItem(dragIndex, hoverIndex)

      _item.index = hoverIndex;
    }
  }))

  const [{isDragging}, drag] = useDrag(() => ({
    type: Type.CARD,
    item: () => ({
      id, index
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))


  const opacity = isDragging ? 0 : 1;

  console.log(opacity)

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className='card'
      style={{
        opacity,
        ...style,
      }}
      data-handler-id={handlerId}
    >
      {title}
    </div>
  )
}