// pages/detail/detail.js
import request from "../../util/request";
import checkAuth from "../../util/auth.js";
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 跳转购物车
  onClickCar() {
    checkAuth(() => {
      wx.switchTab({
        url: "/pages/shoper/shoper",
      });
    });
  },
  // Add To Car
  onAddGoodsToCar() {
    checkAuth(() => {
      const username = wx.getStorageSync("token").nickName;
      const tel = wx.getStorageSync("tel");
      const id = this.data.detailData.id;
      request({
        url: `/carts?username=${username}&tel=${tel}&goodId=${id}`,
        // data: {
        //   username,
        //   tel,
        //   id,
        // },
      })
        .then((res) => {
          console.log(res, "re88s");
          if (res.length === 0) {
            // console.log(res, "没有数据");

            request({
              url: "/carts",
              method: "POST",
              data: {
                username: username,
                tel: tel,
                goodId: id,
                number: 1,
                checked: false,
              },
            });
          } else {
            request({
              url: `/carts/${res[0].id}`,
              method: "PUT",
              data: {
                ...res[0],
                number: res[0].number + 1,
              },
            });
          }
        })
        .then(() => {
          wx.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2000,
          });
        });
    });
    0;
  },
});
