import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Pages from './Pages'

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
      return <p>ロード中です。</p>
    } else if(active) {
      return (
        <div>
          <Pages />
        </div>
      )
    } else {
      return (
        <div>
          <p>この実験の受け付けは終了しました。</p>
          <p>次の実験をお待ちください。</p>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
