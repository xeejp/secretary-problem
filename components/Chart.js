import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const mapStateToProps = ({ question_text }) => ({ question_text })

class Chart extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded }
  }
  
  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }
  
  render() {
    const { question_text, datas } = this.props
    if(!question_text) return null
    let e = true
    for(var i = 0; e && i < datas.length; i++) e = (datas[i].y == 0)
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>{
          !e?
          <Highcharts
            config={{
              chart: {
                type: 'column'
              },
              credits: {
                enabled: false
              },

              title: {
                text: '実験結果'
              },
              xAxis: {
                type: 'category',
                title: {
                  text: ''
                }
              },
              yAxis: {
                title: {
                    text: '順位の平均'
                },
                visible: false,
                allowDecimals: false
              },
              legend: {
               enabled: false
              },
              plotOptions: {
                series: {
                   borderWidth: 0,
                   dataLabels: {
                       enabled: true,
                       format: undefined,
                       formatter: function() { return (this.y != 0)? -(this.y - (question_text['secretaries'] + 1)) + '位' : '' }
                   }
                }
              },

              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormatter: function() { return '<span style="color:' + this.color + '"> ' + this.name + 'の平均の順位</span>: <b>' + -(this.y - (question_text['secretaries'] + 1)) + '位</b><br/>'}
              },

              series: [{
                name: '秘書',
                colorByPoint: true,
                data: datas,
              }]
            }}
          />
          : <p>回答した人がいません。</p>
        }</span>
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))