'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from '@/node_modules/next/image'

import Card from '@/components/ui/card'
import {
  dummyBody,
  dummyBody2,
  dummyHeader,
  dummyHeader2,
} from '@/components/ui/table/dummy-data'
import Select from '@/components/ui/table/select'
import Table, {
  BodySelectTd,
  BodyTd,
  BodyTr,
  FootTd,
} from '@/components/ui/table/table'
import TableBodySelect from '@/components/ui/table/table-body-select'

export default function Tablepage() {
  const [rowOrder, setRowOrder] = useState('')
  const [clickRowName, setClickRowName] = useState('')
  const [openSelect, setOpenSelect] = useState(false)
  const [data2, setData2] = useState([...dummyBody2])

  function TableBody(bodyCell) {
    const tableFoot = bodyCell.length - 1

    return bodyCell.map((item, index) =>
      index < tableFoot ? (
        <BodyTr key={item.Invoice}>
          <BodyTd>{item.Invoice}</BodyTd>
          <BodyTd>{item.Status}</BodyTd>
          <BodyTd>{item.Method}</BodyTd>
          <BodyTd>{item.Amount}</BodyTd>
        </BodyTr>
      ) : (
        <BodyTr key={item.Invoice}>
          <FootTd>{item.Invoice}</FootTd>
          <FootTd>{item.Status}</FootTd>
          <FootTd>{item.Method}</FootTd>
          <FootTd>{item.Amount}</FootTd>
        </BodyTr>
      )
    )
  }

  function TableBody2(bodyCell) {
    const tableFoot = bodyCell.length - 1

    // 테이블에서 마지막 열만 아래에 border가 없는 스타일
    return bodyCell.map((item, index) =>
      index < tableFoot ? (
        <BodyTr key={item.Invoice}>
          <BodyTd>{item.Invoice}</BodyTd>
          <BodyTd>{item.Status}</BodyTd>
          <BodyTd>{item.Method}</BodyTd>
          <BodyTd>{item.Amount}</BodyTd>
          <BodyTd>{item.Date}</BodyTd>
          <BodySelectTd />
        </BodyTr>
      ) : (
        <BodyTr key={item.Invoice}>
          <FootTd>{item.Invoice}</FootTd>
          <FootTd>{item.Status}</FootTd>
          <FootTd>{item.Method}</FootTd>
          <FootTd>{item.Amount}</FootTd>
          <FootTd>{item.Date}</FootTd>
          <FootTd cursor={true}>
            <TableBodySelect />
          </FootTd>
        </BodyTr>
      )
    )
  }

  const setTableOrder = useCallback(() => {
    if (clickRowName === 'Amount' && rowOrder === 'Asc') {
      const array = [...data2]
      const data = array.sort((a, b) => Number(a.Amount) - Number(b.Amount))
      setData2(data)
    }

    if (clickRowName === 'Amount' && rowOrder === 'Desc') {
      const array = [...data2]
      const data = array.sort((a, b) => Number(b.Amount) - Number(a.Amount))
      setData2(data)
    }

    if (clickRowName === 'Date' && rowOrder === 'Asc') {
      const array = [...data2]
      const data = array.sort((a, b) => Number(a.Date) - Number(b.Date))
      setData2(data)
    }

    if (clickRowName === 'Date' && rowOrder === 'Desc') {
      const array = [...data2]
      const data = array.sort((a, b) => Number(a.Date) - Number(b.Date))
      setData2(data)
    }
  }, [clickRowName, rowOrder])

  useEffect(() => {
    setTableOrder()
  }, [setTableOrder])

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-100">
      <div className="max-w-2xl pl-[16px] pt-[16px]">
        <Card>
          <h2 className="pl-2.5 font-bold">테이블</h2>
          <Table headerCell={dummyHeader} bodyCell={TableBody(dummyBody)} />
        </Card>
      </div>
      <div className="max-w-2xl pb-[16px] pl-[16px] pt-[16px]">
        <Card>
          <h2 className="pl-2.5 font-bold">클릭 헤더 테이블</h2>
          <Table
            headerCell={dummyHeader2}
            bodyCell={TableBody2(data2)}
            setTableOrder={(order) => setRowOrder(order)}
            getClickedHeaderName={(name) => setClickRowName(name)}
          />
          <div className="flex justify-end">
            <Select
              defaultValue={10}
              contents={['10', '20', '30']}
              listBoxPosition="top"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
