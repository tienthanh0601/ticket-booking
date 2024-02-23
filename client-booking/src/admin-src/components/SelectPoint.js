import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Select, TimePicker } from 'antd'
import React from 'react'

const SelectPoint = () => {
  return (
    <div>
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Form.List name="listTimePoint">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Điểm Đón"
                        name={[name, 'PickupPointId']}
                        {...restField}
                        rules={[
                          {
                            required: true,
                            message: 'Thiếu Điểm Đến!'
                          }
                        ]}
                      >
                        <Select></Select>
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
                        <TimePicker />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Điểm Trả"
                        name={[name, 'DropoffPointId']}
                        {...restField}
                        rules={[
                          {
                            required: true,
                            message: 'Thiếu Điểm Đến!'
                          }
                        ]}
                      >
                        <Select></Select>
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
                        <TimePicker />
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
        <Form.Item>
          <Button
            htmlType="submit"
            // onClick={() => {
            //   prev()
            // }}
          >
            Quay Lại
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => {
            //   next()
            // }}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SelectPoint
