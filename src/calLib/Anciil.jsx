import DateToSerial from "./DateToSerial";

const Anciil = (year, month, day) => {
  // const ansiDay = DateToSerial(2004, 5, 5);      // 安侍日施行
  if (DateToSerial(year, month, day) >= DateToSerial(2004, 5, 5)) {
  const year2 = (month < 3) ? year - 1 : year;
  const month2 = (month < 3) ? month + 12 : month;
  return ((year2 * 5 + Math.floor(year2 / 4) - Math.floor(year2 / 100) + Math.floor(year2 / 400) + Math.floor((33 * month2 + 3) / 5)) + day) % 8;
}
return 99;
}

export default Anciil;