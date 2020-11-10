$(function(){
	// 初始化
	let bg_music=document.getElementById("bgMusic");
	bg_music.pause();
    $(".top ul li:first-of-type a").click(function(){
        // 点击按钮事件
        let music= $(".top ul li:first-of-type a")//音乐播放按钮
        // let bg_music=$("#bgMusic")
        let bg_music=document.getElementById("bgMusic");
        // 点击正在播放音乐事件图标
        if( music.hasClass("music_run"))
        {
            music.removeClass("music_run");
            music.addClass("music")
            bg_music.pause()
            // bg_music.load()
        }
        // 点击停止播放事件图标
        else if(music.hasClass("music"))
        {
            music.removeClass("music");
            music.addClass("music_run")
            bg_music.load()
            bg_music.play()
        }
    })
})