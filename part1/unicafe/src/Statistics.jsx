import StatisticLine from "./StatisticLine"

const Statistics = (props) =>{
    if(props.good + props.bad + props.neutral 
      === 0){
      return(
        <div>
          <p>No feedback given</p>
        </div>
      )
    }else {
      return (
        <div>
            <h1>statistics</h1>
            <table>
              <tbody>
                <StatisticLine text="good" value={props.good}/>
                <StatisticLine text="neutral" value={props.neutral}/>
                <StatisticLine text="bad" value={props.bad}/>
                <StatisticLine text="all" value={props.good + props.neutral + props.bad}/>
                <StatisticLine text="average" value={(props.good - props.bad)/(props.good + props.neutral + props.bad)}/>
                <StatisticLine text="positive" value={`${props.good/(props.good + props.neutral + props.bad)*100}%`}/>
              </tbody>
            </table>
        </div>
      )
    }
  }

export default Statistics;