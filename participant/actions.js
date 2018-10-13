import { createAction } from 'redux-act'

export const fetchContents = createAction('fetch contents')
export const nextQuestion = createAction('next question')
export const finish = createAction('finish')