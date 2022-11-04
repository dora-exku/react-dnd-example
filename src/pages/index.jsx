import React, {useCallback, useEffect, useState} from "react";
import {Motion, spring} from 'react-motion';
import FlipMove from "react-flip-move";


import update from 'immutability-helper'

import './index.css';
import Card from "./card";

export default function Index() {
  const [value, setValue] = useState('')
  const [lastId, setLastId] = useState(5)
  const [items, setItems] = useState([
    {
      id: 1,
      title: "11",
      order: 0,
    },
    {
      id: 2,
      title: "22",
      order: 1,
    },
    {
      id: 3,
      title: "33",
      order: 2,
    },
    {
      id: 4,
      title: "44",
      order: 3,
    },
    {
      id: 5,
      title: "55",
      order: 4,
    }
  ])

  const moveCard = useCallback((dragIndex, hoverIndex) => {


    // setItems((prevItems) => {

    //   const dragOrder = prevItems[dragIndex].order
    //   const hoverOrder = prevItems[hoverIndex].order
    //
    //   console.log(`选中 ${dragOrder} ${dragIndex}, 目标 ${hoverOrder} ${hoverIndex}`)
    //
    //   return update(prevItems, {
    //     [dragIndex]: {
    //       order: {
    //         $set: hoverOrder,
    //       }
    //     },
    //     [hoverIndex]: {
    //       order: {
    //         $set: dragOrder,
    //       }
    //     }
    //   })
    // })

    setItems((prevItems) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex]]
        ]
      })
    )
  }, [])


  useEffect(() => {
    // console.log(items)
  }, [items])


  const renderCard = useCallback((item, index) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        index={index}
        moveItem={moveCard}
        style={{
          zIndex: 1,
        }}
      />
    )
  }, [])

  return (
    <div className='container'>
      <div className='board'>
        {
          items.map((item, index) => renderCard(item, index))
        }
      </div>

      <div>
        <input type="aaaaa" value={value} onChange={(_v) => setValue(_v.target.value)}/>
        <button
          onClick={() => {
            var id = lastId + 1;
            setLastId(id)
            setItems((prevItems) =>
              update(prevItems, {
                $push: [{id: id, title: value}]
              })
            )
          }}
        >添加
        </button>

        {/*<Motion defaultStyle={{y: 0}} style={{y: spring(10)}}>*/}
        {/*  {value => <div>{value.y}</div>}*/}
        {/*</Motion>*/}
      </div>
    </div>
  )
}