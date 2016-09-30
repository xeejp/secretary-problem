import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, backPage, nextPage, submitPage, changePage, updateQuestion } from './actions'
import { calcResult } from './calcResult'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    if(payload == "waiting" || payload == "experiment") {
      yield call(sendData, 'all reset')
    }
    yield call(sendData, 'change page', payload)
    if(payload == "result") {
      const { participants: participants, question_text: question_text } = yield select( ({ participants, question_text })  => ({ participants, question_text }))
      yield call(sendData, 'send result', calcResult(participants, question_text))
    }
    yield put(changePage(payload))
  }
}
function* backPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${backPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[pages.length - 1]
    for (let i = pages.length - 1; i >= 0; i --) {
      if (page == pages[i]) {
        next = pages[(pages.length - 1 + i) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}


function* nextPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* updateQuestionSaga() {
  while(true) {
    const { payload } = yield take(`${updateQuestion}`)
    yield call(sendData, 'update question', payload)
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(backPageSaga)
  yield fork(nextPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateQuestionSaga)
}

export default saga