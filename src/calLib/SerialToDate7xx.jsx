import DateToSerial from "./DateToSerial";

const SerialToDate7xx = (serial) => {
  let serial2, serial3;
  let year, month, day;
  if (serial < -58) return [0, 0, 0];
  serial2 = serial + 366 - 91;
  year = Math.floor(serial2 / 366);
  month = 3;
  if (year == 0) month = 1;
  day = 1;
  while (true) {
      serial3 = DateToSerial(year, month, day);
      if (serial == serial3) { return [year, month, day];
      } else if (serial > serial3) { year++;
      } else { year--; break;
      }
  }
  month += Math.floor((serial - DateToSerial(year, month, day)) / 31);
  while (true) {
      if (month > 12) { year++; month -= 12; }
      serial3 = DateToSerial(year, month, day);
      if (serial == serial3) { return [year, month, day];
      } else if (serial > serial3) { month = month + 1;
      } else {
          month = month - 1;
          if (month == 0) { year = year - 1; month = 12; }
          break;
      }
  }
  day = day + serial - DateToSerial(year, month, day);
  return [year, month, day];
}

export default SerialToDate7xx;