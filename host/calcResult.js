import { calcSecretaries } from 'components/calcSecretaries'

export function calcResult(participants, question_text) {
  if(!question_text) return null
  let tmps = []
  let tmpr = []
  for(var i = 0; i < question_text['secretaries']; i++) {
    tmps[i] = 0
    tmpr[i] = 0
  }
  for(var id in participants) {
    if(participants[id].answer != -1) {
      tmps[participants[id].answer]++
      tmpr[participants[id].answer] += calcSecretaries(question_text['secretaries'], participants[id].max, participants[id].secretaries)[participants[id].answer][1]
    }
  }

  let datas = []
  for(var i = 0; i < question_text['secretaries']; i++){
    datas[i] = {
      name: (i + 1) + '人目の秘書',
      y: (tmps[i] == 0)? 0 : question_text['secretaries'] - (tmpr[i] / tmps[i]) + 1
    }
  }
  return datas
}
