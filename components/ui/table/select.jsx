import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Image from '@/node_modules/next/image'
import { Transition } from '@windmill/react-ui'

import DownUparrow from '@/components/ui/table/arrow-down-up.svg'

export const List = forwardRef(function List(props, ref) {
  return (
    <li
      ref={ref}
      onClick={(e) => {
        props.getClickValue(props.children)
      }}
      className="m-1 cursor-pointer rounded-lg p-1 hover:bg-neutral-50"
    >
      {props.children}
    </li>
  )
})

export default function Select(props) {
  const eventEl = useRef(null)
  const [clickValue, setClickValue] = useState('')
  const [show, setShow] = useState(false)

  const getClickValue = (value) => {
    setClickValue(value)
    setShow(false)
  }

  // defaultValue: 기본 셀렉트박스 값, default value가 노출
  // contents : 셀렉트 박스 리스트 항목들 []
  // listBoxPosition : "top" of "bottom" 값 입력, 리스트 노출되는 위치가 상단/하단
  const handleClickOutside = (e) => {
    if (eventEl.current && !eventEl.current.contains(e.target)) {
      setShow(false)
    }
  }

  window.addEventListener('click', handleClickOutside)

  return (
    <div
      ref={eventEl}
      className="w-20 cursor-pointer rounded border border-slate-200 p-1 pl-2"
    >
      <Transition
        show={show}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
      >
        <ul
          className={`${
            props.listBoxPosition === 'top'
              ? 'absolute bottom-[56px] right-[19px]'
              : 'absolute'
          } && z-50 w-20 rounded-lg border border-slate-200 bg-white font-medium text-slate-500`}
        >
          {props.contents.map((item) => (
            <List key={item} getClickValue={getClickValue}>
              {item}
            </List>
          ))}
        </ul>
      </Transition>
      <div className="flex flex-row" onClick={(e) => setShow(!show)}>
        {clickValue ? clickValue : props.defaultValue}

        <div className="ml-8 mt-1">
          <Image src={DownUparrow} width={15} height={15} alt="up arrow" />
        </div>
      </div>
    </div>
  )
}
