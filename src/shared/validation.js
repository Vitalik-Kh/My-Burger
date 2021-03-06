
const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.replace(/\s/g, '').length >=rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.replace(/\s/g, '').length <=rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
}

export default checkValidity;
