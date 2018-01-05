import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'
import Chart from '../components/Chart'
import Ranking from './Ranking'

const mapStateToProps = ({ result }) => ({
  result
})

const Result = ({ result }) => (
  <div>
    <Ranking /><br />
    <Chart expanded={true} datas={result} />
  </div>
)

export default connect(mapStateToProps)(Result)