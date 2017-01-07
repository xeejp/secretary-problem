import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { calcSecretaries } from 'components/calcSecretaries'

const mapStateToProps = ({ question_text, secretaries, answer, max }) => ({
  question_text, secretaries, answer, max
})

class Ranking extends Component {
  constructor(props){
    super(props)
    this.state = {
      max: this.props.question_text['secretaries'],
      secretaries: calcSecretaries(this.props.question_text['secretaries'], this.props.max, this.props.secretaries)
    }
  }

  rank(){
    return this.state.secretaries.map((v, i) => (
      <tr key={i} style={{ background: (this.props.answer == i)? "#CCCCCC" : undefined}}>
        <td>{(i + 1) + "番目の秘書"}</td>
        <td>{v[1] + "位"}</td>
        <td>{v[0] + "ポイント"}</td>
      </tr>
    ))
  }

  render() {
    return (
      <Card
        style={{
          marginBottom: "5%",
          marginTop: "5%",
        }}
      >
        <CardHeader
          title={"秘書全員のポイント"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>秘書</th>
                <th>順位</th>
                <th>ポイント</th>
              </tr>
            </thead>
            <tbody>
              {this.rank()}
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Ranking)
