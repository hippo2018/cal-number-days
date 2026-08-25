/*  曜日を返す */
const GetDayOfWeek = (year, month = 1, day = 1) => {
  // 一月二月は
  year -= month < 3 ?  1 : 0;
  month += month < 3 ?  12: 0;
  // 日曜日は0 土曜日は6
  return (
      (
          year
          + Math.floor(year / 4)
          - Math.floor(year / 100)
          + Math.floor(year / 400)
          + Math.floor((13 * month + 8) / 5)
          + day
      ) % 7
  );
};

export default GetDayOfWeek;