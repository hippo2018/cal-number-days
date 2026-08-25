export const For = (year, month, day, sep = '-') => {
    return String(year) + sep + String(month).padStart(2, '0') + sep + String(day).padStart(2, '0');
};

export const NotFor = (day, sep = '-') => {
    return day.split(sep);
}