$(function(){
  /*-------------------------------
  ハンバーガーメニュー
  ---------------------------------*/
  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $("#header .navi").toggleClass("active");
    $("#header .mask").toggleClass("active");
  });

  $(".navi a").click(function () {
    $(".hamburger").removeClass("active");
    $("#header .navi").removeClass("active");
    $("#header .mask").removeClass("active");
  });

  $(".mask").click(function () {
    $(".hamburger").removeClass("active");
    $("#header .navi").removeClass("active");
    $("#header .mask").removeClass("active");
  });

  /*-------------------------------
  スクロールアニメーション（Inview）
  ---------------------------------*/
  $(".fadein").on("inview", function () {
    $(this).addClass("inview");
  });

  /*-------------------------------
  スムーズスクロール
  ---------------------------------*/
  $('a[href^="#"]').click(function () {
    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top - 80;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  /*-------------------------------
  お問い合わせフォームの処理（Web3Forms）
  ---------------------------------*/
  // フォームは直接送信されるため、JavaScriptでの処理は不要
  // Web3Formsが送信を処理し、成功ページにリダイレクトします

  /*-------------------------------
  ヘッダーのスクロール効果
  ---------------------------------*/
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();

    if (scroll > 100) {
      $("#header").css("box-shadow", "0 4px 20px rgba(0, 0, 0, 0.15)");
    } else {
      $("#header").css("box-shadow", "0 2px 10px rgba(0, 0, 0, 0.1)");
    }
  });

  /*-------------------------------
  ページ読み込み時のアニメーション
  ---------------------------------*/
  $(window).on("load", function() {
    $("body").css({
      "opacity": "0",
      "transition": "opacity 0.3s ease"
    });

    setTimeout(function() {
      $("body").css("opacity", "1");
    }, 100);
  });
});
