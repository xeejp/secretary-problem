export function getPage(page) {
  switch(page) {
    case 'waiting':
      return '待機'
    case 'description':
      return '説明'
    case 'experiment':
      return '出席確認'
    case 'result':
      return '終了'
    default:
      return page
  }
}
