import { Button, message, Space } from 'antd'

const success = () => {
  message.success('This is a success ')
}

const error = () => {
  message.error('This is an error ')
}

const warning = () => {
  message.warning('This is a warning ')
}

export { success, error, warning }
