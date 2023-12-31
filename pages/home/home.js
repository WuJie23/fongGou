// pages/home/home.js

import request from "../../util/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    goodsData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getHomeData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  getHomeData() {
    const requestAll = [
      request({
        url: "/recommends",
      }),
      request({
        url: "/goods",
      }),
    ];
    Promise.all(requestAll)
      .then(([data1, data2]) => {
        this.setData({
          swiperData: data1,
          goodsData: data2,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // toSearch
  toSearch() {
    wx.navigateTo({
      url: "/pages/search/search",
    });
  },
  // toDetail
  toDetail(el) {
    console.log(el.currentTarget.dataset, "eleelellll");
    let id = el.currentTarget.dataset.id;
    let title = el.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    });
  },
});
