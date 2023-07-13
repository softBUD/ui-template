import React from 'react'

export default function Card(props) {
  return (
    <div className="relative flex w-full min-w-0 flex-col break-words rounded-lg bg-white p-5 shadow-lg">
      {props.children}
    </div>
  )
}
