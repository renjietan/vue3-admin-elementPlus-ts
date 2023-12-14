export interface ListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "普通消息",
    datetime: "一年前",
    description: "普通消息普通消息普通消息普通消息"
  }
]

export const messageData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "消息",
    description: "消息消息消息消息消息",
    datetime: "1998-06-05"
  }
]

export const todoData: ListItem[] = [
  {
    title: "任务名称",
    description: "饿了",
    extra: "未开始",
    status: "info"
  }
]
