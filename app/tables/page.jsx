'use client'

import React, { useCallback, useEffect, useState } from 'react'
import moreSelect from '@/app/tables/more-select.svg'
import Image from '@/node_modules/next/image'

import Card from '@/components/ui/card'
import Table, { BodyTd, BodyTr, FootTd } from '@/components/ui/table/table'

export default function Tablepage() {
  const dummyHeader = [
    { id: 0, name: 'Invoice', selectOrder: false },
    { id: 1, name: 'Status', selectOrder: false },
    { id: 2, name: 'Method', selectOrder: false },
    { id: 3, name: 'Amount', selectOrder: false },
  ]

  const dummyHeader2 = [
    { id: 0, name: 'Invoice', selectOrder: false },
    { id: 1, name: 'Status', selectOrder: false },
    { id: 2, name: 'Method', selectOrder: false },
    { id: 3, name: 'Amount', selectOrder: true },
    { id: 4, name: 'Date', selectOrder: false },
    { id: 5, name: '', selectOrder: false },
  ]

  const dummyBody = [
    {
      Invoice: 'INV001',
      Status: 'Paid',
      Method: 'Credit Card',
      Amount: '$150.00',
    },
    {
      Invoice: 'INV002',
      Status: 'Pending',
      Method: 'PayPal',
      Amount: '$50.00',
    },
    {
      Invoice: 'INV003',
      Status: 'Unpaid',
      Method: 'Credit Card',
      Amount: '$250.00',
    },
    {
      Invoice: 'INV004',
      Status: 'Paid',
      Method: 'Bank Transfer',
      Amount: '$350.00',
    },
  ]

  const dummyBody2 = [
    {
      Invoice: 'INV001',
      Status: 'Paid',
      Method: 'Credit Card',
      Amount: '150.00',
      Date: '12.Jan.2023',
    },
    {
      Invoice: 'INV002',
      Status: 'Pending',
      Method: 'PayPal',
      Amount: '50.00',
      Date: '12.Jan.2023',
    },
    {
      Invoice: 'INV003',
      Status: 'Unpaid',
      Method: 'Credit Card',
      Amount: '250.00',
      Date: '12.Jan.2023',
    },
    {
      Invoice: 'INV004',
      Status: 'Paid',
      Method: 'Bank Transfer',
      Amount: '350.00',
      Date: '12.Jan.2023',
    },
  ]

  const [rowOrder, setRowOrder] = useState('')
  const [clickRowName, setClickRowName] = useState('')
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
          <BodyTd cursor={true}>
            <Image
              alt="more menu icon"
              width={20}
              height={20}
              src={moreSelect}
            />
          </BodyTd>
        </BodyTr>
      ) : (
        <BodyTr key={item.Invoice}>
          <FootTd>{item.Invoice}</FootTd>
          <FootTd>{item.Status}</FootTd>
          <FootTd>{item.Method}</FootTd>
          <FootTd>{item.Amount}</FootTd>
          <FootTd>{item.Date}</FootTd>
          <FootTd cursor={true}>
            <Image
              alt="more menu icon"
              width={20}
              height={20}
              src={moreSelect}
            />
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
        </Card>
      </div>
    </div>
  )
}
