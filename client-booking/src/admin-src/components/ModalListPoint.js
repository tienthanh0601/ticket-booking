import React from 'react'
import { Modal, Select } from 'antd'
const ModalListPoint = ({
  isOpen,
  handleToogle,
  selectedItems,
  setSelectedItems,
  filteredOptions,
  handleUpdatePoint
}) => {
  return (
    <>
      <Modal
        title="Điểm đón / Trả của bến xe"
        centered
        open={isOpen}
        onOk={handleUpdatePoint}
        onCancel={handleToogle}
        width={1000}
      >
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{
            width: '100%'
          }}
          options={filteredOptions?.map((item) => ({
            value: item._id,
            label: item.name
          }))}
        />
      </Modal>
    </>
  )
}

export default ModalListPoint
