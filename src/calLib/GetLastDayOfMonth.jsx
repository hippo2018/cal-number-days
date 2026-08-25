import IsLeapYear from "./IsLeapYear";
/*  月の最終日を返す */
const GetLastDayOfMonth = (month, year = 1) => {
  if(month == 2) return 28 + IsLeapYear(year);
  month += month < 3 ? 12 : 0;
  return (
      Math.floor((13 * (month + 1) + 3) / 5) -
      Math.floor((13 * month + 3) / 5) +
      7 * 4
  );
};

export default GetLastDayOfMonth;