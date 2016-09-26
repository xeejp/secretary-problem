import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, nextQuestion } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
}

export default saga
