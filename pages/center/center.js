// pages/center/center.js
import request from "../../util/request";
import checkAuth from "../../util/auth.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getListData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    checkAuth(() => {
      this.setData({
        getListData: wx.getStorageSync("token"),
      });
    });
    console.log(this.data.getListData);
  },

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
  changeImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        // const tempFilePaths = res.tempFilePaths;
        this.setData({
          getListData: {
            ...this.data.getListData,
            avatarUrl: res.tempFilePaths[0],
          },
        });
        wx.setStorageSync("token", {
          ...wx.getStorageSync("token"),
          avatarUrl: res.tempFilePaths[0],
        });
      },
    });
  },
});
