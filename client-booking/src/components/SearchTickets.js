import React from 'react'
import { Select, DatePicker, Space } from 'antd'
import { BsFillRecordCircleFill, BsFillCalendarWeekFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import '../scss/searchticket.scss'
import Loading from './Loading'

const SearchTickets = ({
  handleChangeDate,
  handleChangeFrom,
  handleChangeTo,
  handleSearch,
  to,
  from,
  provinceList,
  date
}) => {
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const renderProvince = () => {
    return provinceList.map((item, index) => {
      return { label: `${item.name}`, value: item._id }
    })
  }

  return (
    <div className="search-booking">
      <div className="search-form">
        <div className="form-input">
          <div>
            <BsFillRecordCircleFill className="icon-start" />
          </div>
          <div className="form-label">
            <span className="station-name">Place of origin</span>
            <Select
              className="select-form"
              bordered={false}
              defaultValue={from.name}
              value={from._id}
              onChange={(e) => handleChangeFrom(e)}
              suffixIcon={null}
              showSearch
              filterOption={filterOption}
              options={renderProvince()}
            />
          </div>
        </div>
        <div className="form-input-2">
          <div>
            <HiLocationMarker className="icon-end" />
          </div>
          <div className="form-label">
            <span className="station-name">Destination</span>
            <Select
              className="select-form"
              showSearch
              defaultValue={to.name}
              value={to._id}
              onChange={(e) => handleChangeTo(e)}
              bordered={false}
              suffixIcon={null}
              filterOption={filterOption}
              options={renderProvince()}
            />
          </div>
        </div>
        <div className="form-input-3">
          <div>
            <BsFillCalendarWeekFill className="icon-day" />
          </div>
          <div className="form-label">
            <span className="station-name">Departure date</span>
            <Space direction="vertical">
              <DatePicker
                className="pick-date"
                bordered={false}
                suffixIcon={null}
                allowClear={false}
                format="DD-MM-YYYY"
                value={date}
                onChange={handleChangeDate}
              />
            </Space>
          </div>
        </div>

        <button onClick={handleSearch} className="btn-search">
          Tìm kiếm
        </button>
      </div>
    </div>
  )
}

export default SearchTickets
