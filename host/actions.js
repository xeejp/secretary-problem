import { createAction } from 'redux-act'

export const fetchContents = createAction('fetch contents')

export const changePage = createAction('change page', page => page)
export const submitPage = createAction('submit page', page => page)
export const backPage = createAction('back page')
export const nextPage = createAction('next page')
export const updateQuestion = createAction('update question', question_text => question_text)
export const visit = createAction('visit')

export const openParticipantPage = createAction('open participant page')
