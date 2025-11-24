export function isvalidUsername(str) {
    // const valid_map = ['admin', 'test']
    // return valid_map.indexOf(str.trim()) >= 0

    return str.trim().length >= 1 //清楚空格后长度大于等于1
}
