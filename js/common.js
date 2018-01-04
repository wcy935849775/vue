(function(designWidth, maxWidth) {
    var doc = document,
      win = window,
      docEl = doc.documentElement,
      tid;
  
    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      width > maxWidth && (width = maxWidth);
      var rem = width * 200 / designWidth;
      docEl.style.fontSize = rem + 'px';
    }
  
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();
  
    win.addEventListener(
      'resize',
      function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
      },
      false
    );
  
    win.addEventListener(
      'pageshow',
      function(e) {
        if (e.persisted) {
          // 浏览器后退的时候重新计算
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      },
      false
    );
  
    if (doc.readyState === 'complete') {
      doc.body.style.fontSize = '16px';
    } else {
      doc.addEventListener(
        'DOMContentLoaded',
        function(e) {
          doc.body.style.fontSize = '16px';
        },
        false
      );
    }
  })(750, 750);
  