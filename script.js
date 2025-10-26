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
  お問い合わせフォームの処理（Google Forms）
  ---------------------------------*/
  $("#contactForm").submit(function(e) {
    e.preventDefault();

    const form = $(this);
    const submitButton = form.find(".btn-submit");
    const formMessage = $("#form-message");

    // ボタンを無効化
    submitButton.prop("disabled", true).text("送信中...");
    formMessage.text("").removeClass("error success");

    // フォームデータを取得
    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val()
    };

    // Google Apps Script Web APIに送信
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbze-2ABpeZ4iEpdR183ojaUEkmdz3P-MFMsn9U2sMPpT0-yjnWpIq_zFQHUsRjs8dRTMQ/exec",
      method: "GET",
      data: formData,
      dataType: "jsonp",
      success: function(response) {
        if (response.status === "success") {
          // 成功ページにリダイレクト
          window.location.href = "https://hirota-koyanaka.github.io/Prexia/thank-you.html";
        } else {
          formMessage.text("送信に失敗しました。もう一度お試しください。").addClass("error");
          submitButton.prop("disabled", false).text("送信");
        }
      },
      error: function() {
        formMessage.text("送信に失敗しました。もう一度お試しください。").addClass("error");
        submitButton.prop("disabled", false).text("送信");
      }
    });
  })

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
