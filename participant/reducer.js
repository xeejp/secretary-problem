import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ joined: payload }),
    'reset': (_, { payload }) => payload,
    'result': (_, { payload }) => ({ result: payload }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
    'iupdate': (_, { payload: { slideIndex, answer } }) => ({ slideIndex: slideIndex, answer: answer }),
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer