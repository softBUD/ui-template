import React, { useEffect, useState } from 'react'
import moreSelect from '@/app/tables/more-select.svg'
import Image from '@/node_modules/next/image'
import { Transition } from '@windmill/react-ui'

import { List } from '@/components/ui/table/select'

export default function TableBodySelect(props) {
  const [clickValue, setClickValue] = useState('')
  const [show, setShow] = useState(false)

  const getClickValue = (value) => {
    setClickValue(value)
  }

  useEffect(() => {
    setShow(props.openSelect)
  }, [props.openSelect])

  // getClickValue : 클릭한 order값 (Delete, Edit)

  return (
    <div>
      <Image alt="more menu icon" width={20} height={20} src={moreSelect} />
      <Transition
        show={show}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
      >
        <ul className="absolute z-50 w-20 rounded-lg border border-slate-200 bg-white font-medium text-slate-500">
          <List getClickValue={getClickValue}>Edit</List>
          <List getClickValue={getClickValue}>Delete</List>
        </ul>
      </Transition>
    </div>
  )
}
