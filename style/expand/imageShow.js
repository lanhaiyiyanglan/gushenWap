jQuery(function() {
	jQuery(".piclistshow li").last().css("border-bottom", "none");
	jQuery(".piclistshow li").each(function() {
		var curindex = jQuery(this).index(".piclistshow li") + 1;
		if (curindex % 4 == 0) {
			jQuery(this).css({
				"border-right": "none",
				"width": "251px"
			})
		}
	});
	jQuery(document).keydown(function(event) {
		var key = event.keyCode;
		var firstdisplay = jQuery(".firsttop").css("display");
		var enddisplay = jQuery(".endtop").css("display");
		if (firstdisplay == "none" && enddisplay == "none") {
			if (key == 37) {
				preclick()
			} else {
				if (key == 39) {
					nextclick()
				}
			}
		} else {
			if (key == 27) {
				jQuery(".firsttop").css("display", "none");
				jQuery(".bodymodal").css("display", "none");
				jQuery(".endtop").css("display", "none")
			}
		}
	});

	var firstpic = jQuery(".picmidmid ul li").first().find("img");
	var firstsrc = firstpic.attr("bigimg");
	var firsttxt = firstpic.attr("text");
	jQuery("#pic1").attr("src", firstsrc);
	firstpic.addClass("selectpic");
	jQuery(".picshowtxt_right").text(firsttxt);
	jQuery("#preArrow").hover(function() {
		jQuery("#preArrow_A").css("display", "block")
	},
	function() {
		jQuery("#preArrow_A").css("display", "none")
	});
	jQuery("#nextArrow").hover(function() {
		jQuery("#nextArrow_A").css("display", "block")
	},
	function() {
		jQuery("#nextArrow_A").css("display", "none")
	});
	var getli = jQuery(".picmidmid ul li");
	function nextclick() {
		var currrentindex = parseFloat(jQuery("#pic1").attr("curindex"));
		var length = getli.length;
		if (currrentindex != (length - 1)) {
			var curli = getli.eq(currrentindex);
			if (currrentindex > 3) {
				getli.eq(currrentindex - 4).css("display", "none");
				getli.eq(currrentindex + 1).css("width", "80px").css("display", "block")
			}
			var curnextli = getli.eq(currrentindex + 1);
			var curnextsrc = curnextli.find("img").attr("bigimg");
			var curnexttxt = curnextli.find("img").attr("text");
			curli.find("img").removeClass("selectpic");
			curnextli.find("img").addClass("selectpic");
			jQuery("#pic1").attr("src", curnextsrc);
			jQuery("#pic1").attr("curindex", currrentindex + 1);
			jQuery(".picshowtxt_right").text(curnexttxt);
			jQuery(".picshowtxt_left span").text(currrentindex + 2)
		} else {
			jQuery(".bodymodal").css("display", "block");
			jQuery(".endtop").css("display", "block")
		}
	}
	jQuery("#nextArrow_B").click(function() {
		nextclick()
	});
	jQuery("#nextArrow").click(function() {
		nextclick()
	});
	function preclick() {
		var currrentindex = parseFloat(jQuery("#pic1").attr("curindex"));
		if (currrentindex != 0) {
			var curli = getli.eq(currrentindex);
			var length = getli.length;
			if (currrentindex <= (length - 5)) {
				getli.eq(currrentindex + 4).css("display", "none");
				getli.eq(currrentindex - 1).css("width", "80px").css("display", "block")
			}
			var curnextli = getli.eq(currrentindex - 1);
			var curnextsrc = curnextli.find("img").attr("bigimg");
			var curnexttxt = curnextli.find("img").attr("text");
			curli.find("img").removeClass("selectpic");
			curnextli.find("img").addClass("selectpic");
			jQuery("#pic1").attr("src", curnextsrc);
			jQuery(".picshowtxt_right").text(curnexttxt);
			jQuery("#pic1").attr("curindex", currrentindex - 1);
			jQuery(".picshowtxt_left span").text(currrentindex)
		} else {
			jQuery(".bodymodal").css("display", "block");
			jQuery(".firsttop").css("display", "block")
		}
	}
	jQuery("#preArrow_B").click(function() {
		preclick()
	});
	jQuery("#preArrow").click(function() {
		preclick()
	});
	getli.click(function() {
		var currentliindex = jQuery(this).index(".picmidmid ul li");
		jQuery(".picmidmid ul li img[class='selectpic']").removeClass("selectpic");
		var currentli = getli.eq(currentliindex);
		currentli.find("img").addClass("selectpic");
		var bigimgsrc = currentli.find("img").attr("bigimg");
		var curnexttxt = currentli.find("img").attr("text");
		jQuery("#pic1").attr("src", bigimgsrc);
		jQuery("#pic1").attr("curindex", currentliindex);
		jQuery(".picshowtxt_right").text(curnexttxt);
		jQuery(".picshowtxt_left span").text(currentliindex + 1)
	});
	jQuery(".piclistshow li").click(function() {
		var curli = jQuery(this).index(".piclistshow li");
		jQuery(".picmidmid ul li img[class='selectpic']").removeClass("selectpic");
		var currentli = getli.eq(curli);
		currentli.find("img").addClass("selectpic");
		var bigimgsrc = currentli.find("img").attr("bigimg");
		var curnexttxt = currentli.find("img").attr("text");
		jQuery("#pic1").attr("src", bigimgsrc);
		jQuery("#pic1").attr("curindex", curli);
		jQuery(".picshowtxt_right").text(curnexttxt);
		jQuery(".picshowtxt_left span").text(curli + 1);
		jQuery(".picmidmid li").css("display", "block");
		if (curli >= 5) {
			var cha = curli - 5;
			for (var i = 0; i <= cha; i++) {
				getli.eq(i).css("display", "none")
			}
		}
	});
	setblock();
	function setblock() {
		var left = jQuery(window).width() / 2 - 180;
		jQuery(".firsttop").css("left", left);
		jQuery(".endtop").css("left", left)
	}
	jQuery(window).resize(function() {
		setblock()
	});
	jQuery(".closebtn1").click(function() {
		jQuery(".firsttop").css("display", "none");
		jQuery(".bodymodal").css("display", "none")
	});
	jQuery(".closebtn2").click(function() {
		jQuery(".endtop").css("display", "none");
		jQuery(".bodymodal").css("display", "none")
	});
	jQuery(".replaybtn1").click(function() {
		jQuery(".firsttop").css("display", "none");
		jQuery(".bodymodal").css("display", "none")
	});
	jQuery(".replaybtn2").click(function() {
		jQuery(".endtop").css("display", "none");
		jQuery(".bodymodal").css("display", "none");
		jQuery(".picmidmid ul li img[class='selectpic']").removeClass("selectpic");
		jQuery(".picmidmid ul li").eq(0).find("img").addClass("selectpic");
		var bigimgsrc = jQuery(".picmidmid ul li").eq(0).find("img").attr("bigimg");
		jQuery("#pic1").attr("src", bigimgsrc);
		jQuery(".picshowtxt_left span").text(1);
		ccc = getli.eq(0).find("img").attr("text");;
		jQuery(".picshowtxt_right").text(ccc);
		getli.css("display","none");
		for (var i = 0; i <= 4; i++) {
			getli.eq(i).css("display", "block");
		}
		jQuery("#pic1").attr("curindex", 0)
	});
});