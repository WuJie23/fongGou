// pages/detail/detail.js
import request from "../../util/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailData: null,
    commentsData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDetaiData(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.options.title,
    });
    this.getCommentsData();
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

  getDetaiData(id) {
    request({
      url: `/goods/${id}`,
    })
      .then((res) => {
        this.setData({
          detailData: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  previewImg(evt) {
    wx.previewImage({
      current: evt.currentTarget.dataset.current, // 当前显示图片的http链接
      urls: this.data.detailData.slides.map((item) => {
        return `http://localhost:5000${item}`;
      }), // 需要预览的图片http链接列表
    });
  },

  getCommentsData() {
    console.log("点击了");
    request({
      url: `/comments`,
    })
      .then((res) => {
        this.setData({
          commentsData: res,
        });
        console.log(res, "resssss");
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
