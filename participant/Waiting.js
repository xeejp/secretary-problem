import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({ joined }) => ({
  joined
})

const Waiting = ({ joined }) => (
	<Card>
		<CardTitle title="出席システム" subtitle="待機画面" />
		<CardText>
			<p>現在{joined}人が参加しています。 </p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)