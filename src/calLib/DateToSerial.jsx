/*  年月日をシリアル値に */
const DateToSerial = (year, month, day) => {
  // 一月二月は
  year -= month < 3 ?  1 : 0;
  month += month < 3 ?  12: 0;
  return (
      (
          year * 365 + 
          Math.floor(year / 4) - 
          Math.floor(year / 100) + 
          Math.floor(year / 400)
      ) + 
      (
          Math.floor((13 * month + 3) / 5) + 
          (month - 3) * 28 - 
          8
      ) + 
      day);
};

export default DateToSerial;