export const removeEmptyValuesFromObj = (object) => {
  Object.entries(object).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmptyValuesFromObj(val)
    } else if (val === '') {
      delete object[key]
    }

    if (
      (val && typeof val === 'object' && !Object.keys(val).length) ||
      val === null ||
      val === undefined
    ) {
      if (Array.isArray(object)) {
        object.splice(key, 1)
      } else {
        delete object[key]
      }
    }
  })
  return object
}
