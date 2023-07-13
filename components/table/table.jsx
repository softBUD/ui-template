'use client'

import React, { useEffect, useState } from 'react'
import moreSelect from '@/assets/more-select.svg'
import Image from '@/node_modules/next/image'

import TableBodySelect from '@/components/table/table-body-select'

import TableHeaderSelect from './table-header-select'

function TableHead(props) {
  // openSelect : 헤더 클릭 여부
  // clickedHeaderName : 테이블에서 클릭한 헤더 row의 name 값
  const [openSelect, setOpenSelect] = useState(false)
  const [clickedHeaderName, setClickedHeaderName] = useState('')

  // 클릭한 헤더와 셀렉트박스에 할당된 name 두값이 같아야 open

  return (
    <>
      <tr className="relative hover:bg-neutral-50">
        {props.content.map((item) =>
          item.selectOrder ? (
            <td key={item.name} className="pb-3 pt-3">
              {clickedHeaderName === item.name && (
                <TableHeaderSelect
                  openSelect={openSelect}
                  getClickedHeaderName={(text) => {
                    setClickedHeaderName(text)
                    props.getClickedHeaderName(text)
                  }}
                  headerName={item.name}
                  setTableOrder={(text) => {
                    props.setTableOrder(text)
                    setOpenSelect(!openSelect)
                  }}
                />
              )}
              <span
                onClick={(e) => {
                  setOpenSelect(!openSelect)
                  setClickedHeaderName(e.currentTarget.innerText)
                }}
                className="max-w-fit cursor-pointer whitespace-nowrap rounded-lg pb-2 pl-2.5 pr-2.5 pt-2 hover:bg-neutral-200"
              >
                {item.name}
              </span>
            </td>
          ) : (
            <td
              key={item.name}
              className="cursor-default pb-2 pl-2.5 pr-2.5 pt-2"
            >
              {item.name}
            </td>
          )
        )}
      </tr>
    </>
  )
}

//테이블 tr
export function BodyTr(props) {
  return <tr className="hover:bg-neutral-50">{props.children}</tr>
}

// 테이블 td 커서 유무에따라 포인터 커서 설정
export function BodyTd(props) {
  return props.cursor ? (
    <td className="border-b-slate cursor-pointer border-b pb-3 pl-2.5 pt-3 ">
      {props.children}
    </td>
  ) : (
    <td className="border-b-slate border-b pb-3 pl-2.5 pt-3 ">
      {props.children}
    </td>
  )
}

// 클릭시 edit/delete select바 노출
export function BodySelectTd(props) {
  const [openSelect, setOpenSelect] = useState(false)
  return (
    <td
      onClick={(e) => setOpenSelect(!openSelect)}
      className="border-b-slate cursor-pointer border-b pb-3 pl-2.5 pt-3 "
    >
      <TableBodySelect openSelect={openSelect} />
    </td>
  )
}

export function FootSelectTd(props) {
  const [openSelect, setOpenSelect] = useState(false)
  return (
    <td
      onClick={(e) => setOpenSelect(!openSelect)}
      className="cursor-pointer pb-3 pl-2.5 pt-3 "
    >
      <TableBodySelect
        openSelect={openSelect}
        listBoxPosition={props.listBoxPosition}
      />
    </td>
  )
}

// 테이블 foot, td 마지막행
export function FootTd(props) {
  return props.cursor ? (
    <td className="cursor-pointer pb-2 pl-2.5 pt-2">{props.children}</td>
  ) : (
    <td className="pb-2 pl-2.5 pt-2">{props.children}</td>
  )
}

export default function Table(props) {
  return (
    <table className="mt-3">
      <thead className="border-b-slate max-h-[40px] border-b font-medium text-slate-500  hover:bg-neutral-50">
        <TableHead
          content={props.headerCell}
          setTableOrder={(text) => props.setTableOrder(text)}
          getClickedHeaderName={(text) => props.getClickedHeaderName(text)}
        />
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  )
}
