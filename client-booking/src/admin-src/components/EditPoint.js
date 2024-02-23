import React from 'react'
import '../../scss/edituser.scss'
import { Modal } from 'antd'
const EditPoint = ({
  handleUpdate,
  isShowModal,
  handleChangeName,
  handleChangeAddress,
  name,
  address,
  handleCloseEdit
}) => {
  const handleOk = () => {
    handleUpdate()
    handleCloseEdit()
  }
  return (
    <div>
      <Modal
        title="Edit Point"
        open={isShowModal}
        onOk={handleOk}
        onCancel={handleCloseEdit}
      >
        <div className="input-edit">
          <span>Name :</span>
          <input
            className="input-css"
            value={name}
            onChange={handleChangeName}
            type="text"
          />
        </div>
        <div className="input-edit">
          <span>Address :</span>
          <input value={address} onChange={handleChangeAddress} type="text" />
        </div>
      </Modal>
    </div>
  )
}

export default EditPoint
