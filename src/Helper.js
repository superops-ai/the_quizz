export default class Helper {
  get_cookie(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
    return null;
  }

  set_cookie(name, value) {
    let myDate = new Date();
    myDate.setMonth(myDate.getMonth() + 12);
    document.cookie =
      name + "=" + value + ";expires=" + myDate + ";domain=localhost;path=/";
  }

  delete_all_cookies() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie =
        c.trim().split("=")[0] +
        "=;" +
        "expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/";
    });
  }
}