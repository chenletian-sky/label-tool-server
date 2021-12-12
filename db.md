# 数据库表设计


## 用户表
```javascript
  name: String,
  email: String,
  pwd: String,
  sex: {
    type: String,
    default: null
  },
  age: {
    type: Number,
    default: null
  },
  
```

## 字典数据表
```javascript
  userEmail: String,
  data: [{
    name: String,
    label: String,
    key: String, // index
    abbreviations: [String] // 别名
  }]
```


