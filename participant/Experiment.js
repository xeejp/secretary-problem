import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { Card, CardText } from 'material-ui/Card'

import { nextQuestion, finish } from './actions'
import { calcSecretaries } from 'components/calcSecretaries'

import { SplitAndInsert } from '../util/ReadJSON'

import Ranking from './Ranking'
import Numbers from './Numbers'

const mapStateToProps = ({ question_text, secretaries, max, slideIndex }) =>  ({
  question_text,
  secretaries,
  max,
  slideIndex
})

class Experiment extends Component {
  constructor(props) {
    super(props)
    const { question_text, max, secretaries } = this.props
    this.state = { secretaries: calcSecretaries(question_text["secretaries"], max, secretaries) }
  }

  next() {
    const { dispatch } = this.props
    dispatch(nextQuestion())
  }

  answer() {
    const { dispatch } = this.props
    dispatch(finish())
  }

  renderButtonText(questionText, index) {
    return questionText.choices[index].split('\n').map((line, key) =>
        <p style={{fontSize: "1.64rem"}} key={key}>
          {line}
        </p>
    )
  }

  render() {
    const { question_text, slideIndex } = this.props
    const { secretaries } = this.state

    let pages = []
    for(var i = 0; i < question_text["secretaries"]; i++) {
      pages[i] =
      (<div style={{overflow: "hidden", margin: '5%'}} key={i}>
        <pre>
          {SplitAndInsert(question_text["question_text"], { number: (i + 1), point: secretaries[i][0], rank: secretaries[i][2] })}
        </pre><br />
        <RaisedButton
          onClick={this.next.bind(this)}
          disabled={i == question_text["secretaries"] - 1}
          style={{float: 'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
          <div
            style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
            {this.renderButtonText(question_text["question"], 0)}
          </div>
        </RaisedButton>
        <RaisedButton
          onClick={this.answer.bind(this)}
          style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
          <div style={{position: 'relative', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
            {this.renderButtonText(question_text["question"], 1)}
          </div>
        </RaisedButton>
      </div>)
    }
    pages.push(
      <div style={{margin: '5%'}} key='message'>
        <p>あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。</p>
        <p>下より秘書の評価値と順位を確認することができます。</p>
      </div>
    )
    return (<div>
      <Card>
        <CardText>
          <SwipeableViews index={slideIndex} disabled={true}>
            {pages}
          </SwipeableViews>
        </CardText>
      </Card><br />
      {(slideIndex == question_text['secretaries'])? <Ranking /> : <Numbers secretaries={secretaries} slideIndex={slideIndex} />}
    </div>)
  }
}

export default connect(mapStateToProps)(Experiment)
