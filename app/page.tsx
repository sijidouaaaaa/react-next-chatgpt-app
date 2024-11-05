import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <main className="bg-yellow-500 p-10">
     <h1>Hello World</h1>
     
     {
      React.createElement('h1', null, 'Hello World')
     }
    </main>
  )
}
