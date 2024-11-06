"use client"

import React, { use, useState } from 'react'
import Main from '@/components/home/Main'
import Navigation from '@/components/home/Navigation'

export default function Home() {

  const [counter,setCounter]=useState({value:0})  
  const list = [
    {id:1,value:'content1'},
    {id:2,value:'content2'},
  ]
  const handleClick = ()=>{
    // counter.value++
    setCounter((c)=>({ ...c, value: c.value + 1 })) 
    alert("click:"+counter.value)
  }
  return (
    <div className="bg-yellow-500 p-10">
    <button className='bg-blue-500' onClick={handleClick}>按钮</button>
      <Navigation/> 
      <Main counter={counter.value}/>
      counter:{counter.value}
      {
         counter.value ===0?<p> 计数器没有启动</p>:<p> 计数器已经启动{counter.value}</p>
      }
      <ul>
        {list.map((item)=>{
           return <li key={item.id}>{item.value}</li>
        })}
      </ul>
    </div> 
  )
}
