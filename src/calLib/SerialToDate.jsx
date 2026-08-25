import IsLeapYear from "./IsLeapYear";
/*  シリアル値を年月日に */
const SerialToDate = (serial) => {
  serial -= 1;
  let year3 = 
      Math.floor(
          (
              serial - 
              Math.floor((serial / 365) / 4) + 
              Math.floor((serial / 365) / 100) - 
              Math.floor((serial / 365) / 400)) / 365
          );
  let leftover = 
      serial - 
      (
          year3 * 365 + 
          Math.floor(year3 / 4) - 
          Math.floor(year3 / 100) + 
          Math.floor(year3 / 400)
      );
  leftover += 1;
  let month3 = Math.floor((5 * (leftover + 0.8) + 452) / 153);
  let day3 = 
      leftover - 
      (
          Math.floor((13 * month3 + 3) / 5) + 
          (month3 - 3) * 28 - 
          8
      );
  if (month3 > 12) {year3 += 1; month3 -= 12;}
  if (day3 == 29 && month3 == 2 && IsLeapYear(year3) == 0) {
      month3 = 3; day3 = 1;
  }
  return ([year3, month3, day3]);
};

export default SerialToDate;