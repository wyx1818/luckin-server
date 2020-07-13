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
  const res = await Shop.findAll()
  const data = JSON.parse(JSON.stringify(res))

  const food = []
  const coffee = []
  const beverages = []

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
        name: '饮品',
        data: beverages
      },
      coffee: {
        id: 2,
        name: '咖啡',
        data: coffee
      },
      food: {
        id: 3,
        name: '食物',
        data: food
      }
    }

  }
}

exports.test = ctx => {
  ctx.body = '测试'
}
