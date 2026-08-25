import DateToSerial from "./DateToSerial"
import FormatDate from "./FormatDate"
import GetDayOfWeek from "./GetDayOfWeek"
import SpringEquinox from "./SpringEquinox"
import AutumnEquinox from "./AutumnEquinox"
import GetMondayOfWeek from "./GetMondayOfWeek"

const YearMonth = (events, year, month, sep = '-') => {
  // console.log(DateToSerial(year, month, 1))
  const retAry = [];
  // 祝日法（しゅくじつほう）。 ... 施行, 1948年7月20日 : 711634
  // ----- 振替休日の判定 (振替休日施行日:1973/4/12) ----- : 720666
  if(711634 <= DateToSerial(year, month, 1)) {
    const retAry = [];
    events.forEach(event => {
      let day = 0;
      /*
      console.log(event);
      {
        name: '元日',
        type: 'fixed',
        typeOld: 'b',
        start_year: 0,
        end_year: 9999,
        day: 1,
        comment: null
        */
       if('fixed' == event.type) {
         if(event.start_year <= year && event.end_year >= year) {
           retAry[FormatDate(year, month, event.day)] = event.name;
           day = GetDayOfWeek(year, month, event.day) ? 0 : event.day;
         }

       }
       if('second_monday' == event.type) {
          if(event.start_year <= year && event.end_year >= year) {
            let Y = GetMondayOfWeek(GetDayOfWeek(year, month, 1), 2);
            retAry[FormatDate(year, month, Y)] = event.name;
            // day = GetDayOfWeek(year, month, Y) ? 0 : Y;
          }
        }

       if('third_monday' == event.type) {
        if(event.start_year <= year && event.end_year >= year) {
          let Y = GetMondayOfWeek(GetDayOfWeek(year, month, 1), 3);
          retAry[FormatDate(year, month, Y)] = event.name;
          // day = GetDayOfWeek(year, month, Y) ? 0 : Y;
        }
       }

       if('vernal_equinox' == event.type) {

          if(event.start_year <= year && event.end_year >= year) {
            const dd = SpringEquinox(year);
            // console.log(SpringEquinox(year));
            retAry[FormatDate(year, month, dd)] = event.name;
            day = GetDayOfWeek(year, month, dd) ? 0 : dd;
          }
      }

      if('autumnal_equinox' == event.type) {

        // 火曜日＆[秋分日の前日]
        const dd = AutumnEquinox(year);
        if(year >= 2003) {
            if(GetDayOfWeek(year, month, dd - 1) == 2) {
                retAry[FormatDate(year, month, dd - 1)] = "国民の休日";
            }
        }
        if(event.start_year <= year && event.end_year >= year) {
            // console.log(AutumnEquinox(year));
            retAry[FormatDate(year, month, dd)] = event.name;
            day = GetDayOfWeek(year, month, dd) ? 0 : dd;
        }
      }

      if('conditional_holiday' == event.type) {
        // 火曜 以降(火～土)
        // 5/4が日曜日は『只の日曜』､月曜日は『憲法記念日の振替休日』(～2006年)
        if(event.start_year <= year && event.end_year >= year) {
          if(GetDayOfWeek(year, month, 4) > 1) {
              retAry[FormatDate(year, month, 4)] = event.name;
          }
        }
      }

      if('conditional_substitute_holiday' == event.type) {
        // [5/3,5/4が日曜]ケースのみ、ここで判定
        if(event.start_year <= year && event.end_year >= year) {
          const ff = GetDayOfWeek(year, month, 6);
          if(ff == 2 || ff == 3) {
              retAry[FormatDate(year, month, 6)] = event.name;
          }
        }
      }

       if(day) {
        // 720666
        // console.log(Tosiriaru(1973, 4, 12));
        // console.log(Tosiriaru(year, month, day));
        // 5月の振替休日が重複しているが配列により上書きされている
        if(720666 <= DateToSerial(year, month, day)) {
            retAry[FormatDate(year, month, day + 1)] = "振替休日";
        }
      }
    })
    return retAry;
  }
}

export default YearMonth;