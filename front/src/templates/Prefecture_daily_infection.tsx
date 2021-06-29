import React,{useState} from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Inner } from "../components/inner";
// import {useSelector} from 'react-redux'
import {selectDailyInfection} from '../features/graphs/dailyInfectionSlice'
import {useAppSelector} from '../app/hooks'



const Graph8 = () => {

  const [prefecture,setPrefecture] = useState(1)
  const [selector,setSelector] = useState(0)

  const prefecture_daily_infection = useAppSelector(selectDailyInfection)

    console.log('items',prefecture_daily_infection);

    const target_prefecture = prefecture_daily_infection.data.filter(el => el["都道府県コード"] == prefecture)
    console.log(target_prefecture);

    const select_prefecture = (e:any) => setPrefecture(e.target.value)
    const dayOrTotal = (e:any) => setSelector(e.target.value)
    

  return (
      <React.Fragment>

        {
          prefecture_daily_infection.status === 'loading' ?
          <Inner><p>Loading...</p></Inner>
           :
          <Inner>
      <select onChange={select_prefecture}>
          <option value="1">北海道</option>
          <option value="2">青森</option>
          <option value="3">岩手</option>
          <option value="4">宮城</option>
          <option value="5">秋田</option>
          <option value="6">山形</option>
          <option value="7">福島</option>
          <option value="8">茨城</option>
          <option value="9">栃木</option>
          <option value="10">群馬</option>
          <option value="11">埼玉</option>
          <option value="12">千葉</option>
          <option value="13">東京</option>
          <option value="14">神奈川</option>
          <option value="15">新潟</option>
          <option value="16">富山</option>
          <option value="17">石川</option>
          <option value="18">福井</option>
          <option value="19">山梨</option>
          <option value="20">長野</option>
          <option value="21">岐阜</option>
          <option value="22">静岡</option>
          <option value="23">愛知</option>
          <option value="24">三重</option>
          <option value="25">滋賀</option>
          <option value="26">京都</option>
          <option value="27">大阪</option>
          <option value="28">兵庫</option>
          <option value="29">奈良</option>
          <option value="30">和歌山</option>
          <option value="31">鳥取</option>
          <option value="32">島根</option>
          <option value="33">岡山</option>
          <option value="34">広島</option>
          <option value="35">山口</option>
          <option value="36">徳島</option>
          <option value="37">香川</option>
          <option value="38">愛媛</option>
          <option value="39">高知</option>
          <option value="40">福岡</option>
          <option value="41">佐賀</option>
          <option value="42">長崎</option>
          <option value="43">熊本</option>
          <option value="44">大分</option>
          <option value="45">宮崎</option>
          <option value="46">鹿児島</option>
          <option value="47">沖縄</option>
      </select>
      <select onChange={dayOrTotal}>
        <option value="0">日別</option>
        <option value="1">累計</option>
      </select>
      <div>
        {selector == 0? 
        <ResponsiveContainer width="100%" height="40%" minHeight={400}>
        <LineChart data={target_prefecture}>
          <XAxis dataKey="日付"  tick={{ fontSize: '.7rem' }} />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend  verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Line
            type="monotone"
            dataKey="各地の感染者数_1日ごとの発表数"
            stroke="#fd7e00"
            strokeWidth={3}
          />
          
          <Brush
            dataKey="日付"
            stroke="#fd7e00" 
            startIndex={target_prefecture.length-31}
            endIndex={target_prefecture.length - 1}
            />
        </LineChart>
      </ResponsiveContainer> :
      <ResponsiveContainer width="100%" height="40%" minHeight={400}>
      <LineChart data={target_prefecture}>
        <XAxis dataKey="日付"  tick={{ fontSize: '.7rem' }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Legend  verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <Line
          type="monotone"
          dataKey="各地の感染者数_累計"
          stroke="#fd7e00"
          strokeWidth={3}
        />
        
        <Brush
          dataKey="日付"
          stroke="#fd7e00" 
          />
      </LineChart>
    </ResponsiveContainer>
      }
      </div>
    </Inner>
        }
      
      
      </React.Fragment>
    
  );
};

export default Graph8;