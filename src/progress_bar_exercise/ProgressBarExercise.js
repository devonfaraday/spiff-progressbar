import React    from "react"
import Exercise from "../exercise/Exercise"
import styles from "./ProgressBarStyles.css"

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution = {<Solution />}
        specsUrl = "https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title    = "Progress Bar Exercise"
      />
    </div>
  )
}

export default ProgressBarExercise

// ----------------------------------------------------------------------------------
class ProgressBarExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 0,
      text: "Start Request",
      seconds: 0,
      isRequesting: false
    }
    this.startRequest = this.startRequest.bind(this)
    this.finishRequest = this.finishRequest.bind(this)
    this.resetBar = this.resetBar.bind(this)

  }

  // I'm using a timer to represent the percentage of data received.
  startTimer() {
    const maxTime = 15
    let interval = null
    
      interval = setInterval(() => {
        this.setState(prevState => ({ seconds: prevState.seconds + 1 }))
        var newPercentage = (this.state.seconds / maxTime) * 100
        if (this.state.percentage < 90) {
          if (newPercentage > 90) {
            newPercentage = 90
          }
          this.setState(prevState => ({ percentage: newPercentage}))
        } else if (this.state.isRequesting) {
          this.setState(prevState => ({ percentage: 90 }))
          return
        }
      }, 1000)
  }  

  // Change the text of the button when the request begins and ends
  changeButtonText(text) {
    this.setState({ text })
  }

  // Start the request
  startRequest() {
    if(!this.state.isRequesting) {
      this.setState(prevState => ({ isRequesting: true }))
      this.startTimer()
      this.changeButtonText("Loading...")
    }
  }

  // No matter what the percentage is finish the request to 100%
  finishRequest() {
    this.setState(prevState => ({ percentage: 100 }))
    this.changeButtonText("Start Request")
    this.setState(prevState => ({ isRequesting: false }))
    setTimeout(() => { 
       this.resetBar() 
      }, 2000);
  }

  resetBar()  {
    this.setState(prevState => ({ percentage: 0}))
  }

  render() {
    return (
      <div>
        <ProgressBar percentage={this.state.percentage}/>
        <div style={{ marginTop: '20px' }}>  
          <button class="button"
            onClick={this.startRequest}>
               { this.state.text }
          </button>  
          <button class="finish-button"
            onClick={this.finishRequest}>
              Finish Request
          </button>  
        </div>   
      </div>
    )
  }
}

// The inside of the bar that you will see when the progress bar fills up
const Filler = (props) => {
  return (
    <div className="filler" style={{ width: `${props.percentage}%` }}/>
  )
}

// The container of the progress bar
const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage}/>
    </div>
  )
}

const Solution = () => {
  return (
    <ProgressBarExample />
  )
}
