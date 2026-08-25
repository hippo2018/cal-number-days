import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import styles from "./App.module.css";
import { For, NotFor } from "./Help";
import { Youbi, Moon } from './Youbi';
import { Today } from "./Today";
import { SetCookie, GetCookie } from "./Cookie";
import { ToSerial, FromSerial } from "./Serial";

// const ddd = [2023,1,1];
// console.log(For(...ddd));
// console.log(NotFor('2023-01-01'));
// console.log(Moon(Youbi('2023', '5', '23')));
// console.log(Today());
// console.log(ToSerial(...Today()));
// const www = FromSerial(ToSerial(...Today()));
// console.log(For(...www));
// console.log(Moon(Youbi(...www)));
// console.log(FromSerial(ToSerial(...Today())));
// console.log(GetCookie("date01"));

function App() {
  // const [countA, setCountA] = useState(0);
  const [selectChange, setselectChange] = useState('day1');
  const [startDayS, setstartDayS] = useState((GetCookie("date01"))? GetCookie("date01") * 1: ToSerial(...Today()));
  const [endDayS, setendDayS] = useState(ToSerial(...Today()));
  const [checkA, setcheckA] = useState(true);
  const [checkB, setcheckB] = useState(true);
  if(checkA) {
      SetCookie("date01", (startDayS), "Tue, 19 Jan 2038 03:14:07 UTC");
  }
  const gc = GetCookie("date01");
  if(GetCookie(gc)) {
    setstartDayS(gc * 1);
    // console.log(gc * 1);
  }
  const handleChange = (event) => {
    setselectChange(event.target.value);
  };
  const countUp = (event) => {
    // setendDayS(endDayS + 1);
    switch(event.target.value) {
      case '0':
        if(selectChange === 'start') {
          setstartDayS(ToSerial(...Today()));
        } else if(selectChange === 'end') {
          setendDayS(ToSerial(...Today()));
        } else {
          setendDayS(ToSerial(...Today()));
        }
        break;
      case '1':
        if(selectChange === 'start') {
          setstartDayS(startDayS + 1);
        } else if(selectChange === 'end') {
          setendDayS(endDayS + 1);
        } else {
          setendDayS(endDayS + 1);
        }
        break;
      case '2':
        if(selectChange === 'start') {
          setstartDayS(startDayS + 30);
        } else if(selectChange === 'end') {
          setendDayS(endDayS + 30);
        } else {
          setendDayS(endDayS + 20);
        }
        break;
      case '3':
        if(selectChange === 'start') {
          setstartDayS(startDayS + 365);
        } else if(selectChange === 'end') {
          setendDayS(endDayS + 365);
        } else {
          setendDayS(endDayS + 200);
        }
        break;
      case '4':
        if(selectChange === 'start') {
          setstartDayS(startDayS + 1826);
        } else if(selectChange === 'end') {
          setendDayS(endDayS + 1826);
        } else {
          setendDayS(endDayS + 2000);
        }
        break;
    }
  };
  const countDown = (event) => {
    switch(event.target.value) {
      case '1':
        if(selectChange === 'start') {
          setstartDayS(startDayS - 1);
        } else if(selectChange === 'end') {
          setendDayS(endDayS - 1);
        } else {
          setendDayS(endDayS - 1);
        }
        break;
      case '2':
        if(selectChange === 'start') {
          setstartDayS(startDayS - 30);
        } else if(selectChange === 'end') {
          setendDayS(endDayS - 30);
        } else {
          setendDayS(endDayS - 20);
        }
        break;
      case '3':
        if(selectChange === 'start') {
          setstartDayS(startDayS - 365);
        } else if(selectChange === 'end') {
          setendDayS(endDayS - 365);
        } else {
          setendDayS(endDayS - 200);
        }
        break;
      case '4':
        if(selectChange === 'start') {
          setstartDayS(startDayS - 1826);
        } else if(selectChange === 'end') {
          setendDayS(endDayS - 1826);
        } else {
          setendDayS(endDayS - 2000);
        }
        break;
    }
  };

  const cookieOnOff = () => {
    setcheckA(!checkA);
  };
  const hukumeru = () => {
    setcheckB(!checkB);
  };
  return (
    <>
    <div className={styles.containar}>
      <div className={styles.aaa}>
        <span>この日から</span>
        <p>{For(...FromSerial(startDayS))}（{Moon(Youbi(...FromSerial(startDayS)))}）</p>
        <label>
          <input type="checkbox" checked={checkA} onChange={cookieOnOff} />&nbsp;&nbsp;
          <span>クッキーに保存</span>
        </label>
      </div>
      <div className={styles.ab1}>
        <label>
          <input
            type='radio'
            name='grup01'
            
            value='start'
            checked={selectChange === 'start'}
            onChange={handleChange}
            />
          &nbsp;<span className={styles.hen}>変更</span>
        </label>
      </div>
      <div className={styles.bbb}>
        <span>この日まで</span>
        <p>{For(...FromSerial(endDayS))}（{Moon(Youbi(...FromSerial(endDayS)))}）</p>
        <label>
          <input type="checkbox" checked={checkB} onChange={hukumeru} />&nbsp;&nbsp;
          <span>日数に最初の日を含める</span>
        </label>
      </div>
      <div className={styles.ab2}>
        <label>
          <input
            type='radio'
            name='grup01'
            value='end'
            checked={selectChange === 'end'}
            onChange={handleChange}
            />
          &nbsp;<span className={styles.hen}>変更</span>
        </label>
      </div>
      <div className={styles.ccc}>
        <span>何日</span>
        <p>{endDayS - startDayS + ((checkB)? 1 : 0)} 日</p>
      </div>
      <div className={styles.ab3}>
      <label>
          <input
            type='radio'
            name='grup01'
            value='day1'
            checked={selectChange === 'day1'}
            onChange={handleChange}
            />
          &nbsp;<span className={styles.hen}>変更</span>
        </label>
      </div>
    </div>

    <div className={styles.con02}>
      <div className={styles.con2AAA}>
        <button onClick={countUp} value='4'>{(selectChange === 'day1')? '2000' : '5年'}+</button>
        <button onClick={countUp} value='3'>{(selectChange === 'day1')? '200' : '１年'}+</button>
        <button onClick={countUp} value='2'>{(selectChange === 'day1')? '20' : '１月'}+</button>
        <button onClick={countUp} value='1'>+</button>
      </div>
      <div className={styles.con2BBB}>
        <button onClick={countDown} value='4'>{(selectChange === 'day1')? '2000' : '５年'}-</button>
        <button onClick={countDown} value='3'>{(selectChange === 'day1')? '200' : '１年'}-</button>
        <button onClick={countDown} value='2'>{(selectChange === 'day1')? '20' : '１月'}-</button>
        <button onClick={countDown} value='1'>-</button>
      </div>
      <div className={styles.con2CCC}>
        <button onClick={countUp} value='0'>本日に</button>
      </div>
    </div>
    
    
    </>
  )
}

export default App
