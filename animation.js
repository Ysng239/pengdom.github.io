
$(window).on('load',function(){

        $('.slider').slick({
            arrows: false,//左右の矢印はなし
            autoplay: true,//自動的に動き出すか。初期値はfalse。
            autoplaySpeed: 0,//自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
            speed: 6900,//スライドのスピード。初期値は300。
            infinite: true,//スライドをループさせるかどうか。初期値はtrue。
            pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
            pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
            cssEase: 'linear',//動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
            slidesToShow: 4,//スライドを画面に4枚見せる
            slidesToScroll: 1,//1回のスライドで動かす要素数
            responsive: [
                {
                breakpoint: 868,//モニターの横幅が769px以下の見せ方
                settings: {
                    slidesToShow: 2,//スライドを画面に1枚見せる
                }
            },
            {
                breakpoint: 426,//モニターの横幅が426px以下の見せ方
                settings: {
                    slidesToShow: 1.5,//スライドを画面に1.5枚見せる
                }
            }
        ]
        });

        $('#page-top').click(function () {
            $('body,html').animate({
                scrollTop: 0//ページトップまでスクロール
            }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
            return false;//リンク自体の無効化
        });

            $(".main-slider").slick({
              autoplay: false,
              arrows: false,
              fade: true,
              asNavFor: ".thumbnail-slider",
            });
            $(".thumbnail-slider").slick({
              slidesToShow: 3,
              asNavFor: ".main-slider",
              infinite: false,
              focusOnSelect: true,
              arrows:false,
            });
          

            var unit = 100,
            canvasList, // キャンバスの配列
            info = {}, // 全キャンバス共通の描画情報
            colorList; // 各キャンバスの色情報
        
        /**
         * Init function.
         * 
         * Initialize variables and begin the animation.
         */
        function init() {
            info.seconds = 0;
            info.t = 0;
                canvasList = [];
            colorList = [];
            // canvas1個めの色指定
            canvasList.push(document.getElementById("waveCanvas"));
            colorList.push(['#2284c8', '#69aade', '#0050a4']);//重ねる波の色設定
            // 各キャンバスの初期化
        for(var canvasIndex in canvasList) {
                var canvas = canvasList[canvasIndex];
                canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
                canvas.height = 200;//波の高さ
                canvas.contextCache = canvas.getContext("2d");
            }
            // 共通の更新処理呼び出し
                update();
        }
        
        function update() {
                for(var canvasIndex in canvasList) {
                var canvas = canvasList[canvasIndex];
                // 各キャンバスの描画
                draw(canvas, colorList[canvasIndex]);
            }
            // 共通の描画情報の更新
            info.seconds = info.seconds + .014;
            info.t = info.seconds*Math.PI;
            // 自身の再起呼び出し
            setTimeout(update, 35);
        }
        
        /**
         * Draw animation function.
         * 
         * This function draws one frame of the animation, waits 20ms, and then calls
         * itself again.
         */
        function draw(canvas, color) {
                // 対象のcanvasのコンテキストを取得
            var context = canvas.contextCache;
            // キャンバスの描画をクリア
            context.clearRect(0, 0, canvas.width, canvas.height);
        
            //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
            drawWave(canvas, color[0], 0.5, 3, 0);//0.5⇒透過具合50%、3⇒数字が大きいほど波がなだらか
            drawWave(canvas, color[1], 0.4, 2, 250);
            drawWave(canvas, color[2], 0.2, 1.6, 100);
        }
        
        /**
        * 波を描画
        * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
        */
        function drawWave(canvas, color, alpha, zoom, delay) {
                var context = canvas.contextCache;
            context.fillStyle = color;//塗りの色
            context.globalAlpha = alpha;
            context.beginPath(); //パスの開始
            drawSine(canvas, info.t / 0.5, zoom, delay);
            context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
            context.lineTo(0, canvas.height); //パスをCanvasの左下へ
            context.closePath() //パスを閉じる
            context.fill(); //波を塗りつぶす
        }
        
        /**
         * Function to draw sine
         * 
         * The sine curve is drawn in 10px segments starting at the origin. 
         * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
         */
        function drawSine(canvas, t, zoom, delay) {
            var xAxis = Math.floor(canvas.height/2);
            var yAxis = 0;
            var context = canvas.contextCache;
            // Set the initial x and y, starting at 0,0 and translating to the origin on
            // the canvas.
            var x = t; //時間を横の位置とする
            var y = Math.sin(x)/zoom;
            context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く
        
            // Loop to draw segments (横幅の分、波を描画)
            for (i = yAxis; i <= canvas.width + 10; i += 10) {
                x = t+(-yAxis+i)/unit/zoom;
                y = Math.sin(x - delay)/3;
                context.lineTo(i, unit*y+xAxis);
            }
        }
        
        init();
});