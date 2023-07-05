import React from 'react'
import { Transition } from '@windmill/react-ui'

import { List } from '@/components/ui/table/table-header-select'

function TableBodySelect() {
  const [clickValue, setClickValue] = useState('')
  const [show, setShow] = useState(false)

  const getClickValue = (value) => {
    setClickValue(value)
    props.setTableOrder(value)
  }

  const getClickedColumn = (value) => {
    props.getClickedColumn(value)
  }

  // getClickValue : 클릭한 order값 (Delete, Edit)
  // getClickedHeaderName : 클릭한 column의 name 값

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
          getClickedColumn={getClickedColumn}
        >
          Asc
        </List>
        <List
          headerName={props.headerName}
          getClickValue={getClickValue}
          getClickedColumn={getClickedColumn}
        >
          Desc
        </List>
      </ul>
    </Transition>
  )
}

export default TableBodySelect
