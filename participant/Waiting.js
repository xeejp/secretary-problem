import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { ReadJSON, SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({ joined, question_text }) => ({
  joined, question_text
})

const Waiting = ({ joined, question_text }) => (
	<Card>
		<CardTitle title={SplitAndInsert(ReadJSON().static_text["title"], question_text)} subtitle={ReadJSON().static_text["waiting_page"]} />
		<CardText>
			{question_text['waiting_text'].split('\n').map(line => <p key={line}>{line}</p>)}
			<p>{ReadJSON().static_text["part_waiting"]["joined"][0] + joined + ReadJSON().static_text["part_waiting"]["joined"][1]} </p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)
