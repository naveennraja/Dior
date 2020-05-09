(function () {
    var spriteElement = document.getElementById("animateImage"),
        spriteImgLoad,
        frameWidth = spriteElement.clientWidth,
        frameHeight = spriteElement.clientHeight,
        spriteWidth = frameWidth,
        antiSpriteHeight,
        spriteHeight,
        curPx = 0,
        ti,
        animateSpriteClockWise,
        animateSpriteAntiClockWise,
        fps = 10,
        currentTime,
        initialisedTime = Date.now(),
        interval = 4e2 / fps,
        delta,
        fadeInStatic,
        first = initialisedTime,
        redo = document.getElementById("redo");

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1e2 / 20);
            };
    })();
    redo.addEventListener("click",function(){
        	document.getElementById("staticImage").style.cssText += "opacity:0;";
    	  window.setTimeout(function(){ animateSpriteClockWise(); spriteElement.style.cssText += "opacity:1;";
    	}, 1e3);
    	

    })
    window.cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ||
            function (callback) {
            
                window.clearTimeout(callback);
            };
    })();
    animateSpriteClockWise = function () {
        ti = requestAnimationFrame(animateSpriteClockWise);
        currentTime = Date.now();
        delta = currentTime - initialisedTime;
        if (delta > interval) {
            initialisedTime = currentTime - (delta % interval);
            var time_el = (initialisedTime - first) / 1e3;
            spriteElement.style.backgroundPosition = " 0px " + curPx + "px";

            curPx = curPx - frameHeight;
            if (curPx <= antiSpriteHeight) {
                curPx = curPx + frameHeight;
                cancelAnimationFrame(ti);
                animateSpriteAntiClockWise();
            }
        }
    }
    animateSpriteAntiClockWise = function () {
        ti = requestAnimationFrame(animateSpriteAntiClockWise);
        currentTime = Date.now();
        delta = currentTime - initialisedTime;
        if (delta > interval) {
            initialisedTime = currentTime - (delta % interval);
            var time_el = (initialisedTime - first) / 1e3;
            spriteElement.style.backgroundPosition = " 0px " + curPx + "px";
            curPx = curPx + frameHeight;
            if (curPx > 0) {
                curPx = 0;
                cancelAnimationFrame(ti);
                spriteElement.style.cssText += "opacity:0;";
                document.getElementById("staticImage").style.cssText += "opacity:1;";
            }
        }
    }

    function loadSprite(src, callback) {
        spriteImgLoad = new Image();
        spriteImgLoad.onload = callback;
        spriteImgLoad.src = src;
    }
    loadSprite('img/Sprite.png', function () {
        spriteHeight = spriteImgLoad.height;
        antiSpriteHeight = -parseInt(spriteHeight);
        document.getElementById("animateContainer").style.cssText += "opacity:1;";
        animateSpriteClockWise();
    });
}());
