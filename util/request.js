function request(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: "http://localhost:5000" + params.url,

      success: function (res) {
        // success
        resolve(res.data);
      },
      fail: function (err) {
        // fail
        reject(err);
      },
    });
  });
}
export default request;
