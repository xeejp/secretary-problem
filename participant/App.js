﻿import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Pages from './Pages'

import { ReadJSON,LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({ loading, active }) => ({
  loading,
  active
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
    const { loading, active } = this.props
    if (loading) {
      return <p>{ReadJSON().static_text["loading"]}</p>
    } else if(active) {
      return (
        <div>
          <Pages />
        </div>
      )
    } else {
      return (
        <div>
          <p>{LineBreak(ReadJSON().static_text["part_app"]["end"])}</p>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
