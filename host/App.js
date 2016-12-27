import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import Config from './Config.js'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Users from './Users'
import Chart from 'components/Chart'
import { calcResult } from './calcResult'
import { calcSecretaries } from 'components/calcSecretaries'

import { ReadJSON, LineBreak, SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({loading, page, participants, question_text}) => ({
  loading, page, participants, question_text
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, participants, question_text } = this.props
    const text = ReadJSON().static_text
    if (loading) {
      return <p>{text["loading"]}</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
          <Users /><br />
          <Chart expanded={false} datas={calcResult(participants, question_text)} /><br />
          <Config />
          <EditQuestion />
          <DownloadButton
            fileName={"secretary_problem.csv"}
            list={[
              [SplitAndInsert(text["title"],question_text)],
              [text["app"]["date"], new Date()],
              participants? [text["app"]["people"], Object.keys(participants).length] : [],
              [text["app"]["id"][0], SplitAndInsert(text["app"]["id"][1],question_text), SplitAndInsert(text["app"]["id"][2],question_text), text["app"]["id"][3], SplitAndInsert(text["app"]["id"][4],question_text)],
            ].concat(
              (participants && question_text)? Object.keys(participants).map(id => { if(participants[id].answer < 0) return [id, text["app"]["no_answer"], "-", "-", "-"];  var tmp = calcSecretaries(question_text['secretaries'], participants[id].secretaries); return [id, participants[id].answer + 1, tmp[participants[id].answer][1], tmp[participants[id].answer][2], tmp[participants[id].answer][0]] }) : []
            )}
          disabled={page != "result"}
          style={{marginLeft: '2%'}}
        />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
