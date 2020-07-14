const Shop = require('../models/Shop')

exports.getBanner = ctx => {
  ctx.body = {
    meta: {
      code: 200,
      msg: '商品轮播图获取成功'
    },
    body: [
      { id: 1, imgUrl: '/images/banner/FOOD.jpg' },
      { id: 2, imgUrl: '/images/banner/KV-BEV.jpg' },
      { id: 3, imgUrl: '/images/banner/MERCH.jpg' },
      { id: 4, imgUrl: '/images/banner/MSR.jpg' }
    ]
  }
}

exports.getShopList = async ctx => {
  // 查询所有数据
  const res = await Shop.findAll()
  // 格式化为对象
  const data = JSON.parse(JSON.stringify(res))

  // 定义每个分类的空数组
  const food = []
  const coffee = []
  const beverages = []

  // 遍历查询结果
  for (const shop of data) {
    if (shop.shop_cate === 'food') {
      food.push(shop)
    } else if (shop.shop_cate === 'coffee') {
      coffee.push(shop)
    } else if (shop.shop_cate === 'beverages') {
      beverages.push(shop)
    }
  }

  ctx.body = {
    meta: {
      code: 200,
      msg: '商品数据获取成功'
    },
    body: {
      beverages: {
        id: 1,
        text: '饮品',
        model: {
          cup: [
            { id: 0, title: '小杯', price: 0 },
            { id: 1, title: '中杯', price: 3 },
            { id: 2, title: '小杯', price: 5 }
          ],
          temperature: [
            { id: 0, title: '常温' },
            { id: 1, title: '冰' },
            { id: 2, title: '热' }
          ],
          sweetness: [
            { id: 0, title: '无糖' },
            { id: 0, title: '半糖' },
            { id: 0, title: '全糖' }
          ]
        },
        data: beverages
      },
      coffee: {
        id: 2,
        text: '咖啡',
        model: {
          cup: [
            { id: 0, title: '小杯', price: 0 },
            { id: 1, title: '中杯', price: 3 },
            { id: 2, title: '小杯', price: 5 }
          ],
          temperature: [
            { id: 0, title: '常温' },
            { id: 1, title: '加冰' },
            { id: 2, title: '加热' }
          ],
          sweetness: [
            { id: 0, title: '无糖' },
            { id: 1, title: '少糖' },
            { id: 2, title: '多糖' }
          ]
        },
        data: coffee
      },
      food: {
        id: 3,
        text: '食物',
        data: food
      }
    }
  }
}

exports.test = ctx => {
  ctx.body = ctx.user
}
