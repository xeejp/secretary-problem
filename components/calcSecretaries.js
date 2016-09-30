export function calcSecretaries(max, seed) {
  let xorshift = seed => {
   seed = seed ^ (seed << 13)
   seed = seed ^ (seed >> 17)
   seed = seed ^ (seed << 15)
   return Math.abs(seed)
  }

  let points = []
  let back = seed;
  for(var i = 0; i < max; i++){
    back = xorshift(back)
    points[i] = back % 100 + 1
    for(var j = 0; j < i; j++){
      if(points[j] == points[i]) {
        i--
        break
      }
    }
  }
  let sorted = points.concat().sort((a, b) => b - a)
  let tmp = []
  let res = points.map(v => {
    var ret = [0, 0, 0]
    for(var i = 0; i < sorted.length; i++){
      if(v == sorted[i]) {
        ret[0] = v
        ret[1] = i + 1
        break
      }
    }
    var i = 0
    for(; i < tmp.length; i++){
      if(tmp[i] < v) break;
    }
    tmp.splice(i, 0, v)
    ret[2] = i + 1
    return ret
  })
  return res
}
