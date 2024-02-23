import React, { useState } from 'react'
import '../scss/search.scss'
import { Radio } from 'antd'
const SideBar = () => {
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div className="sidebar">
      <h2>Sắp xếp</h2>
      <Radio.Group onChange={onChange} value={value}>
        <Radio className='radio-check' value={1}>Mặc định</Radio>
        <Radio className='radio-check' value={2}>Giờ đi sớm nhất</Radio>
        <Radio className='radio-check' value={3}>Giờ đi muộn nhất</Radio>
        <Radio className='radio-check' value={4}>Giá tăng dần</Radio>
        <Radio className='radio-check' value={5}>Giá giảm dần</Radio>
      </Radio.Group>
    </div>
  )
}

export default SideBar
