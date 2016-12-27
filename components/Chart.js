import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

import { ReadJSON,SplitAndInsert } from '../util/ReadJSON'

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
    const text = ReadJSON().static_text
    if(!question_text) return null
    let e = true
    for(var i = 0; e && i < datas.length; i++) e = (datas[i].y == 0)
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={text["comp_chart"]["title"]}
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
                text: text["comp_chart"]["title"]
              },
              xAxis: {
                type: 'category',
                title: {
                  text: ''
                }
              },
              yAxis: {
                title: {
                    text: text["comp_chart"]["rank_ave"]
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
                       formatter: function() { return (this.y != 0)? -(this.y - (question_text['secretaries'] + 1)) + text["comp_chart"]["rank_unit"] : '' }
                   }
                }
              },

              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormatter: function() { return '<span style="color:' + this.color + '"> ' + this.name + text["comp_chart"]["ave_rank"] + '</span>: <b>' + -(this.y - (question_text['secretaries'] + 1)) + text["comp_chart"]["rank_unit"] +'</b><br/>'}
              },

              series: [{
                name: SplitAndInsert(text["comp_chart"]["secretary"],question_text),
                colorByPoint: true,
                data: datas,
              }]
            }}
          />
          : <p>{text["comp_chart"]["no_answer"]}</p>
        }</span>
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
