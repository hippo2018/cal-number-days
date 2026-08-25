const GetMondayOfWeek = (firstDayOfMonth, weekNumber) => {
  const daysInWeek = 7; // 1週間の日数

  const mondayOfWeek = (firstDayOfMonth < 2)
    ? (weekNumber * daysInWeek) - 5 - firstDayOfMonth
    : (weekNumber * daysInWeek) + 2 - firstDayOfMonth;

  return mondayOfWeek;
};

export default GetMondayOfWeek;