// pages/searchList/searchList.js
import request from "../../util/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchListData: [],
    showIconGood: true,
    showIconSort: true,
    active: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.title,
    });
    this.getList(options.id);
  },
  getList(id) {
    console.log(id, "categoryId");
    request({
      url: `/categories/${id}?_embed=goods`,
    })
      .then((res) => {
        this.setData({
          searchListData: res.goods,
        });
        console.log(res, "resssss");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  toDetail(el) {
    let id = el.currentTarget.dataset.id;
    let title = el.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    });
  },
  sortPlanItmeGood() {
    this.setData({
      active: true,
      showIconGood: !this.data.showIconGood,
    });
    this.setData({
      searchListData: this.data.showIconGood
        ? this.data.searchListData.sort((item1, item2) => {
            return parseInt(item1.goodcomment) - parseInt(item2.goodcomment);
          })
        : this.data.searchListData.sort((item1, item2) => {
            return parseInt(item2.goodcomment) - parseInt(item1.goodcomment);
          }),
    });
  },
  sortPlanItmeSort() {
    this.setData({
      active: false,
      showIconSort: !this.data.showIconSort,
    });
    this.setData({
      searchListData: this.data.showIconSort
        ? this.data.searchListData.sort((item1, item2) => {
            return item1.price - item2.price;
          })
        : this.data.searchListData.sort((item1, item2) => {
            return item2.price - item1.price;
          }),
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
});
