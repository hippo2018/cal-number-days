//===================================================================
// 春分/秋分日の略算式は
// 『海上保安庁水路部 暦計算研究会編 新こよみ便利帳』
// で紹介されている式です。
const SpringEquinox = (year) =>
{
    let day;

    if (year <= 1947) {
        day = 99;    //祝日法施行前
    } else {
        if (year <= 1979) {
            // Math.floor 関数は[VBAのInt関数]に相当
            day = Math.floor(20.8357 +
                (0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4));
        } else {
            if (year <= 2099) {
                day = Math.floor(20.8431 +
                    (0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4));
            } else {
                if (year <= 2150) {
                    day = Math.floor(21.851 +
                        (0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4));
                } else {
                    day = 99;    //2151年以降は略算式が無いので不明
                }
            }
        }
    }
    return day;
}

export default SpringEquinox;