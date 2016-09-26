import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ joined: payload }),
    'reset': (_, { payload }) => ( { sequence: payload.sequence, question1: payload.question1, question2: payload.question2, active: payload.active, qswap: payload.qswap, question_text: payload.question_text }),
    'result': (_, { payload: {oneone, onetwo, twoone, twotwo} }) => ({
      oneone: oneone, onetwo: onetwo, twoone: twoone, twotwo: twotwo }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer