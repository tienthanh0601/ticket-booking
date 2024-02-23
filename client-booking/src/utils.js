const isJsonString = (data) => {
  try {
    JSON.parse(data)
  } catch (error) {
    return false
  }
  return true
}

export default isJsonString