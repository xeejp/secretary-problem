import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title="秘書問題" subtitle="ルールの説明" />
    <CardText>
      <p>秘書を1人雇いたいとします。</p>
      <p>{question_text['secretaries']}人が応募してきています。</p>
      <p>ランダムに1人ずつ面接をし、それぞれの面接後、その応募者を採用するかどうかを決定します。</p>
      <p>不採用にした応募者を後から採用することはできません。</p>
      <p>このような状況で、最良の応募者を選択することがあなたの目的です</p>
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)