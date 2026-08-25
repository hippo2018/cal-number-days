/*  うるう年の時は1を返す */
const IsLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) ? 1 : 0);
export default IsLeapYear;