'use client'

import React, { useState } from 'react'
import { Transition } from '@windmill/react-ui'

export function List(props) {
  const getClickedButton = (value) => {
    props.value(value)
  }

  const getClickValue = (value) => {
    props.getClickValue(value)
  }

  return (
    <li
      onClick={() => {
        getClickValue(props.children)
        getClickedButton(props.headerName)
      }}
      className="m-1 cursor-pointer rounded-lg p-1 hover:bg-neutral-50"
    >
      {props.children}
    </li>
  )
}

// select box는 table-header-select 코드 복붙상태. 구현안됨 아직
export default function Select(props) {
  // 셀렉트 박스 구현부
}
