//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/
//_/  --- JavaScript 移植版 ( Update: 2018/12/8 ) ---
//_/
//_/ CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
//_/ ( AddinBox  http://addinbox.sakura.ne.jp/index.htm )
//_/ (   旧サイト  http://www.h3.dion.ne.jp/~sakatsu/index.htm )
//_/
//_/ この祝日判定コードは『Excel:kt関数アドイン』で使用している
//_/ ＶＢＡマクロを[JavaScript]に移植したものです。
//_/
//_/ この関数では以下の祝日変更までサポートしています。
//_/    (a) 2019年施行の「天皇誕生日の変更」 12/23⇒2/23 (補：2019年には[天皇誕生日]はありません)
//_/    (b) 2019年の徳仁親王の即位日(5/1) および
//_/       祝日に挟まれて「国民の休日」となる 4/30(平成天皇の退位日) ＆ 5/2 の２休日
//_/    (c) 2019年の「即位の礼 正殿の儀 (10/22) 」
//_/    (d) 2020年施行の「体育の日の改名」⇒スポーツの日
//_/    (e) 五輪特措法による2020年の「祝日移動」
//_/       海の日：7/20(3rd Mon)⇒7/23, スポーツの日:10/12(2nd Mon)⇒7/24, 山の日：8/11⇒8/10
//_/
//_/ (*1)このコードを引用するに当たっては、必ずこのコメントも
//_/     一緒に引用する事とします。
//_/ (*2)他サイト上で本マクロを直接引用する事は、ご遠慮願います。
//_/    【 http://addinbox.sakura.ne.jp/holiday_logic.htm 】
//_/     へのリンクによる紹介で対応して下さい。
//_/ (*3)[Holiday]という関数名そのものは、各自の環境に
//_/     おける命名規則に沿って変更しても構いません。
//_/
//_/  --- 引数 制限事項 ---
//_/  Holiday にはスラッシュ区切の日付フォーマット(YYYY/M/D)で渡す。
//_/  ハイフン区切の日付フォーマット(YYYY-MM-DD)は不可。
//_/  ( 理由 )
//_/  YYYY-MM-DDは[new Date]の際に UTC に変換される(実行地域での時差が反映される)為、
//_/  Holiday内の日付定数(時刻=0:0:0)と一致しない。
//_/  日本では[+9:00]の時刻が付く。アメリカ西海岸では[-8:00]で前日の日付になる。
//_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
// 2008/10/29 変数のvar指定が無く、広域変数扱いになっていたのを修正しました。
//
// 2014/5/29 「山の日」の祝日法改正
//
// 2015/7/11  JavaScript1.3 以降では[1970/1/1]以前も扱えるため、日付範囲の制限を解除
//
// 2018/2/15 「天皇誕生日の変更」の祝日法改正
//
// 2018/6/21 [体育の日⇒スポーツの日 改名] ＆ [五輪特措法による祝日移動] 改正の修正
//
// 2018/12/8 2019年の即位関連休日の修正
//
// 2018/12/11 先頭コメントに引数制限事項を追記

// var MONDAY = 1;    // [ 日(0), 月(1), … 土(6) ]
// var TUESDAY = 2;
// var WEDNESDAY = 3;
//
// var cstImplementTheLawOfHoliday = new Date("1948/7/20");   // 祝日法施行
// var cstAkihitoKekkon = new Date("1959/4/10");              // 明仁親王の結婚の儀
// var cstShowaTaiso = new Date("1989/2/24");                 // 昭和天皇大喪の礼
// var cstNaruhitoKekkon = new Date("1993/6/9");              // 徳仁親王の結婚の儀
// var cstSokuireiSeiden = new Date("1990/11/12");            // 即位礼正殿の儀(平成天皇)
// var cstImplementTransferHoliday = new Date("1973/4/12");   // 振替休日施行
//
// var cstTaii_Heisei = new Date("2019/4/30");               // 祝日ではなく「国民の休日」です
// var cstSokui_Naruhito = new Date ("2019/5/1");            // 即位の日(徳仁親王)
// var cst2019GW_May2nd = new Date("2019/5/2");              // 祝日ではなく「国民の休日」です
// var cstSokuireiSeiden_Naruhito = new Date("2019/10/22");  // 即位礼正殿の儀(徳仁親王)

// [prmDate]には "yyyy/m/d"形式の日付文字列を渡す
import GetDayOfWeek from "./GetDayOfWeek";
import DateToSerial from "./DateToSerial";
import SerialToDate7 from "./SerialToDate7";
import SpringEquinox from "./SpringEquinox";
import AutumnEquinox from "./AutumnEquinox";

const Get_holiday = (year, month, day) =>
{
  // const MONDAY = 1;
  // const hurikae = "振替休日";
  // const cstImplementHoliday = DateToSerial(1973, 4, 12);        // 振替休日施行
  // var YesterDay;
  // var HolidayName_ret;
  // var MyDate = new Date(prmDate);
  // var HolidayName = prvHolidayChk(MyDate);

  // ----- 振替休日の判定 (振替休日施行日:1973/4/12) -----
  // [ 対象日≠祝日/休日 ＆ 対象日＝月曜日 ]のみ、前日(＝日曜日)を祝日判定する。
  // 前日(＝日曜日)が祝日の場合は”振替休日”となる。
  // 尚、５月６日の扱いを
  //     「火曜 or 水曜(みどりの日(5/4) or 憲法記念日(5/3)の振替休日)」⇒５月ブロック内で判定済
  //     「月曜(こどもの日(5/5)の振替休日」⇒ここの判定処理で判定
  // とする事により、ここでの判定対象は『対象日が月曜日』のみ となります。
  const MONDAY = 1;
  // const hurikae = "振替休日";
  const cstImplementHoliday = DateToSerial(1973, 4, 12);        // 振替休日施行
  let holidayName = prvHolidayChk(year, month, day);
  if (holidayName == "") {
      if (GetDayOfWeek(year, month, day) == MONDAY) {
          if (DateToSerial(year, month, day) >= cstImplementHoliday) {
            const yesterday = DateToSerial(year, month, day) - 1;
            const yesterdaySerial = SerialToDate7(yesterday);
            holidayName = prvHolidayChk(yesterdaySerial[0] * 1, yesterdaySerial[1] * 1, yesterdaySerial[2] * 1);
              if (holidayName != "") {
                  holidayName = "振替休日";
              } else {
                  holidayName = "";
              }
          } else {
              holidayName = "";
          }
      } else {
          holidayName = "";
      }
  } else {
      // HolidayName = HolidayName;
  }

  return holidayName;
}

//===============================================================

const prvHolidayChk = ( year,  month,  day) =>
{
  let NumberOfWeek;
  let dayOfWeek;
  const MONDAY = 1;
  const TUESDAY = 2;
  const WEDNESDAY = 3;
  // const hurikae = "振替休日";
  //const cstImplementHoliday = DateToSerial(1973, 4, 12);        // 振替休日施行
  //	JavaScriptで扱える日付は1970/1/1～のみ
  // const cstImplementTheLawOfHoliday = DateToSerial(1948, 7, 20);  // 祝日法施行
  if (DateToSerial(year, month, day) < DateToSerial(1948, 7, 20)) return ""; // 祝日法施行(1948/7/20)以前
  switch (day) {
    case 6: break;
    case 7: break;
    case 13: break;
    case 14: break;
    case 16: break;
    case 17: break;
    case 18: break;
    case 19: break;
    case 21: break;
    case 25: break;
    case 26: break;
    case 27: break;
    case 28: break;
    case 1:
      if (month == 1) return "元日";
      if(year==2019 && month==5) return "天皇の即位の日";
      // const sokui = DateToSerial(2019, 5, 1);          // 天皇の即位の日
      break;
    case 2:
      if (year==2019 && month==5) return "国民の休日";  // (2019/5/2) // 祝日に挟まれた国民の休日
      break;
    case 3:
      if(month==5) return "憲法記念日";
      if (month == 11) return "文化の日";
      break;
    case 4:
      if (year >= 2007 && month==5) return "みどりの日";
      break;
    case 5:
      if(month==5) return "こどもの日";
      break;
      case 8:
        if(year==2021 && month==8) return "山の日";
        break;
      case 9:
      if(year==1993 && month==6) return "皇太子徳仁親王の結婚の儀";
      // const cstNorihitoKekkon = DateToSerial(1993, 6, 9);            // 皇太子徳仁親王の結婚の儀
      break;
    case 10:
      if(year==1959 && month==4) return "皇太子明仁親王の結婚の儀";
      // const cstAkihitoKekkon = DateToSerial(1959, 4, 10);              // 皇太子・明仁親王の結婚の儀
      if (year == 2020 && month == 8) return "山の日";
      // 2020年はオリンピック特措法により「山の日」が 8/10 に移動
      if (year >= 1966 && year < 2000 && month == 10) return "体育の日";
      break;
    case 11:
      if (year >= 1967 && month==2) return "建国記念の日";
      if (year >= 2016 && year != 2020 && year != 2021 && month == 8) return "山の日";
      break;
    case 12:
      if(year==1990 && month==11) return "即位礼 正殿の儀";
      // const cstSokuireiseiden = DateToSerial(1990, 11, 12);          // 即位礼正殿の儀
      break;
    case 15:
      if ((year < 2000) && month == 1) return "成人の日";
      if (year >= 1966 && year < 2003 && month == 9) return "敬老の日";
      break;
    case 20:
      if (year >= 1996 && year < 2003 && month == 7) return "海の日";
      break;
    case 22:
      if (year == 2021 && month==7) return "海の日";
      if(year==2019 && month==10) return "即位礼正殿の儀";
      // const sokunogi = DateToSerial(2019, 10, 22);          // 即位礼正殿の儀
      break;
    case 23:
        if (year >= 2020 && month==2) return "天皇誕生日";
        if (year == 2020 && month == 7) return "海の日";
        if (month == 11) return "勤労感謝の日";
        if (year >= 1989 && year <= 2018 && month == 12) return "天皇誕生日";  // 平成天皇
        if (year == 2021 && month == 7) return "スポーツの日";
        break;
    case 24:
      if(year==1989 && month==2) return "昭和天皇の大喪の礼";
      // const cstShowaTaiso = DateToSerial(1989, 2, 24);                // 昭和天皇大喪の礼
      if (year == 2020 && month == 7) return "スポーツの日";
      break;
    case 29:
      if (year >= 2007 && month==4) return "昭和の日";
      else {
        if (year >= 1989 && month==4) return "みどりの日";
        else if(month==4) return "天皇誕生日";
      }
      break;
    case 30:
      if (year==2019 && month==4) return "国民の休日";  // (2019/4/30) // 祝日に挟まれた国民の休日(平成天皇の退位日)
      break;
  }
  switch (month) {
    case 2: return "";
    case 4: return "";
    case 6: return "";
    case 8: return "";
    case 11: return "";
    case 12: return "";
    // １月 //
    case 1:
      NumberOfWeek = Math.floor((day - 1) / 7) + 1;
      dayOfWeek = GetDayOfWeek(year, month, day);
      if ((year >= 2000) && (NumberOfWeek == 2) && (dayOfWeek == MONDAY)) return "成人の日";    // 2nd Monday
      return "";
    case 3:
      if (day == SpringEquinox(year)) return "春分の日";  // 1948～2150以外は[99]
      return "";
    case 5:
      dayOfWeek = GetDayOfWeek(year, month, day);
      if (year >= 1986 && year < 2007 && day == 4 && dayOfWeek > MONDAY) return "国民の休日";// 火曜 以降(火～土)
        // 5/4が日曜日は『只の日曜』､月曜日は『憲法記念日の振替休日』(～2006年)
        if (year >= 2007 && day == 6 && (dayOfWeek == TUESDAY || dayOfWeek == WEDNESDAY)) return "振替休日";    // [5/3,5/4が日曜]ケースのみ、ここで判定
      return "";
    case 7:
      NumberOfWeek = Math.floor((day - 1) / 7) + 1;
      dayOfWeek = GetDayOfWeek(year, month, day);
      if (year != 2020 && year != 2021 && year >= 2003 && (NumberOfWeek == 3) && (dayOfWeek == MONDAY)) return "海の日";  // 3rd Monday
      // 2020年はオリンピック特措法により
      //「海の日」が 7/23 / 「スポーツの日」が 7/24 に移動
      return "";
    case 9:
      //第３月曜日(15～21)と秋分日(22～24)が重なる事はない
      const MyAutumnEquinox = AutumnEquinox(year);
      if (day == MyAutumnEquinox) {
        return "秋分の日";    // 1948～2150以外は[99] // が返るので､必ず≠になる
      } else {
        if (year >= 2003) {
          NumberOfWeek = Math.floor((day - 1) / 7) + 1;
          dayOfWeek = GetDayOfWeek(year, month, day);
          if (NumberOfWeek == 3 && dayOfWeek == MONDAY) {
            return "敬老の日";    // 3rd Monday
          } else {
            if (dayOfWeek == TUESDAY && day == (MyAutumnEquinox - 1)) {
              return "国民の休日";    // 火曜日＆[秋分日の前日]
            }
          }
        }
      }
      return "";
    case 10:
      NumberOfWeek = Math.floor((day - 1) / 7) + 1;
      dayOfWeek = GetDayOfWeek(year, month, day);
      if (year >= 2022 && (NumberOfWeek == 2) && (dayOfWeek == MONDAY)) return "スポーツの日";  // 2020年より改名  // 2nd Monday
      if (year >= 2000 && year < 2020 && (NumberOfWeek == 2) && dayOfWeek == MONDAY) return "体育の日";    // 2nd Monday
      return "";
  }
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/ CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

export default Get_holiday;