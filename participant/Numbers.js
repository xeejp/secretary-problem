import React, { Component } from 'react'
import { connect } from 'react-redux'

import { pink400 } from 'material-ui/styles/colors';

import Avatar from 'material-ui/Avatar'
import { calcSecretaries } from 'components/calcSecretaries'

const mapStateToProps = ({}) => ({})

const Numbers = ({ secretaries, slideIndex }) => (
  <span>
    {secretaries.map((v, i) => (
      <Avatar
        key={i}
        backgroundColor={(i <= slideIndex)? pink400 : undefined}
        size={50}
        style={{margin: 5}}
      >
      {(i <= slideIndex)? v[0] : '?'}
    </Avatar>
    ))
    }
  </span>
)

export default connect(mapStateToProps)(Numbers)