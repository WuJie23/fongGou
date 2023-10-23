import request from "../../util/request";
import checkAuth from "../../util/auth.js";

// pages/shoper/shoper.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // itemchecked: true,
    checked: false,
    getShoperListData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options, "itemNumber");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(event) {
    // event.currentTarget.dataset.goodid
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (val) {
    checkAuth(() => {
      const username = wx.getStorageSync("token").nickName;
      const tel = wx.getStorageSync("tel");
      console.log(username, tel, "resresusername");

      request({
        url: `/carts?_expand=good&username=${username}&tel=${tel}`,
      }).then((res) => {
        this.setData({
          getShoperListData: res,
        });

        const isAllTrue = this.data.getShoperListData.every((data) => {
          return data.checked === true;
        });
        if (isAllTrue) {
          this.setData({
            checked: true,
          });
          // this.onShow();
        } else {
          this.setData({
            checked: false,
          });
        }
      });
    });
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

  onChangeCheckboxItem(event) {
    const goodItem = event.currentTarget.dataset.item;
    console.log(event.currentTarget.dataset.item, "goodItemId");
    request({
      url: `/carts/${goodItem.id}`,
      method: "put",
      data: {
        username: goodItem.username,
        tel: goodItem.tel,
        goodId: goodItem.goodId,
        number: goodItem.number,
        checked: event.detail,
      },
    }).then((res) => {
      this.onShow("Checkbox");
    });
  },

  //获取数据

  onChangeCheckbox(event) {
    this.setData({
      getShoperListData: this.data.getShoperListData.map((data) => {
        return {
          ...data,
          checked: event.detail,
        };
      }),
    });

    this.setData({
      checked: event.detail,
    });
  },
  onChangeStepper(event) {
    const goodItem = event.currentTarget.dataset.item;
    request({
      url: `/carts/${goodItem.id}`,
      method: "put",
      data: {
        username: goodItem.username,
        tel: goodItem.tel,
        goodId: goodItem.goodId,
        number: event.detail,
        checked: goodItem.checked,
      },
    }).then((res) => {
      this.onShow();
    });
  },
  onClickButton() {
    wx.showToast({
      title: "提交成功",
    });
  },
  deledetCell(evt) {
    let id = evt.currentTarget.dataset.cellid;
    this.setData({
      getShoperListData: this.data.getShoperListData.filter((item) => {
        return item.id !== id;
      }),
    });
    request({
      url: `/carts/${id}`,
      method: "delete",
    }).then(() => {
      wx.showToast({
        title: "删除成功",
      });
    });
  },
});
