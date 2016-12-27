import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { updateQuestion, fetchContents } from './actions'

import { ReadJSON, SplitAndInsert } from '../util/ReadJSON'

const mapStateToProps = ({ question_text, page }) => ({
  question_text, page
})

class Config extends Component {
  constructor(props) {
    super(props)
    const { question_text } = this.props
    var default_text = question_text
    var static_text = ReadJSON().static_text
    if(!question_text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(updateQuestion(default_text))
    }
    this.state = {
      static_text: static_text,
      question_text: default_text,
      open: false,
      snack: false,
      message: static_text["send_message"],
      disabled: false,
      default_text: ReadJSON().dynamic_text,
    }
  }

  QuestionTab() {
    return (
      <div>
        <p>{SplitAndInsert(this.state.static_text["config"]["people_num"],this.state.question_text)}</p>
        <TextField
          hintText={SplitAndInsert(this.state.static_text["config"]["people_num"],this.state.question_text)}
          defaultValue={this.state.question_text['secretaries']}
          onBlur={this.handleChangeOnlyNum.bind(this, ['secretaries'])}
          fullWidth={true}
       />
      </div>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      question_text: this.props.question_text})
  }

  handleClose() {
    this.setState({ open: false, disabled: false})
  }

  handleChangeOnlyNum(value, event){
    if(isNaN(event.target.value) || event.target.value.indexOf('.') != -1) {
      this.setState({ disabled: true })
      return
    }
    var question_text = Object.assign({}, this.state.question_text)
    var temp1 = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp1 = temp1[value[i]]
    }
    var temp2 = parseInt(temp1[value[value.length - 1]])
    temp1[value[value.length - 1]] = parseInt(event.target.value)
    this.setState({ question_text: question_text, disabled: false })
    if(parseInt(question_text.min) >= parseInt(question_text.max)){
      temp1[value[value.length - 1]] = temp2
      this.setState({ question_text: question_text, disabled: true })
    }
  }
  
  handleRequestClose() {
    this.setState({ snack: false })
  }

  submit() {
    this.setState({
      open: false,
      snack: true,
      message: this.state.static_text["send_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
  }

  reset(){
    this.setState({
      question_text: this.state.default_text,
      open: false,
      snack: true,
      message: this.state.static_text["reset_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
  }

  render() {
    const { page } = this.props
    const actions = [
      <RaisedButton
        label={this.state.static_text["apply"]}
        disabled={this.state.disabled}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <RaisedButton
        label={this.state.static_text["cancel"]}
        onTouchTap={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label={this.state.static_text["reset"]}
        onTouchTap={this.reset.bind(this)}
      />,
    ]

    return (<span>
    <FloatingActionButton onClick={this.handleOpen.bind(this)} style= {{marginLeft: "2%"}}disabled={page != "waiting"}>
      <ActionSettings />
    </FloatingActionButton>
    <Dialog
      title={this.state.static_text["config"]["setting"]}
      actions={actions}
      modal={false}
      open={this.state.open}
      autoScrollBodyContent={true}
    >
      {this.QuestionTab()}
    </Dialog>
      <Snackbar
        open={this.state.snack}
        message={this.state.message}
        autoHideDuration={2000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    </span>)
  }
}

export default connect(mapStateToProps)(Config)
