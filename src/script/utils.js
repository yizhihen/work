/**
 * 检测是否未空
 * @export
 * @param {any} query 
 * @returns 
 */
export function isNull(query,errInfo='暂无数据') {
    if (query || parseInt(query) === 0) {
        return query
    }
    return errInfo
}
