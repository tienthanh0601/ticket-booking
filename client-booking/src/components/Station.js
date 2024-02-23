import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Input, Radio, Space } from 'antd'
import { CompassFilled } from '@ant-design/icons'
import '../scss/station.scss'

const getPointInfo = (id, points) => {
  const find = points.find((x) => x._id === id)
  return find
}

const Station = ({
  trip,
  points,
  pickedPoint,
  handleChangePickedPoint,
  droppedPoint,
  handleChangeDroppedPoint
}) => {
  return (
    <div className="pick-station">
      <Row>
        {trip.points.map((point) => (
          <>
            <Col span={12}>
              <div className="header-point">
                <span>Điểm đón</span>
              </div>
              <Radio
                onChange={handleChangePickedPoint}
                value={{
                  pickUpPointId: point.PickUpPointId,
                  timePickUp: point.timePickUp
                }}
              >
                <div className="">
                  <b>
                    {' '}
                    {new Date(point.timePickUp).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })}
                  </b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      {getPointInfo(point.PickUpPointId, points).address}
                    </span>
                  </div>
                </div>
              </Radio>
            </Col>
            <Col span={12}>
              <div className="header-point">
                <span>Điểm trả</span>
              </div>
              <Radio
                onChange={handleChangeDroppedPoint}
                value={{
                  DropOffPointId: point.DropOffPointId,
                  timeDropOff: point.timeDropOff
                }}
              >
                <div className="">
                  <b>
                    {' '}
                    {new Date(point.timeDropOff).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })}
                  </b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      {getPointInfo(point.DropOffPointId, points).address}
                    </span>
                  </div>
                </div>
              </Radio>
            </Col>
          </>
        ))}
      </Row>
    </div>
  )
}

export default Station
