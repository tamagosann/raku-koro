import {FC} from "react";
import { Inner } from "../components/inner";
// import {useSelector} from 'react-redux'
import {selectDailyPositive} from '../features/graphs/dailyPositiveSlice'
import {useAppSelector} from '../app/hooks'
import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush
  } from 'recharts';

  interface Data {
    daily_pcr:number
    daily_positive:number
    date:string
  }


const PcrPositiveRate:FC = () => {


  const PcrPositiveRate = useAppSelector(selectDailyPositive)

    const tranceData = [] as Data[];

    PcrPositiveRate.data.forEach((el) => {
        const trance = {
            daily_pcr:0,
            daily_positive:0,
            date:''
        }
        if(el.daily_pcr === null) {
            trance.daily_pcr = 0
        }else{
            trance.daily_pcr = el.daily_pcr
        }

        if(el.daily_positive === null) {
            trance.daily_positive = 0
        }else{
            trance.daily_positive = el.daily_positive
        }
        trance.date = el.date

        tranceData.push(trance)
    })

    


    

    // const select_prefecture = (e:any) => setPrefecture(e.target.value)
    // const dayOrTotal = (e:any) => setSelector(e.target.value)
    

  return (
    <>
      {PcrPositiveRate.status === 'loading' ? 
      <Inner><p>Loading...</p></Inner>
      : (
        <Inner>
            <h1 style={{textAlign: 'center'}}>PCR検査数と陽性者数の推移</h1>
            <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          width={500}
          height={400}
          data={tranceData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip
          formatter={(value: any) => {
              return `${value.toLocaleString()} 人`;
            
          }}
          />
          <Legend verticalAlign="top"/>
          <Area type="monotone" dataKey="daily_pcr" fill="#ffe2b2" stroke="#fd7e00" name="PCR検査人数" />
          <Bar dataKey="daily_positive" barSize={20} fill="#fd7e00" name="陽性者数" />
          {/* <Line type="monotone" dataKey="daily_pcr" stroke="#ff7300" /> */}
          {/* <Scatter dataKey="cnt" fill="red" /> */}
          <Brush
              className="TimeLineChart-brush"
              dataKey="date"
              stroke="#fd7e00"
              startIndex={0}
              endIndex={0}
            />
        </ComposedChart>
      </ResponsiveContainer>    
        <a
            href="https://www.mhlw.go.jp/stf/covid-19/open-data.html"
            target="_blank"
            rel="noopener"
          >
              PCR検査数と陽性者数の情報提供：厚生労働省オープンデータ
          </a>
        </Inner>
        
      )}
    </>
    
  );
};

export default PcrPositiveRate;