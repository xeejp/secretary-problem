import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { Card, CardText } from 'material-ui/Card'

import { nextQuestion, finish } from './actions'
import { calcSecretaries } from 'components/calcSecretaries'

import { SplitAndInsert } from '../util/ReadJSON'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

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
    for(var i = 0; i < question_text["secretaries"]; i++) {
      pages[i] = 
      (<div style={{overflow: "hidden", margin: '5%'}} key={i}>
        <p>{SplitAndInsert(question_text["question_text"], { number: (i + 1), point: secretaries[i][0], rank: secretaries[i][2] })}</p><br />
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
        <p>{SplitAndInsert(ReadJSON().static_text["part_experiment"]["end"],question_text)}</p>
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