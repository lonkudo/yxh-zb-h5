import mqtt from 'mqtt'

export class Mqtt {
  constructor(host, subscribeTopics, subscribeCallback) {
    //连接地址
    this.brokerHost = host
    // 订阅的主题数组
    this.subscribeTopics = subscribeTopics;
    //订阅消息的回调
    this.subscribeCallback = subscribeCallback
  }

  /**
   * @description: 连接方法
   * @param {MqttconnecOption} options:mqtt连接参数体
   * @return {*}
   */
  connect(options) {
    this.mqclient = mqtt.connect(`${this.brokerHost}`, options)
    // 连接
    this.mqclient.on('connect', () => {
      console.log('MQTTConnection==========连接成功:')
      this.mqclient.subscribe(this.subscribeTopics, { qos: 0 }, error => {
        if (!error) {
          console.log('订阅成功')
        } else {
          console.log('订阅失败')
        }
      })
    })
    // 消息
    this.mqclient.on('message', (topic, message) => {
      // console.log('收到来自', topic, '的消息', message.toString())
      this.subscribeCallback(topic, message)
    })

    // 重连
    this.mqclient.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })

    // 错误
    this.mqclient.on('error', (err) => {
      console.log('连接失败:', error)
    })

    // 离线
    this.mqclient.on('offline', (err) => {
      console.log('离线')
    })
  }
  //断开连接
  unconnect() {
    this.mqclient.end()
    this.mqclient = null
    console.log('mqtt服务已断开连接！')
  }
}