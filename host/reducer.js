import concatenateReducers from 'redux-concatenate-reducers'
import { createReducer } from 'redux-act'

import { changePage } from './actions'

const reducer = concatenateReducers([
  createReducer({
    'update contents': (_, payload) => payload,
    [changePage]: (_, payload ) => ({ page: payload }),
    'join': ({ participants }, { id, participant, joined }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), joined: joined}),
    'answer': ({ participants }, { id, participant, answered }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), answered: answered}),
    'reset': (_, {participants, joined, answered}) => ({
      participants: participants, joined: joined, answered: answered }),
    'result': (_, payload) => ({ answered: 0 }),
    'qupdate': (_, payload) => ({ question_text: payload }),
    'visited': (_, payload) => ({ is_first_visit: payload }),
  }, {}),
  createReducer({
    'update contents': () => ({ loading: false })
  }, { loading: true })
])

export default reducer
