﻿import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { ReadJSON, SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({ joined, question_text }) => ({
  joined, question_text
})

const Waiting = ({ joined, question_text }) => (
	<Card>
		<CardTitle title={SplitAndInsert(ReadJSON().static_text["title"], question_text)} subtitle="待機画面" />
		<CardText>
			{question_text['waiting_text'].split('\n').map(line => <p key={line}>{line}</p>)}
			<p>現在{joined}人が参加しています。 </p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)