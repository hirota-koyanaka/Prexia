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
    const name = $("#name").val();
    const email = $("#email").val();
    const message = $("#message").val();

    // iframeを使ってGoogle Apps Scriptに送信
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // フォームを動的に作成
    const tempForm = document.createElement('form');
    tempForm.action = 'https://script.google.com/macros/s/AKfycbze-2ABpeZ4iEpdR183ojaUEkmdz3P-MFMsn9U2sMPpT0-yjnWpIq_zFQHUsRjs8dRTMQ/exec';
    tempForm.method = 'POST';
    tempForm.target = 'hidden_iframe';

    // フィールドを追加
    const fields = {name: name, email: email, message: message};
    for (let key in fields) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      tempForm.appendChild(input);
    }

    document.body.appendChild(tempForm);
    tempForm.submit();

    // 送信後の処理
    setTimeout(function() {
      document.body.removeChild(tempForm);
      document.body.removeChild(iframe);
      // 成功ページにリダイレクト
      window.location.href = "https://hirota-koyanaka.github.io/Prexia/thank-you.html";
    }, 1000);
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
