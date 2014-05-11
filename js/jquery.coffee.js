;(function($){
	$.extend( jQuery.easing ,{
		flyFastSlow: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t  - 1) + b;
		}
	});
	
	$.fn.coffee = function(option){
		var $coffee = $(this);
		var opts = $.extend({},$.fn.coffee.defaults,option);
		var coffeeWidth = $coffee.width();
		$coffee.append('<div class="coffee-steam-box" style="height:'+ opts.steamTopMax+'px; width:'+ (coffeeWidth) +'px; left:0px;top:-'+ opts.steamTopMax+'px;position:absolute;overflow:hidden;z-index:0;"></div>');
		var $coffeeSteamBox = $coffee.find('div.coffee-steam-box');
		var coffeeSteamBoxWidth = $coffeeSteamBox.width();
		
		setInterval(function(){
			steam();
		}, rand( opts.makeSteamInterval / 2 , opts.makeSteamInterval * 2 ) );
		return $coffee ;
		
		function steam(){	
			coffeeSteamBoxWidth = $coffeeSteamBox.width();		
			var fontSize = rand( 8 , opts.steamMaxSize  ) ;
			var xPos = rand( coffeeSteamBoxWidth - coffeeWidth , coffeeSteamBoxWidth - opts.coffeeHandleWidth - fontSize );
			var rotate = rand(-5,5);
			var rotateStyle = ' -moz-transform:rotate('+rotate+'deg);-webkit-transform:rotate('+rotate+'deg);-o-transform:rotate('+rotate+'deg);transform:rotate('+rotate+'deg);';
			var color = '#'+ randoms(6 , '0123456789ABCDEF' );
			var steamsFontFamily = randoms( 1, opts.steamsFontFamily )
			var html = '<span class="coffee-steam" style="position:absolute;left:'+xPos+'px;top: '+opts.steamTopMax+'px;font-size:'+fontSize+'px;color:'+ color +';font-family:'+steamsFontFamily +';'+rotateStyle+';-webkit-text-size-adjust:none;display:block; ">'+ randoms( 1, opts.steams ) +'</span>';			
			var $fly = $(html);
			var left = rand( 0 , coffeeSteamBoxWidth - opts.coffeeHandleWidth - fontSize );
			if( left > xPos )
				left = rand( 0 , xPos );
			$fly.appendTo($coffeeSteamBox).animate({
				top		: rand( opts.steamTopMax / 2 , 0 ),
				left	: left  ,
				opacity	: 0
			} , rand( opts.SteamFlyTime / 2 , opts.SteamFlyTime * 1.2 ) , 'flyFastSlow' ,  function(){
				$fly.remove();
				$fly = null;			
			});
		};
		function randoms( length , chars ) {
			length = length || 1 ;
			var hash = '';
			var maxNum = chars.length - 1;
			var num = 0;
			for( i = 0; i < length; i++ ) {
				num = rand( 0 , maxNum - 1  );
				hash += chars.slice( num , num + 1 );
			}
			return hash;
		};		
		function rand(mi,ma){   
			var range = ma - mi;
			var out = mi + Math.round( Math.random() * range) ;	
			return parseInt(out);
		};		
	};

	$.fn.coffee.defaults = {
		steams				: ['组织部加油！！', '师兄师姐加油！！', '(╯-_-)╯ ~╩╩ 翻桌', '（╬￣皿￣）＝○＃（￣＃）３￣） 看拳', '(●’ω`●）', ' (((*°▽° *）八（* °▽°*)))♪', 'o_O ||  驚!', 'Σ( ° △ °|||)︴ 驚嚇發抖', '茂哥说：', '伟杰哥说：', '星爷说：', '沐能说：', '大家说：', '雯姐说：', '玲姐说：', '嘉铭说：', '淑雯说'], 
		steamsFontFamily	: ['Verdana','Geneva','Comic Sans MS','MS Serif','Lucida Sans Unicode','Times New Roman','Trebuchet MS','Arial','Courier New','Georgia'],
		SteamFlyTime		: 40000 , /*Steam飞行的时间,单位 ms 。（决定steam飞行速度的快慢）*/
		makeSteamInterval	: 1000 , /*制造Steam时间间隔,单位 ms.*/
		steamMaxSize		: 60 ,
		steamTopMax			: 1000 ,
		coffeeHandleWidth	: 300 
	};
	$.fn.coffee.version = '1.0.0';
})(jQuery);