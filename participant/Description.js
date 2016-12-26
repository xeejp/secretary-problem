import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title="秘書問題" subtitle="ルールの説明" />
    <CardText>
      <p>{SplitAndInsert(question_text["description_text"], question_text)}</p>
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)