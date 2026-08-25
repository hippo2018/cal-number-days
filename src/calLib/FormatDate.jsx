const FormatDate = (year, month, day, separator = '-') => {
  // return y + sep + ((m < 10) ? '0' + m : m) + sep + ((d < 10) ? '0' + d : d)
  return year + separator + ((month < 10) ? '0' + month : month) + separator + ((day < 10) ? '0' + day : day)
}

export default FormatDate;