import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  TimePicker,
  message,
  notification
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import pointApi from '../../api/PointApi'
import StationApi from '../../api/StationApi'
import vehicleApi from '../../api/VehicleApi'
import tripApi from '../../api/tripApi'
import { format } from 'date-fns'
const { Option } = Select
dayjs.extend(customParseFormat)

const AddTrip = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [pointList, setPointList] = useState([])
  const [stationList, setStationList] = useState([])
  const [vehicleList, setVehicleList] = useState([])

  useEffect(() => {
    const fetchPoint = async () => {
      const pointList = await pointApi.getAll()
      setPointList(pointList.data)
    }
    fetchPoint()
  }, [])

  useEffect(() => {
    const fetchStation = async () => {
      const stationList = await StationApi.getAll()
      setStationList(stationList.data)
    }
    fetchStation()
  }, [])

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleList = await vehicleApi.getAll()
      setVehicleList(vehicleList.data)
    }
    fetchVehicle()
  }, [])

  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'

  const handleCreate = async (values) => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    // Your existing code...

    messageApi.open({
      key,
      type: 'success',
      content: 'Loaded!',
      duration: 2
    })
    if (values.from === values.to) {
      notification.error({
        message: 'Lỗi',
        description: 'Điểm xuất phát và điểm đến không thể giống nhau.'
      })
      return // Kết thúc hàm nếu có lỗi
    }
    const data = {
      from: values.from,
      to: values.to,
      day: values.day,
      timeStart: values.timeStart,
      timeEnd: values.timeEnd,
      vehicle: values.vehicle,
      points: values.points
    }
    console.log(data)
    await tripApi.create(data)
    navigate('/admin/trip')
    message.success('Tạo tài chuyến xe mới thành công')
  }

  const renderPickPoint = () => {
    return pointList.map((item, index) => {
      return { label: `${item.name}-${item.address}`, value: item._id }
    })
  }

  const renderPickVehicle = () => {
    return vehicleList.map((item, index) => {
      return { label: `${item.name}`, value: item._id }
    })
  }

  const renderPickStation = () => {
    return stationList.map((item, index) => {
      return { label: `${item.name}-${item.address}`, value: item._id }
    })
  }

  return (
    <div className="add-trip">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: <a href="trip">Danh sách chuyến xe</a>
          },
          {
            title: 'Tạo chuyến xe mới'
          }
        ]}
      />
      <Form form={form} name="info-trip" onFinish={handleCreate}>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="from"
              label="Chọn điểm xuất phát"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                options={renderPickStation()}
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="to"
              label="Chọn điểm đến"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                options={renderPickStation()}
                allowClear
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              name="vehicle"
              label="Chọn xe khởi hành"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                options={renderPickVehicle()}
                placeholder="Select a option and change input text above"
                // onChange={onGenderChange}
                allowClear
              ></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={8}>
            <Form.Item
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Please select time!'
                }
              ]}
              name="day"
              label="Chọn ngày khởi hành"
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Please select time!'
                }
              ]}
              name="timeStart"
              label="Thời gian khởi hành"
            >
              <TimePicker format="HH:mm:ss" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Please select time!'
                }
              ]}
              name="timeEnd"
              label="Thời gian kết thúc"
            >
              <TimePicker format="HH:mm:ss" />
            </Form.Item>
          </Col>
        </Row>

        {/* Form chon diem don diem tra */}
        <Row>
          <Col span={24}>
            <Form.List name="points">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Điểm Đón"
                            name={[name, 'PickUpPointId']}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: 'Thiếu Điểm Đến!'
                              }
                            ]}
                          >
                            <Select options={renderPickPoint()}></Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Thời gian đón"
                            name={[name, 'timePickUp']}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: 'Thiếu Ngày Ngày Xuất!'
                              }
                            ]}
                          >
                            <TimePicker
                            //  disabledHours={getDisabledHoursStartTime}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Điểm Trả"
                            name={[name, 'DropOffPointId']}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: 'Thiếu Điểm Đến!'
                              }
                            ]}
                          >
                            <Select options={renderPickPoint()}></Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Thời gian trả"
                            name={[name, 'timeDropOff']}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: 'Thiếu Ngày Ngày Xuất!'
                              }
                            ]}
                          >
                            <TimePicker
                            //  disabledHours={getDisabledHoursEndTime}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddTrip
