'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Transition } from '@windmill/react-ui'

// source tree 버그있음
// 테이블 바디 셀렉트 작업중
function List(props) {
  const getClickedHeaderName = (value) => {
    props.getClickedHeaderName(value)
  }

  const getClickValue = (value) => {
    props.getClickValue(value)
  }

  return (
    <li
      onClick={() => {
        getClickValue(props.children)
        getClickedHeaderName(props.headerName)
      }}
      className="m-1 cursor-pointer rounded-lg p-1 hover:bg-neutral-50"
    >
      {props.children}
    </li>
  )
}

export default function TableHeaderSelect(props) {
  const [clickValue, setClickValue] = useState('')
  const [show, setShow] = useState(false)

  const getClickValue = (value) => {
    setClickValue(value)
    props.setTableOrder(value)
  }

  const getClickedHeaderName = (value) => {
    props.getClickedHeaderName(value)
  }

  // getClickValue : 클릭한 order값 (asc, desc)
  // getClickedHeaderName : 클릭한 헤더 row의 name 값

  useEffect(() => {
    setShow(props.openSelect)
  }, [props.openSelect])

  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
    >
      <ul className="absolute top-12 z-50 ml-[2px] mt-[2px] w-20  rounded-lg border border-slate-200 bg-white">
        <List
          headerName={props.headerName}
          getClickValue={getClickValue}
          getClickedHeaderName={getClickedHeaderName}
        >
          Asc
        </List>
        <List
          headerName={props.headerName}
          getClickValue={getClickValue}
          getClickedHeaderName={getClickedHeaderName}
        >
          Desc
        </List>
      </ul>
    </Transition>
  )
}
