import Request from '@/utils/request'

const request = new Request()

//  获取分类下视频
export function getClassVideoList(data) {
    return request({
        url: '?service=Discover.GetClassVideo',
        method: 'POST',
        data: data,
    })
}

//  获取分类下热门视频
export function getHotVideoList(data) {
    return request({
        url: '?service=Discover.GetVideoList',
        method: 'POST',
        data: data,
    })
}

//  获取视频分类
export function getClassVideo() {
    return request({
        url: '?service=Discover.GetClass',
        method: 'POST',
        data: { videoclassid: 1 },
    })
}

//  获取视频详情
export function getVideoDetails(videoid, uid) {
    return request({
        url: '?service=Discover.GetVideoDetails',
        method: 'POST',
        data: { videoid, uid },
    })
}

//  收藏视频或新闻 type 1视频，2新闻
export function addCollection(data) {
    return request({
        url: '?service=Video.AddCollection',
        method: 'POST',
        data: data,
    })
}

//  点赞视频或新闻 type 1视频，2新闻
export function addLike(data) {
    return request({
        url: '?service=Video.AddLike',
        method: 'POST',
        data: data,
    })
}
