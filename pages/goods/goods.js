// pages/goods/goods.js
Page({
  data: {
    scrollTop: 0,
    goods: [
      {
        "name": "热销榜",
        "id": 1,
          "foods": [
            {
              "id": 11,
              "name": "皮蛋瘦肉粥",
              "description": "咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥",
              "other": 20,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": [
                {
                  "id": 111,
                  "name": "规格",
                  "type": [{ "id": 1111, "price": 1, "name": "粗" }, { "id": 1112, "price": 2, "name": "细" }, { "id": 1113, "price": 3, "name": "宽" }, { "id": 1114, "price": 4, "name": "长" }]
                },
                {
                  "id": 112,
                  "name": "尺码",
                  "type": [{ "id": 1121, "price": 1, "name": "原汤" }, { "id": 1122, "price": 2, "name": "微辣" }, { "id": 1123, "price": 3, "name": "中辣" }, { "id": 1124, "price": 4, "name": "重辣" }]
                }
              ]
            },
            {
              "id": 12,
              "name": "扁豆焖面",
              "description": "扁豆焖面",
              "other": 14,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": [
                {
                  "id": 121,
                  "name": "规格2",
                  "type": [{ "id": 1211, "price": 21, "name": "粗2" }, { "id": 1212, "price": 22, "name": "细2" }, { "id": 1213, "price": 23, "name": "宽2" }, { "id": 1214, "price": 24, "name": "长2" }]
                },
                {
                  "id": 122,
                  "name": "尺码",
                  "type": [{ "id": 1221, "price": 11, "name": "原汤2" }, { "id": 1222, "price": 12, "name": "微辣2" }, { "id": 1223, "price": 13, "name": "中辣2" }, { "id": 1224, "price": 14, "name": "重辣2" }]
                }
              ]
            },
            {
              "id": 13,
              "name": "皮蛋瘦肉粥",
              "description": "咸粥",
              "other": 20,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            },
            {
              "id": 14,
              "name": "扁豆焖面",
              "description": "扁豆焖面",
              "other": 14,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            },
            {
              "id": 15,
              "name": "皮蛋瘦肉粥",
              "description": "咸粥",
              "other": 20,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            },
            {
              "id": 16,
              "name": "扁豆焖面",
              "description": "扁豆焖面",
              "other": 14,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            },
            {
              "id": 17,
              "name": "皮蛋瘦肉粥",
              "description": "咸粥",
              "other": 20,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            },
            {
              "id": 18,
              "name": "扁豆焖面",
              "description": "扁豆焖面",
              "other": 14,
              "price": 15,
              "count": 0,
              "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
              "rule": []
            }
        ]
      },
      {
        "name": "单人精彩套餐",
        "id": 2,
        "foods": [
          {
            "id": 21,
            "name": "红枣山药粥套餐",
            "description": "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
            "other": 36,
            "price": 29,
            "count": 0,
            "image": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "冰爽饮品限时特惠",
        "id": 3,
        "foods": [
          {
            "id": 31,
            "name": "VC无限橙果汁",
            "description": "VC无限橙果汁VC无限橙果汁VC无限橙果汁",
            "other": 10,
            "price": 8,
            "count": 0,
            "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "精选热菜",
        "id": 4,
        "foods": [
          {
            "id": 41,
            "name": "娃娃菜炖豆腐",
            "price": 17,
            "other": 20,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 42,
            "name": "手撕包菜",
            "price": 16,
            "oldPrice": 19,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 43,
            "name": "娃娃菜炖豆腐",
            "price": 17,
            "other": 20,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 44,
            "name": "手撕包菜",
            "price": 16,
            "oldPrice": 19,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "爽口凉菜",
        "id": 5,
        "foods": [
          {
            "id": 51,
            "name": "八宝酱菜",
            "price": 4,
            "other": 9,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 52,
            "name": "拍黄瓜",
            "price": 9,
            "other": 12,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "精选套餐",
        "id": 6,
        "foods": [
          {
            "id": 61,
            "name": "红豆薏米粥套餐",
            "price": 37,
            "other": 40,
            "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 62,
            "name": "皮蛋瘦肉粥套餐",
            "price": 37,
            "other": 40,
            "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 63,
            "name": "红豆薏米粥套餐",
            "price": 37,
            "other": 40,
            "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "果拼果汁",
        "id": 7,
        "foods": [
          {
            "id": 71,
            "name": "蜜瓜圣女萝莉杯",
            "price": 6,
            "other": 10,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 72,
            "name": "蜜瓜圣女萝莉杯",
            "price": 6,
            "other": 10,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 73,
            "name": "蜜瓜圣女萝莉杯",
            "price": 6,
            "other": 10,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "小吃主食",
        "id": 8,
        "foods": [
          {
            "id": 81,
            "name": "扁豆焖面",
            "price": 14,
            "other": 16,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 82,
            "name": "扁豆焖面",
            "price": 14,
            "other": 16,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 83,
            "name": "扁豆焖面",
            "price": 14,
            "other": 16,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 84,
            "name": "扁豆焖面",
            "price": 14,
            "other": 16,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 85,
            "name": "扁豆焖面",
            "price": 14,
            "other": 16,
            "description": "",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      },
      {
        "name": "特色粥品",
        "id": 9,
        "foods": [
          {
            "id": 91,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 92,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 93,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 94,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 95,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          },
          {
            "id": 96,
            "name": "皮蛋瘦肉粥",
            "price": 10,
            "other": 15,
            "description": "咸粥",
            "count": 0,
            "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
          }
        ]
      }
    ],
    toView: 'order0',
    totalPrice: 0,// 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    shopcartListMask: false,
    ruleMask: false,
    curAddFood: null,
    ruleChoose: {}
  },
  // 选择商品规格
  chooseRuleType(e) {
    let ruleId = e.currentTarget.dataset.ruleid;
    let typeId = e.currentTarget.dataset.typeid;
    let curAddFood = this.data.curAddFood
    curAddFood.rule.forEach(el => {
      if (el.id === ruleId) {
        el.type.forEach(el2 => {
          el2["chooseClass"] = false
          if (el2.id === typeId) {
            el2["chooseClass"] = true
          }
        })
      }
    })
    curAddFood["nowPrice"] = curAddFood["price"]
    curAddFood["des"] = ""
    curAddFood.rule.forEach(el => {
      el.type.forEach(el2 => {
        if (el2["chooseClass"]) {
          curAddFood["nowPrice"] += el2.price
          curAddFood["des"] += (el2.name + "/")
        }
      })
    })
    curAddFood["des"] = curAddFood["des"].substr(0, curAddFood["des"].length - 1);
    this.setData({
      curAddFood: curAddFood
    })
  },
  // 商品规格选择好了
  chooseRuleOk(e) {
    let id = e.currentTarget.dataset.id;
    this.data.goods.forEach(el => {
      el.foods.forEach(el2 => {
        if (el2.id == id) {
          el2.count++
        }
      })
    })
    let curAddFood = this.data.curAddFood
    curAddFood.rule.forEach(el => {
      curAddFood["nowId"] += String(el.id)
      el.type.forEach(el2 => {
        if (el2["chooseClass"]) {
          curAddFood["nowId"] += String(el2.id)
        }
      })
    })
    let carIdArray = []
    this.data.carArray.forEach(el => {
      carIdArray.push(el.nowId)
      if (el.nowId == curAddFood.nowId) {
        el.count++
      }
    })
    if (!carIdArray.includes(curAddFood.nowId)) {
      curAddFood["count"] = 1
      this.data.carArray.push(curAddFood)
    }
    this.setData({
      goods: this.data.goods,
      carArray: this.data.carArray
    })
    this.calTotalPrice();
    this.closeRuleMask()
  },
  // 关闭选择规格
  closeRuleMask () {
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    });
    animation.translateY("100%").step()
    this.setData({
      ruleMaskAni: animation.export()
    })
    setTimeout(() => {
      this.setData({
        curAddFood: null,
        ruleMask: false
      })
    }, 500)
  },
  // 滑动固定tab
  clickScroll() {
    this.setData({
      scrollTop: "340rpx"
    })
  },
  // 选择菜单
  selectMenu: function (e) {
    let index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
    })
  },
  //添加到购物车
  addCart(e) {
    let food = e.currentTarget.dataset.food;
    let shopcart = e.currentTarget.dataset.shopcart;
    let nowId = food.nowId;
    if (shopcart == 1) {
      let id = food.nowId;
      this.data.goods.forEach(el => {
        el.foods.forEach(el2 => {
          if (el2.id == id) {
            el2.count++
          }
        })
      })
      let carIdArray = []
      this.data.carArray.forEach(el => {
        carIdArray.push(el.nowId)
        if (el.nowId == nowId) {
          el.count++
        }
      })
      this.setData({
        goods: this.data.goods,
        carArray: this.data.carArray
      })
      this.calTotalPrice();
    } else {
      food["des"] = ""
      if (food.rule.length == 0) {
        this.data.goods.forEach(el => {
          el.foods.forEach(el2 => {
            if (el2.nowId == nowId) {
              el2.count++
              food = el2
            }
          })
        })
        let carIdArray = []
        this.data.carArray.forEach(el => {
          carIdArray.push(el.nowId)
          if (el.nowId == nowId) {
            el = food
          }
        })
        if (!carIdArray.includes(nowId)) {
          this.data.carArray.push(food)
        }
        this.setData({
          goods: this.data.goods,
          carArray: this.data.carArray
        })
        this.calTotalPrice();
      } else {
        food["des"] = "无"
        food.rule.forEach(el => {
          el.type[0]["chooseClass"] = true
          food["nowPrice"] += el.type[0].price
        })
        this.setData({
          curAddFood: food,
          ruleMask: true
        })
        let animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease'
        });
        animation.translateY(0).step()
        this.setData({
          ruleMaskAni: animation.export()
        })
      }
    }
  },
  //移除商品
  decreaseCart(e) {
    let food = e.currentTarget.dataset.food;
    let shopcart = e.currentTarget.dataset.shopcart;
    if (shopcart == 2) {
      wx.showToast({
        title: '多规格以及带属性商品只能去购物车删除哦',
        icon: 'none',
        duration: 2000
      })
    } else {
      let nowId = food.nowId;
      let id = food.id;
      this.data.goods.forEach((el) => {
        el.foods.forEach((el2) => {
          if (el2.id == id && el2.count > 0) {
            el2.count--
          }
        })
      })
      this.data.carArray.forEach((el) => {
        if (el.nowId == nowId) {
          el.count--
        }
      })
      let carArrayNew = this.data.carArray.filter(item => item.count > 0);
      this.setData({
        carArray: carArrayNew,
        goods: this.data.goods
      })
      this.calTotalPrice()
    }
  },
  //计算总价
  calTotalPrice: function () {
    let carArray = this.data.carArray;
    let totalPrice = 0;
    let totalCount = 0;
    for (let i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].nowPrice * carArray[i].count;
      totalCount += carArray[i].count
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
    });
    if (this.data.totalCount == 0) {
      this.setData({
        shopcartListMask: false,
      })
    }
  },
  // 清空购物车
  empty () {
    this.data.goods.forEach((el) => {
      el.foods.forEach((el2) => {
        el2.count = 0
      })
    })
    this.setData({
      carArray: [],
      goods: this.data.goods
    })
    this.calTotalPrice()
  },
  //結算
  pay() {
    if (this.data.totalCount) {
      let resultType = "success";
      wx.redirectTo({
        url: '../goods/pay/pay?resultType=' + resultType
      })
    }
  },
  // 购物车显示/隐藏
  toggleList: function () {
    if (this.data.totalCount) {
      this.setData({
        shopcartListMask: !this.data.shopcartListMask,
      })
    }
  },
  onLoad: function (options) {
    this.data.goods.forEach(el => {
      el.foods.forEach(el2 => {
        el2["nowId"] = el2.id
        el2["nowPrice"] = el2.price
      })
    })
    this.setData({
      goods: this.data.goods
    })
  },
  onReady: function () {
      // 页面渲染完成
  },
  onShow: function () {
      // 页面显示
  },
  onHide: function () {
      // 页面隐藏
  },
  onUnload: function () {
      // 页面关闭
  }
})
