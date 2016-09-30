import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, nextQuestion, finish } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* nextQuestionSaga() {
  while(true) {
    yield take(`${nextQuestion}`)
    yield call(sendData, 'next question')
  }
}

function* finishSaga() {
  while(true) {
    yield take(`${finish}`)
    yield call(sendData, 'finish')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(nextQuestionSaga)
  yield fork(finishSaga)
}

export default saga
