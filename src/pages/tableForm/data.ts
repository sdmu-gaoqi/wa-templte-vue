export const tableData = Array.from({ length: 100 }).map((item, index) => ({
  name: `姓名${index + 1}`,
  age: 18,
  id: index + 1,
  address: "山东省临沂市",
}));

export const columns = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
  },
];

export const form = [
  {
    title: "时间1",
    type: "time-range",
  },
  {
    title: "时间2",
    type: "time",
  },
  {
    title: "地区",
    type: "address",
  },
  {
    title: "单选",
    type: "select",
    options: Array.from({ length: 100 }).map((item, index) => ({
      label: `选项${index + 1}`,
      value: `选项${index + 1}`,
    })),
  },
];

export const timeOptions = [
    { title: '今天', value: 'today' },
    { title: '明天', value: 'mingtian' }
]

export const addressData = [
    {
        title: '北京',
        children: Array.from({ length: 20 }).map((item, index) => ({ title: `北京${index + 1}区`, value: `北京${index + 1}区` }))
    },
    {
        title: '上海',
        children: Array.from({ length: 20 }).map((item, index) => ({ title: `上海${index + 1}区`, value: `上海${index + 1}区` }))
    },
    {
        title: '广州',
        children: Array.from({ length: 20 }).map((item, index) => ({ title: `广州${index + 1}区`, value: `广州${index + 1}区` }))
    },
    {
        title: '深圳',
        children: Array.from({ length: 20 }).map((item, index) => ({ title: `深圳${index + 1}区`, value: `深圳${index + 1}区` }))
    },
]