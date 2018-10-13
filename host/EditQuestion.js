import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { updateQuestion, fetchContents } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text, page }) => ({
  question_text, page
})

class EditQuestion extends Component {
  constructor(props) {
    super(props)
    const { question_text } = this.props
    var default_text = question_text
    if(!question_text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(updateQuestion(default_text))
    }
    this.state = {
      question_text: default_text,
      open: false,
      snack: false,
      slideIndex: 0,
      message: "設定を送信しました。",
      disabled: false,
      default_text: ReadJSON().dynamic_text,
    }
  }

  WaitingTab() {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <TextField
         hintText={"待機画面に表示するテキスト"}
         defaultValue={this.state.question_text["waiting_text"]}
         onBlur={this.handleChange.bind(this, ["waiting_text"])}
         multiLine={true}
         fullWidth={true}
         style={{height: 1000}}
       />
      </div>
    )
  }

  DescriptionTab() {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <TextField
         hintText={"説明画面に表示するテキスト"}
         defaultValue={this.state.question_text["description_text"]}
         onBlur={this.handleChange.bind(this, ["description_text"])}
         multiLine={true}
         fullWidth={true}
         style={{height: 1000}}
       />
      </div>
    )
  }

  QuestionTab() {
    return <div style={{height: '100%', position: 'relative'}}>
      <TextField
        hintText={this.state.question_text["hire"]}
        defaultValue={this.state.question_text["hire"]}
        onBlur={this.handleChange.bind(this, ["hire"])}
        multiLine={false}
        fullWidth={true}
      />
      <TextField
        hintText={this.state.question_text["question_text"]}
        defaultValue={this.state.question_text["question_text"]}
        onBlur={this.handleChange.bind(this, ["question_text"])}
        multiLine={true}
        fullWidth={true}
      />
      選択肢1 :　
      <TextField
        hintText={this.state.question_text["question"]["choices"][0]}
        defaultValue={this.state.question_text["question"]["choices"][0]}
        onBlur={this.handleChange.bind(this, ["question", "choices", 0])}
        multiLine={false}
        fullWidth={false}
      /><br />
      選択肢2 :　
      <TextField
        hintText={this.state.question_text["question"]["choices"][1]}
        defaultValue={this.state.question_text["question"]["choices"][1]}
        onBlur={this.handleChange.bind(this, ["question", "choices", 1])}
        multiLine={false}
        fullWidth={false}
      />
    </div>
  }

  handleChange(value, event){
    var question_text = Object.assign({}, this.state.question_text)
    var temp = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ question_text: question_text })
  }

  handleSlide(value) {
    this.setState({
      slideIndex: value
    })
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
      message: "設定を送信しました。"
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
  }

  reset(){
    this.setState({
      question_text: this.state.default_text,
      open: false,
      snack: true,
      message: "設定を初期化しました。"
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
  }

  render() {
    const { page } = this.props
    const actions = [
      <RaisedButton
        label="適用"
        disabled={this.state.disabled}
        primary={true}
        keyboardFocused={true}
        onClick={this.submit.bind(this)}
      />,
      <RaisedButton
        label="キャンセル"
        onClick={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label="すべてリセット"
        onClick={this.reset.bind(this)}
      />,
    ]

    return (<span>
    <FloatingActionButton onClick={this.handleOpen.bind(this)} style= {{marginLeft: "2%"}}disabled={page != "waiting"}>
      <ImageEdit />
    </FloatingActionButton>
    <Dialog
      title="編集画面"
      actions={actions}
      modal={false}
      open={this.state.open}
      autoScrollBodyContent={true}
    >
    <Tabs
      onChange={this.handleSlide.bind(this)}
      value={this.state.slideIndex}
    >
      <Tab label="待機画面" value={0} />
      <Tab label="説明画面" value={1} />
      <Tab label="問題画面" value={2} />
    </Tabs>
    <SwipeableViews
      index={this.state.slideIndex}
      onChangeIndex={this.handleSlide.bind(this)}
    >
      {this.     WaitingTab()}
      {this.DescriptionTab()}
      {this.    QuestionTab()}
    </SwipeableViews>
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

export default connect(mapStateToProps)(EditQuestion)