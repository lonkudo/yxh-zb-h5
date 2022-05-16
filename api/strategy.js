import Request from '@/utils/request'

const request = new Request()

// 观看视频获取金币
export function addGoldRecord(data) {
    return request({
        url: '?service=Live.SendGift',
        method: 'POST',
        data: data,
    })
}





