// pages/telform/telform.js
import Notify from "@vant/weapp/notify/notify";
import request from "../../util/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    tel: "",
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
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  getAuth() {
    this.showPopup();
  },
  // 手机号码表单
  formSubmit(e) {
    this.setData({
      tel: e.detail.value.input,
    });
    const userInfo = wx.getStorageSync("token");
    console.log(this.data.tel, "userInfo");
    wx.setStorageSync("tel", this.data.tel);
    Notify({ type: "success", message: "提交成功" });
    request({
      url: `/users?nickName=${userInfo.nickName}&tel=${this.data.tel}`,
    }).then((res) => {
      console.log(res, "ssssss");
      if (res.length === 0) {
        request({
          url: "/users",
          method: "POST",
          data: {
            nickName: userInfo.nickName,
            gender: 1,
            language: userInfo.language,
            city: userInfo.city,
            province: "Liaoning",
            country: "China",
            avatarUrl: userInfo.avatarUrl,
            tel: this.data.tel,
          },
        });
      } else {
        Notify({ type: "success", message: "该号码已存在" });
      }
    });
    setTimeout(() => {
      wx.switchTab({
        url: "/pages/shoper/shoper",
      });
    }, 600);
  },
  formReset(e) {
    this.setData({
      tel: "",
    });
  },
});
