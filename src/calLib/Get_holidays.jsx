import React, { useState, useEffect } from 'react';
import GetDayOfWeek from "./GetDayOfWeek";
import DateToSerial from "./DateToSerial";
import AutumnEquinox from "./AutumnEquinox";
import SpringEquinox from "./SpringEquinox";
import HolidaysByMonth from "./holidaysByMonth";
import FormatDate from "./FormatDate";
import HolidaysByMonth2 from './HolidaysByMonth2';
import YearMonth from "./YearMonth";

// 特定の週の月曜日の日付を計算する
const getMondayDate = (weekNumber, startDayOfWeek) => 7 * weekNumber - (startDayOfWeek + 5) % 7;

// 祝日法（しゅくじつほう）。 ... 施行, 1948年7月20日 : 711634
 // ----- 振替休日の判定 (振替休日施行日:1973/4/12) ----- : 720666
const Get_holidays = (year, month, separator = '-') => {
    if(true) {
        // const [month0, setMonth0] = useState(0);
        // const [holidays, setHolidays] = useState([]);
        // const [holiday, setHoliday] = useState([]);
        
        // useEffect(() => {
        //     fetch('/holidays.json')
        //     .then(response => response.json())
        //     .then(data => setHolidays(data))
        //     .catch(error => console.error('Error fetching holidays:', error));
        // }, []);
        // if (!holidays || !holidays.months) {
        //     return <div>Loading...</div>; // データがまだない場合のローディング表示
        //   }
        //   setHoliday([holidays.months.January.events
        //     ,holidays.months.February.events
        // ])
        // console.log(holiday[0])
    }
    // console.log(HoliAry[month]);
    // console.log(DateToSerial(1948,7,20));
    let retAry = [];
    const months00 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(711634 <= DateToSerial(year, month, 1)) {
        if(true) {
            
            
            // console.log(HolidaysByMonth2.months[months00[month - 1]].events);
            retAry = YearMonth(HolidaysByMonth2.months[months00[month - 1]].events, year, month);
        } else {
            HolidaysByMonth[month].forEach(ele => {
                // console.log(ele[1]);
                let day = 0;
                switch(ele[1]) {
                    case 'a' :
                        if(ele[2] == year) {
                            retAry[FormatDate(year, month, ele[3])] = ele[0];
                            day = GetDayOfWeek(year, month, ele[3]) ? 0 : ele[3];
                        }
                        break;
                    case 'b' :
                        if(ele[2] <= year && ele[3] >= year) {
                            retAry[FormatDate(year, month, ele[4])] = ele[0];
                            day = GetDayOfWeek(year, month, ele[4]) ? 0 : ele[4];
                        }
                        break;
                    case 'mm' :
                        if(ele[2] <= year && ele[3] >= year) {
                            // let Y = GetDayOfWeek(year, month, 1);
                            // Y = (Y < 2) ? (ele[4] * 7) - 5 - Y   : (ele[4] * 7) + 2 - Y;
                            const Y = getMondayDate(ele[4], GetDayOfWeek(year, month, 1));
                            // console.log(GetDayOfWeek(year, month, 1));
                            // console.log(Y);
                            retAry[FormatDate(year, month, Y)] = ele[0];
                            day = GetDayOfWeek(year, month, Y) ? 0 : Y;
                        }
                        break;
                    case 'shubun' :
                        // 火曜日＆[秋分日の前日]
                        const dd = AutumnEquinox(year);
                        if(year >= 2003) {
                            if(GetDayOfWeek(year, month, dd - 1) == 2) {
                                retAry[FormatDate(year, month, dd - 1)] = "国民の休日";
                            }
                        }
                        if(ele[2] <= year && ele[3] >= year) {
                            // console.log(AutumnEquinox(year));
                            retAry[FormatDate(year, month, dd)] = ele[0];
                            day = GetDayOfWeek(year, month, dd) ? 0 : dd;
                        }
                        break;
                    case 'shunbun' :
                        if(ele[2] <= year && ele[3] >= year) {
                            const dd = SpringEquinox(year);
                            // console.log(SpringEquinox(year));
                            retAry[FormatDate(year, month, dd)] = ele[0];
                            day = GetDayOfWeek(year, month, dd) ? 0 : dd;
                        }
                        break;
                    case 'qq' :
                        // 火曜 以降(火～土)
                        // 5/4が日曜日は『只の日曜』､月曜日は『憲法記念日の振替休日』(～2006年)
                        if(ele[2] <= year && ele[3] >= year) {
                            if(GetDayOfWeek(year, month, 4) > 1) {
                                retAry[FormatDate(year, month, 4)] = ele[0];
                            }
                        }
                        break;
                    case 'ff' :
                        // [5/3,5/4が日曜]ケースのみ、ここで判定
                        if(ele[2] <= year && ele[3] >= year) {
                            const ff = GetDayOfWeek(year, month, 6);
                            if(ff == 2 || ff == 3) {
                                retAry[FormatDate(year, month, 6)] = ele[0];
                            }
                        }
                }
                if(day) {
                    // 720666
                    // console.log(DateToSerial(1973, 4, 12));
                    // console.log(DateToSerial(year, month, day));
                    if(720666 <= DateToSerial(year, month, day)) {
                        retAry[FormatDate(year, month, day + 1)] = "振替休日";
                    }
                }
            });
        }
    } else {
        // console.log([]);
    }
    return retAry;
}

export default Get_holidays;