import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import { nextQuestion } from './actions'

const mapStateToProps = ({}) => ({})

class Experiment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
    </div>)
  } 
}

export default connect(mapStateToProps)(Experiment)
