export const Today = () => {
    const today = new Date();
    const year = today.getFullYear(); // 年
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月（0-11の範囲なので+1する）
    const day = String(today.getDate()).padStart(2, '0'); // 日
    return [year, month, day];
}