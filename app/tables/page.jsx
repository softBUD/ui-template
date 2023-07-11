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
  const [tableBody2, setTableBody2] = useState()

  const [columnNumber, setColumnNumber] = useState()

  const TableBody = dummyBody.map((item, index) =>
    index < dummyBody.length - 1 ? (
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

  function TableBody2(props) {
    const arrayLength = props.data.length - 1
    // 테이블에서 마지막 열만 아래에 border가 없는 스타일
    return props.data.map((item, index) =>
      index < arrayLength ? (
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

  useEffect(() => {
    function setTableOrder() {
      const Amount = clickRowName === 'Amount'

      if (Amount && rowOrder === 'Asc') {
        const array = [...data2]
        const data = array.sort((a, b) => Number(a.Amount) - Number(b.Amount))
        setData2(data)
      }

      if (Amount && rowOrder === 'Desc') {
        const array = [...data2]
        const data = array.sort((a, b) => Number(b.Amount) - Number(a.Amount))
        setData2(data)
      }
    }
    setTableOrder()

    // array를 deps에 추가하면 무한으로 리렌더링 되서 error발생. 해당 deps만 무시하도록 한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickRowName, rowOrder])

  useEffect(() => {
    function setTableColumn() {
      if (columnNumber) {
        const array = [...dummyBody2]
        const newbody = array.filter((item, index) => index < columnNumber)

        setData2(newbody)
      }
    }
    setTableColumn()
  }, [columnNumber])

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-100">
      <div className="max-w-2xl pl-[16px] pt-[16px]">
        <Card>
          <h2 className="pl-2.5 font-bold">테이블</h2>
          <Table headerCell={dummyHeader}>{TableBody}</Table>
        </Card>
      </div>
      <div className="max-w-2xl pb-[16px] pl-[16px] pt-[16px]">
        <Card>
          <h2 className="pl-2.5 font-bold">클릭 헤더 테이블</h2>
          <Table
            headerCell={dummyHeader2}
            setTableOrder={(order) => setRowOrder(order)}
            getClickedHeaderName={(name) => setClickRowName(name)}
          >
            <TableBody2 data={data2} />
          </Table>
          <div className="flex justify-end">
            <Select
              defaultValue={10}
              contents={['10', '20', '30']}
              listBoxPosition="top"
              getClickValue={(number) => setColumnNumber(number)}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
