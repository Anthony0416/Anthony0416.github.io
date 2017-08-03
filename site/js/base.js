function getSearchTerm()
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'q')
        {
            return sParameterName[1];
        }
    }
}

$(document).ready(function() {

    var search_term = getSearchTerm(),
        $search_modal = $('#mkdocs_search_modal');

    if(search_term){
        $search_modal.modal();
    }

    // make sure search input gets autofocus everytime modal opens.
    $search_modal.on('shown.bs.modal', function () {
        $search_modal.find('#mkdocs-search-query').focus();
    });

    // Highlight.js
    hljs.initHighlightingOnLoad();
    $('table').addClass('table table-striped table-hover');

    // Improve the scrollspy behaviour when users click on a TOC item.
    $(".bs-sidenav a").on("click", function() {
        var clicked = this;
        setTimeout(function() {
            var active = $('.nav li.active a');
            active = active[active.length - 1];
            if (clicked !== active) {
                $(active).parent().removeClass("active");
                $(clicked).parent().addClass("active");
            }
        }, 50);
    });

});


$('body').scrollspy({
    target: '.bs-sidebar',
});

/* Toggle the `clicky` class on the body when clicking links to let us
   retrigger CSS animations. See ../css/base.css for more details. */
$('a').click(function(e) {
    $('body').toggleClass('clicky');
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});
// 滚动条事件
$(window).scroll(function () {
	var top = $(window).scrollTop()
	if(top > 20) {
		$('.navbar').css('visibility','hidden');
		$('.well').stop().animate({top:'20px'},200);
		$('.huiji').css({display: 'block'});
	}else {
		$('.navbar').css('visibility','visible')
		$('.well').stop().animate({top:'80px'},200);
		$('.huiji').css({display: 'none'});
	}
})
// 隐藏滚动条的情况下鼠标划入显示
//$('.navbar').on('mouseover',function () {
//	$('.navbar').css({
//		'visibility': 'visible',
//	})
//})
// 灰机事件
$('.huiji').on('mouseover',function () {
	// 移除动画
	$(this).removeClass('animate')
})
$('.huiji').on('mouseout',function () {
	// 移除动画
	$(this).addClass('animate')
})

$('.huiji').on('click',function () {
	// 移除动画
	setTimeout(function(){
		var width = document.body.clientWidth + 100;
		var height = width/2;
		$("body").animate({scrollTop:0}, 1000);
		$('.huiji').stop().animate({
			left: width + 'px',
			bottom: height + 'px',
		},1000,function () {
			$('.huiji').css({
				bottom: '55px',
				left: '50px'
			});
		})
	},0)
})