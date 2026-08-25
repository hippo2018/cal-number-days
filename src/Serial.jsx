const IsLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/*  年月日をシリアル値に */
export const ToSerial = (nen, tuki = 1, hi = 1) => {
    // const dateStr = "2023-02-02";
    // const dateArray = hiduke.split("-");
    nen = nen * 1;
    tuki = tuki * 1;
    hi = hi * 1;
    // 一月二月は
    nen -= tuki < 3 ? 1 : 0;
    tuki += tuki < 3 ? 12 : 0;
    return (
        (
            nen * 365 +
            Math.floor(nen / 4) -
            Math.floor(nen / 100) +
            Math.floor(nen / 400)
        ) +
        (
            Math.floor((13 * tuki + 3) / 5) +
            (tuki - 3) * 28 -
            8
        ) +
        hi + 59);
};


export const FromSerial = (serial) => {
    // let year = 0;
    let year = Math.floor(serial / 366);
    // serial -= ToSerial(year, 1, 1);
    serial -= ToSerial(year);
    while (serial >= 365 + IsLeapYear(year)) {
        serial -= 365 + IsLeapYear(year);
        year++;
    }
    let month = 1;
    while (true) {
        let daysInMonth;
        if (month === 2) {
            daysInMonth = IsLeapYear(year) ? 29 : 28;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }
        if (serial < daysInMonth) {
            break;
        }
        serial -= daysInMonth;
        month++;
    }
    const day = serial + 1;
    return [year, month, day];
};