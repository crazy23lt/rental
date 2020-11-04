# 1. 后台接口

## 1.1. API V1 接口说明

- 接口基准地址：`http://127.0.0.1:3001/`
- 服务端已开启 CORS 跨域支持
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- POST（CREATE）：在服务器新建一个资源。

### 1.1.2. 通用返回状态说明

| _状态码_ | _含义_                | _说明_               |
| -------- | --------------------- | -------------------- |
| 200      | OK                    | 请求成功             |
| 202      | warning               | 请求成功但是操作失败 |
| 500      | INTERNAL SERVER ERROR | 内部错误             |

---

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：login/auth
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注                                        |
| ------ | -------- | ------------------------------------------- |
| code   | string   | wx.login 返回的 res.code （用户登录凭证）   |
| wxinfo | object   | wx.getUserInfo 返回的 userInfo （用户信息） |

- 响应参数

| 参数名   | 参数说明       | 备注                  |
| -------- | -------------- | --------------------- |
| \_id     | 用户 ID        | 用户唯一 ID           |
| userinfo | 用户完善的信息 | 没有信息则会返回 null |

- 响应数据

```json
{
  "data": "5fa1feabbbbdec15c410dc20",
  "meta": {
    "msg": "登录成功",
    "status": 200
  }
}
```

## 1.3. 用户管理

### 1.3.1. 用户信息更新

- 请求路径：login/update
- 请求方法：post
- 请求参数

```js
{
    id: "5fa242eae4bf8b369c2af91a", // 必填
    name: "鸭滑", // 必填
    phone: "13636065890", // 必填
    idcard: "421125099821003748", // 必填
    city: "深圳市", // 必填
    area: "南山区", // 必填
    town: "学府村",                         // 必填
    wxinfo: {/* wx.getUserInfo返回的数据 */}
}
```

- 响应参数

| 参数名   | 参数说明     | 备注                 |
| -------- | ------------ | -------------------- |
| \_id     | 用户 ID      | 用户唯一 ID          |
| role     | 用户角色     | 0：普通租客，1：房东 |
| wxinfo   | 微信用户信息 | Object               |
| userinfo | 用户基本信息 | 姓名打电话等         |

- 响应数据

```json
{
  "data": {
    "role": 1,
    "wxinfo": {
      "nickName": "鸭滑",
      "gender": 0,
      "language": "zh_CN",
      "city": "Guangzhou",
      "province": "Guangdong",
      "country": "China",
      "avatarUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIKicibicTUKHLXqvichD90VyvzSeTuFVfPqn1y25ibIST2TsWDeUsfD6ibljd7FR26kDicEdlA5qhHXxh4g/132"
    },
    "userinfo": {
      "name": "鸭滑",
      "phone": "13636065890",
      "idcard": "421125099821003748",
      "city": "深圳市",
      "area": "南山区",
      "town": "学府村"
    }
  },
  "meta": {
    "status": 200,
    "msg": "信息更新成功"
  }
}
```

### 1.3.2. 房东认证

- 请求路径：login/authidentity
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 用户 ID  | 不能为空 |
| name   | 姓名     | 不能为空 |
| phone  | 电话号   | 不能为空 |
| idcard | 身份证号 | 不能为空 |
| city   | 城市     | 不能为空 |
| area   | 区       | 不能为空 |
| town   | 镇       | 不能为空 |

- 响应参数

| 参数名   | 参数说明     | 备注                 |
| -------- | ------------ | -------------------- |
| role     | 用户角色     | 0：普通租客，1：房东 |
| wxinfo   | 微信用户信息 | Object               |
| userinfo | 用户基本信息 | 姓名打电话等         |

- 响应数据

```json
{
  "data": {
    "role": 1,
    "wxinfo": {
      "nickName": "洲际捣蛋",
      "gender": 1,
      "language": "zh_CN",
      "city": "Guangzhou",
      "province": "Guangdong",
      "country": "China",
      "avatarUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIKicibicTUKHLXqvichD90VyvzSeTuFVfPqn1y25ibIST2TsWDeUsfD6ibljd7FR26kDicEdlA5qhHXxh4g/132"
    },
    "userinfo": {
      "name": "蜡笔小新",
      "phone": "13636065890",
      "idcard": "421125099821003748",
      "city": "深圳市",
      "area": "南山区",
      "town": "学府村"
    }
  },
  "meta": {
    "status": 200,
    "msg": "认证成功"
  }
}
```

## 1.4. 房屋管理

- 房屋管理属于房东权限范围，服务端需要判断用户身份角色
- **请求头添加 authorization 字段，值为用户唯一 ID**

### 1.4.1. 添加房屋

- 请求路径：build/add
- 请求方法：post
- 请求参数

| 参数名     | 参数说明                                                                          | 备注     |
| ---------- | --------------------------------------------------------------------------------- | -------- |
| landlordId | 用户 ID （需要房东认证）                                                          | 不能为空 |
| buildInfo  | 公寓信息：{name,layer,count,net,electricity,water }                               | 不能为空 |
| houseType  | 户型:[ {unitType,bathroom ,air_condition ,geyser ,gas ,broadband ,clear ,rent } ] | 不能为空 |

```json
{
  "landlordId": "5fa242eae4bf8b369c2af91a",
  "buildInfo": {
    "name": "香蕉公寓",
    "layer": "5",
    "count": "10",
    "net": "5",
    "electricity": "5",
    "water": "5"
  },
  "houseType": [
    {
      "unitType": 1,
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0,
      "clear": 1000,
      "rent": 200
    }
  ]
}
```

- 响应参数

| 参数名     | 参数说明         | 备注                          |
| ---------- | ---------------- | ----------------------------- |
| houseType  | 公寓所有户型信息 | 数组对象                      |
| landlordId | 房东 ID          | 房东唯一 ID                   |
| \_id       | 公寓 ID          | 公寓唯一 ID                   |
| buildInfo  | 建筑基本         | 对象 记录层数，每层户数，名称 |
| buildCost  | 建筑费用         | 记录网费、水费、电费          |

- 响应数据

```json
{
  "data": {
    "houseType": [
      {
        "unitType": 5,
        "bathroom": 0,
        "air_condition": 0,
        "geyser": 0,
        "gas": 0,
        "broadband": 0,
        "clear": 1000,
        "rent": 200
      }
    ],
    "_id": "5fa2575e92cd3112041e3e7d",
    "landlordId": "5fa242eae4bf8b369c2af91a",
    "buildInfo": {
      "buildName": "香蕉公寓",
      "buildLayer": "5",
      "layerCount": "10"
    },
    "buildCost": {
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  },
  "meta": {
    "status": 200,
    "msg": "添加成功"
  }
}
```

### 1.4.2. 获取房东所有公寓

- 请求路径：/build/allbuild
- 请求方法：post
- 请求参数

| 参数名 | 参数说明                 | 备注     |
| ------ | ------------------------ | -------- |
| id     | 用户 ID （需要房东认证） | 不能为空 |

- 响应参数

| 参数名 | 参数说明                       | 备注                                      |
| ------ | ------------------------------ | ----------------------------------------- |
| rooms  | 数组对象，对象内字段是房间信息 | 第一栋公寓所有房间信息                    |
| ret    | 数组对象，对象内公寓信息       | \_id：公寓唯一 ID, buildInfo:公寓基本信息 |

- 响应数据

```json
{
"data": {
        "ret": [
                  {
                  "_id": "5fa2575e92cd3112041e3e7d",
                  "buildInfo": {
                    "buildName": "香蕉公寓",
                    "buildLayer": "5",
                    "layerCount": "10"
                  }

        ],
                "rooms": [
                  {
                "houseStatus": 0,
                "_id": "5fa2575e92cd3112041e3e7e",
                "houseName": "101房",
                "houseType": 1,
                "houseConfig": {
                    "bathroom": 0,
                    "air_condition": 0,
                    "geyser": 0,
                    "gas": 0,
                    "broadband": 0
                },
                "houseCost": {
                    "clear": 1000,
                    "rent": 200,
                    "net": "5",
                    "electricity": "5",
                    "water": "5"
                }
            }]
},
    "meta": {
        "status": 200,
        "msg": "查询成功"
    }
```

### 1.4.3. 根据 公寓 ID 获取公寓信息

- 请求路径：/build/buildinfo
- 请求方法：post
- 请求参数

| 参数名 | 参数说明    | 备注     |
| ------ | ----------- | -------- |
| id     | 公寓唯一 ID | 不能为空 |

- 响应参数

| 参数名    | 参数说明                      | 备注                       |
| --------- | ----------------------------- | -------------------------- |
| houseType | 户型：数组对象                | 记录批量生成房间的数据模型 |
| buildInfo | 公寓信息:名称，层数，每层户数 | 公寓基本信息               |
| buildCost | 公寓费用:网费、电费、水费     | 公寓基本信息               |

- 响应参数

```json
{
  "data": {
    "houseType": [
      {
        "unitType": 5,
        "bathroom": 0,
        "air_condition": 0,
        "geyser": 0,
        "gas": 0,
        "broadband": 0,
        "clear": 1000,
        "rent": 200
      }
    ],
    "buildInfo": {
      "buildName": "香蕉公寓",
      "buildLayer": "5",
      "layerCount": "10"
    },
    "buildCost": {
      "net": "5",
      "electricity": "5",
      "water": "5"
    }
  },
  "meta": {
    "status": 200,
    "msg": "信息获取成功"
  }
}
```

### 1.4.4. 根据 公寓 ID 修改公寓信息

- 请求路径：/build/buildupdata
- 请求方法：post
- 请求参数

| 参数名    | 参数说明               | 备注     |
| --------- | ---------------------- | -------- |
| id        | 公寓唯一 ID            | 不能为空 |
| buildInfo | 对象类型：公寓基本信息 | 不能为空 |
| houseType | 数组对象：户型数组     | 不能为空 |

```json
{
  "id": "5fa2575e92cd3112041e3e7d",
  "buildInfo": {
    "name": "辣椒公寓",
    "layer": "5",
    "count": "10",
    "net": "5",
    "electricity": "5",
    "water": "5"
  },
  "houseType": [
    {
      "unitType": 5,
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0,
      "clear": 1000,
      "rent": 200
    }
  ]
}
```

- 响应参数

| 参数名     | 参数说明           | 备注         |
| ---------- | ------------------ | ------------ |
| \_id       | 公寓唯一 ID        |              |
| landlordId | 房东唯一 ID        | 需要用户认证 |
| buildInfo  | 公寓基本信息：对象 |              |
| buildCost  | 公寓基本费用：对象 |              |
| houseType  | 数组对象：户型数组 |              |

- 响应参数

```json
{
  "data": {
    "houseType": [
      {
        "unitType": 5,
        "bathroom": 0,
        "air_condition": 0,
        "geyser": 0,
        "gas": 0,
        "broadband": 0,
        "clear": 1000,
        "rent": 200
      }
    ],
    "_id": "5fa2575e92cd3112041e3e7d",
    "landlordId": "5fa242eae4bf8b369c2af91a",
    "buildInfo": {
      "buildName": "辣椒公寓",
      "buildLayer": "5",
      "layerCount": "10"
    },
    "buildCost": {
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  },
  "meta": {
    "status": 200,
    "msg": "信息修改成功"
  }
}
```

### 1.4.5. 根据 公寓 ID 返回 公寓内的房间

- 请求路径：/build/allhouse
- 请求方法：post
- 请求参数

| 参数名 | 参数说明    | 备注     |
| ------ | ----------- | -------- |
| id     | 公寓唯一 ID | 不能为空 |

- 响应参数

```json
[
  {
    "houseStatus": 0,
    "_id": "5fa2575e92cd3112041e3e7e",
    "houseName": "101房",
    "houseType": 1,
    "houseConfig": {
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0
    },
    "houseCost": {
      "clear": 1000,
      "rent": 200,
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  },
  {
    "houseStatus": 0,
    "_id": "5fa2575e92cd3112041e3e7e",
    "houseName": "101房",
    "houseType": 1,
    "houseConfig": {
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0
    },
    "houseCost": {
      "clear": 1000,
      "rent": 200,
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  }
]
```

### 1.4.6. 根据 公寓 ID 返回 公寓内的房间

- 请求路径：/build/house/:type/:page/:size/:status
- 请求方法：post
- 请求参数

| 参数名 | 参数说明                                  | 备注           |
| ------ | ----------------------------------------- | -------------- |
| id     | 公寓唯一 ID                               | 请求体中的参数 |
| type   | 房间户型 Number                           | 地址参数       |
| page   | 第几页 Number                             | 地址参数       |
| size   | 每页容量 Number                           | 地址参数       |
| status | 未发布：0 发布未出租：1 已出租：2 ;Number | 地址参数       |

```json
请求地址：http://localhost:3001/build/house/2/1/10/1
请求体
{
    "id": "5fa2575e92cd3112041e3e7d"
}
```

- 响应参数

```json
{
  "data": [
    // 数组内是 房间的信息
    {
      "houseStatus": 0,
      "_id": "5fa2575e92cd3112041e3e87",
      "houseName": "110房",
      "houseType": 1,
      "houseConfig": {
        "bathroom": 0,
        "air_condition": 0,
        "geyser": 0,
        "gas": 0,
        "broadband": 0
      },
      "houseCost": {
        "clear": 1000,
        "rent": 200,
        "net": "5",
        "electricity": "5",
        "water": "5"
      },
      "__v": 0
    }
  ],
  "count": 10, // 条件参数所命中的统计数
  "meta": {
    "status": 200,
    "msg": "条件查询成功"
  }
}
```

### 1.4.7. 房屋 ID 出租屋状态

**enum: [0, 1, 2], // 未发布 发布未出租 已出租**

- 请求路径：/build/changestatus
- 请求方法：post
- 请求参数

| 参数名 | 参数说明      | 备注                                    |
| ------ | ------------- | --------------------------------------- |
| id     | 出租屋唯一 ID |                                         |
| status | 状态值        | （0：未发布，1：发布未出租，2：已出租） |

- 响应参数

| 参数名      | 参数说明                                     | 备注 |
| ----------- | -------------------------------------------- | ---- |
| houseStatus | 出租屋状态 未发布：0 发布未出租：1 已出租：2 |      |
| \_id        | 出租屋唯一 ID                                |      |
| houseName   | 出租屋名称                                   |      |
| houseType   | 出租屋户型                                   |      |
| houseConfig | 出租屋基本配置                               |      |
| houseCost   | 出租屋基本消费                               |      |

- 返回参数

```json
{
  "data": {
    "houseStatus": 2,
    "_id": "5fa2575e92cd3112041e3e7e",
    "houseName": "101房",
    "houseType": 1,
    "houseConfig": {
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0
    },
    "houseCost": {
      "clear": 1000,
      "rent": 200,
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  },
  "meta": {
    "status": 200,
    "msg": "状态改变成功"
  }
}
```

### 1.4.8. 房屋 ID 房间信息更新

- 请求路径：/build/houseupdata
- 请求方法：post
- 请求参数

| 参数名      | 参数说明       | 备注 |
| ----------- | -------------- | ---- |
| id          | 出租屋唯一 ID  |      |
| houseName   | 房间名称       |      |
| houseType   | 出租屋户型     |      |
| houseConfig | 出租屋基本配置 |      |
| houseCost   | 出租屋消费     |      |

```json
{
  "id": "5fa2575e92cd3112041e3e7e",
  "houseName": "1024房",
  "houseType": 2,
  "houseConfig": {
    "bathroom": 0,
    "air_condition": 0,
    "geyser": 0,
    "gas": 0,
    "broadband": 0
  },
  "houseCost": {
    "clear": 1000,
    "rent": 200,
    "net": 5,
    "electricity": 5,
    "water": 6
  }
}
```

- 响应数据

| 参数名      | 参数说明       | 备注 |
| ----------- | -------------- | ---- |
| id          | 出租屋唯一 ID  |      |
| houseName   | 房间名称       |      |
| houseType   | 出租屋户型     |      |
| houseConfig | 出租屋基本配置 |      |
| houseCost   | 出租屋消费     |      |

```json
{
  "data": null,
  "meta": {
    "status": 200,
    "msg": "信息更新成功"
  }
}
```

### 1.4.9. 房东新加房

- 请求路径：/build/newhouse
- 请求方法：post
- 请求参数

| 参数名      | 参数说明       | 备注 |
| ----------- | -------------- | ---- |
| buildId     | 公寓唯一 ID    |      |
| houseName   | 房间名称       |      |
| houseType   | 出租屋户型     |      |
| houseConfig | 出租屋基本配置 |      |
| houseCost   | 出租屋消费     |      |

- 响应参数

| 参数名      | 参数说明                                     | 备注 |
| ----------- | -------------------------------------------- | ---- |
| houseStatus | 出租屋状态 未发布：0 发布未出租：1 已出租：2 |      |
| \_id        | 出租屋唯一 ID                                |      |
| houseName   | 出租屋名称                                   |      |
| houseType   | 出租屋户型                                   |      |
| houseConfig | 出租屋基本配置                               |      |
| houseCost   | 出租屋基本消费                               |      |

## 1.5. 通用接口（无权限限制）

### 1.5.1. 房屋 ID 查询房屋具体信息

- 请求路径：/query/houseinfo
- 请求方法：post
- 请求参数

| 参数名 | 参数说明      | 备注           |
| ------ | ------------- | -------------- |
| id     | 出租屋唯一 ID | 请求体中的参数 |

- 响应参数

| 参数名      | 参数说明                                     | 备注 |
| ----------- | -------------------------------------------- | ---- |
| houseStatus | 出租屋状态 未发布：0 发布未出租：1 已出租：2 |      |
| \_id        | 出租屋唯一 ID                                |      |
| houseName   | 出租屋名称                                   |      |
| houseType   | 出租屋户型                                   |      |
| houseConfig | 出租屋基本配置                               |      |
| houseCost   | 出租屋基本消费                               |      |

```json
{
  "data": {
    "houseStatus": 0,
    "_id": "5fa2575e92cd3112041e3e7e",
    "houseName": "101房",
    "houseType": 1,
    "houseConfig": {
      "bathroom": 0,
      "air_condition": 0,
      "geyser": 0,
      "gas": 0,
      "broadband": 0
    },
    "houseCost": {
      "clear": 1000,
      "rent": 200,
      "net": "5",
      "electricity": "5",
      "water": "5"
    },
    "__v": 0
  },
  "meta": {
    "status": 200,
    "msg": "查询成功"
  }
}
```
