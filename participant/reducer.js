import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { createReducer } from 'redux-act'

const reducer = concatenateReducers([
  createReducer({
    'update contents': (_, payload) => payload,
    'change page': (_, payload) => ({ page: payload }),
    'joined': (_, payload) => ({ joined: payload }),
    'reset': (_, payload) => payload,
    'result': (_, payload) => ({ result: payload }),
    'qupdate': (_, payload) => ({ question_text: payload }),
    'iupdate': (_, { slideIndex, answer }) => ({ slideIndex: slideIndex, answer: answer }),
  }),
  createReducer({
    'update contents': () => ({ loading: false })
  }, { loading: true }),
])

export default reducer