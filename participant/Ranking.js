import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { calcSecretaries } from 'components/calcSecretaries'

import { ReadJSON, SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({ question_text, secretaries, answer }) => ({
  question_text, secretaries, answer
})



class Ranking extends Component {
  constructor(props){
    super(props)
    this.state = {
      max: this.props.question_text['secretaries'],
      secretaries: calcSecretaries(this.props.question_text['secretaries'], this.props.secretaries)
    }
  }

  rank(){
    return this.state.secretaries.map((v, i) => (
      <tr key={i} style={{ background: (this.props.answer == i)? "#CCCCCC" : undefined}}>
        <td>{(i + 1) + SplitAndInsert(ReadJSON().static_text["part_ranking"]["rank"][0],this.props.question_text)}</td>
        <td>{v[1] + ReadJSON().static_text["part_ranking"]["rank"][1]}</td>
        <td>{v[0] + ReadJSON().static_text["part_ranking"]["rank"][2]}</td>
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
          title={SplitAndInsert(ReadJSON().static_text["part_ranking"]["title"],this.props.question_text)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>{SplitAndInsert(ReadJSON().static_text["part_ranking"]["card"][0],this.props.question_text)}</th>
                <th>{ReadJSON().static_text["part_ranking"]["card"][1]}</th>
                <th>{ReadJSON().static_text["part_ranking"]["card"][2]}</th>
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
