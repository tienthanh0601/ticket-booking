import { BsFillRecordCircleFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import React, { useState } from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import SelectTrip from './SelectTrip'

const Trip = ({data}) => {
  const [isShowSelect, setIsShowSelect] = useState(false)

  const handleHideShow = () => {
    setIsShowSelect(!isShowSelect)
  }
  return (
    <div className="trip">
      <div className="">
        <div className="time-trip">
          <span className="time">10:15</span>
          <div className="fulltime">
            <BsFillRecordCircleFill className="icon-station" />
            <span className="boder-doten"></span>
            <span className="time-1 ">20 giờ</span>
            <span className="boder-doten"></span>
            <HiLocationMarker className="icon-place" />
          </div>
          <span className="time">20:15</span>
        </div>
        <div className="station">
          <div className="station-left">
            <span className="fz">Bến Xe Trung Tâm Đà Nẵng</span>
          </div>
          <div className="station-right">
            <span className="fz">Bến Xe Miền Tây</span>
          </div>
        </div>
        <div className="divide"></div>
        <div className="description-trip">
          <div className="">
            <span className="text-price">400.000đ</span>
            <span className="text-ver">Giường</span>
            <span className="text-price">28 chỗ trống</span>
          </div>
          <div className="">
            {isShowSelect === false && (
              <Button onClick={handleHideShow} type="primary">
                Chọn chuyến
              </Button>
            )}
            {isShowSelect === true && (
              <Button
                style={{ background: 'red' }}
                onClick={handleHideShow}
                type="primary"
              >
                Đóng
              </Button>
            )}
          </div>
        </div>
      </div>
      {isShowSelect === true && <SelectTrip />}
    </div>
  )
}

export default Trip
