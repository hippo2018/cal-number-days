import DateToSerial from "./DateToSerial";
/*  シリアル値を年月日に */
const SerialToDate7 = (serial) => {
  if (serial < -59) return ([0, 0, 0]);
  const serial2 = serial + 366 - 91;
  let year = Math.floor(serial2 / 366);
  let month = 3;
  if (year == 0) month = 1;
  let day = 1;
  let serial3;

  while (true) {
      serial3 = DateToSerial(year, month, day);
      if (serial == serial3) { return ([year, month, day]);
      } else if (serial > serial3) { year++;
      } else { year--; break; }
  }
  month += Math.floor((serial - DateToSerial(year, month, day)) / 31);
  while (true) {
      if (month > 12) { year++; month -= 12; }
      serial3 = DateToSerial(year, month, day);
      if (serial == serial3) { return ([year, month, day]);
      } else if (serial > serial3) { month++;
      } else {
          month--;
          if (month == 0) { year--; month = 12; }
          break;
      }
  }
  day += serial - DateToSerial(year, month, day);
  return ([year, month, day]);
}

export default SerialToDate7;