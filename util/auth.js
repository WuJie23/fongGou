function checkAuth(e) {
  // 判断是否有手机号
  if (wx.getStorageSync("tel")) {
    // 处理业务
    e();
  } else {
    // 判断是否微信授权
    if (wx.getStorageSync("token")) {
      // 授权了就引到去绑定手机号
      wx.navigateTo({
        url: "/pages/telform/telform",
      });
    } else {
      wx.navigateTo({
        //  未授权去授权页
        url: "/pages/auth/auth",
      });
    }
  }
}
export default checkAuth;
