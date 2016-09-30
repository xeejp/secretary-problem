import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { Card, CardText } from 'material-ui/Card'

import { nextQuestion, finish } from './actions'
import { calcSecretaries } from 'components/calcSecretaries'

import Ranking from './Ranking'
import Numbers from './Numbers'

const mapStateToProps = ({ question_text, secretaries, slideIndex }) => ({ question_text, secretaries, slideIndex })

class Experiment extends Component {
  constructor(props) {
    super(props)
    const { question_text, secretaries } = this.props
    this.state = { secretaries: calcSecretaries(question_text["secretaries"], secretaries) }
  }

  next() {
    const { dispatch } = this.props
    dispatch(nextQuestion())
  }

  answer() {
    const { dispatch } = this.props
    dispatch(finish())
  }

  render() {
    const { question_text, slideIndex } = this.props
    const { secretaries } = this.state

    console.log(secretaries)

    let pages = []
    for(var i = 0; i < question_text["secretaries"]; i++){
      var text = (i + 1) + "番目の評価は" + secretaries[i][0] + "点です。\nこれまでで" + secretaries[i][2] + "番目に良い評価です。"
      pages[i] = 
      (<div style={{overflow: "hidden", margin: '5%'}} key={i}>
        {text.split('\n').map(line => <p>{line}</p>)}<br />
        <RaisedButton onClick={this.next.bind(this)} disabled={i == question_text["secretaries"] - 1} style={{float : 'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
          <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
            {question_text["question"].choices[0].split('\n').map(line => <h5>{line}</h5>)}
          </div>
        </RaisedButton>
        <RaisedButton onClick={this.answer.bind(this)} style={{float : 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
          <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
            {question_text["question"].choices[1].split('\n').map(line => <h5>{line}</h5>)}
          </div>
        </RaisedButton>
      </div>)
    }
    pages.push(
      <div style={{margin: '5%'}}>
        <p>あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。</p>
        <p>下より秘書の評価値と順位を確認することができます。</p>
      </div>)
    console.log(slideIndex + " " + question_text['secretaries'])
    return (<div>
      <Card><CardText>
        <SwipeableViews index={slideIndex} disabled={true}>
          {pages}
        </SwipeableViews>
      </CardText></Card><br />
      {(slideIndex == question_text['secretaries'])? <Ranking /> : <Numbers secretaries={secretaries} slideIndex={slideIndex} />}
    </div>)
  } 
}

export default connect(mapStateToProps)(Experiment)
