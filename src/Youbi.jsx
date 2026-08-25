/*  曜日を返す */
export const Youbi = (nen, tuki = 1, hi = 1) => {
    nen = nen * 1;
    tuki = tuki * 1;
    hi = hi * 1;
    // 一月二月は
    nen -= tuki < 3 ?  1 : 0;
    tuki += tuki < 3 ?  12: 0;
    // 日曜日は0 土曜日は6
    return (
        (
            nen
            + Math.floor(nen / 4)
            - Math.floor(nen / 100)
            + Math.floor(nen / 400)
            + Math.floor((13 * tuki + 8) / 5)
            + hi
        ) % 7
    );
};

export const Moon = (nnn) => {
    const syu = ['日', '月', '火', '水', '木', '金', '土'];
    return syu[nnn];
}