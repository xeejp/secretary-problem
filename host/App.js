import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import Config from './Config.js'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Users from './Users'
import Chart from '../components/Chart'
import { calcResult } from './calcResult'
import { calcSecretaries } from '../components/calcSecretaries'

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
    if (loading) {
      return <p>ロード中です。</p>
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
              ["秘書問題"],
              ["実験日", new Date()],
              participants? ["登録者数", Object.keys(participants).length] : [],
              ["ID", "何番目の秘書を採用したか", "採用した秘書の順位", "採用した時点での順位", "採用した秘書の得点"],
            ].concat(
              (participants && question_text)? Object.keys(participants).map(id => { if(participants[id].answer < 0) return [id, "未回答", "-", "-", "-"];  var tmp = calcSecretaries(question_text['secretaries'], participants[id].max, participants[id].secretaries); return [id, participants[id].answer + 1, tmp[participants[id].answer][1], tmp[participants[id].answer][2], tmp[participants[id].answer][0]] }) : []
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
