import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { SplitAndInsert } from '../util/ReadJSON'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title={SplitAndInsert(ReadJSON().static_text["title"], question_text)} subtitle={ReadJSON().static_text["part_description"]["description"]} />
    <CardText>
      <p>{SplitAndInsert(question_text["description_text"], question_text)}</p>
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)
