/*
        初始化玩家数据
*/
const player = JSON.parse(localStorage.getItem("player")) || [
    {
        name:'alex',
        img:'',
        gold:0,
        poker:[]
    },
    {
        name:'jack',
        img:'',
        gold:0,
        poker:[]
    },
    {
        name:'tom',
        img:'',
        gold:0,
        poker:[]
    }
];

//计时器
let interval;

//用于保存单局游戏的数据
let gameData = {
    boss:-1,        //当前地主
    play:null,        //当前出牌者

    select:{
        type: 0,     //选中的牌型
        poker:[],    //选中牌的数据
        max: 0       //选中牌的牌型中用于判断大小的值
    },
    //当前桌面牌组数据
    desktop:{
        type:0,
        poker:[],
        max:0
    },
    multiple:1              // 本局游戏结算的倍数
}

$(function(){ //window.onload
    let zhadan_bgm=document.getElementById("zhadan_bgm");//炸弹bgm	
    zhadan_bgm.pause();
    let feiji_bgm=document.getElementById("feiji_bgm");
	feiji_bgm.pause();	
	let huojian_bgm=document.getElementById("huojian_bgm");
	huojian_bgm.pause()
    //绑定聊天按钮事件
    let chat_num = 0;   //定义点击按钮的次数
    $(".info_2").on("click",".chat",function(){
        // chat_num % 2 == 0?$(".ltk").show():$(".ltk").hide();
        // chat_num++;
        if(chat_num == 0){
            $(".ltk").show();
            chat_num = 1;
        }else{
            $(".ltk").hide();
            chat_num = 0;
        }
    })

    //绑定显示聊天文字按钮事件
    let talking = '';
    $(".ltk li:nth-of-type(1)").click(function(){
        // alert(123)
		let ltk1=document.getElementById("ltk1");
		ltk1.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(1)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    $(".ltk li:nth-of-type(2)").click(function(){
        // alert(123)
		let ltk2=document.getElementById("ltk2");
		ltk2.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(2)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    $(".ltk li:nth-of-type(3)").click(function(){
        // alert(123)
		let ltk3=document.getElementById("ltk3");
		ltk3.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(3)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    $(".ltk li:nth-of-type(4)").click(function(){
        // alert(123)
		let ltk4=document.getElementById("ltk4");
		ltk4.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(4)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    $(".ltk li:nth-of-type(5)").click(function(){
        // alert(123)
		let ltk5=document.getElementById("ltk5");
		ltk5.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(5)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    $(".ltk li:nth-of-type(6)").click(function(){
        // alert(123)
		let ltk6=document.getElementById("ltk6");
		ltk6.play();
		// $(".ltk").hide()
        talking = $(".ltk li:nth-of-type(6)").text();
        // alert(talking)
        $(".talking").html(talking)
        setTimeout(function(){
            $(".talking").html("");
        },3000)
    })
    //初始化牌组
    let poker_html = '';
    for(let i=0; i<54; i++){
        poker_html += '<li class="back" style="top:-'+0.5*i+'px"></li>';    // 通过循环得到牌组的HTML代码
    }
    $(".all_poker").html(poker_html);

    //初始化牌组数据
    let all_poker = [];
    for(let i=1;i<=13;i++){
        for(let j=0;j<4;j++){
            all_poker.push({num:i,color:j})
        }
    }
    all_poker.push({num:14,color:0})
    all_poker.push({num:14,color:1})

    let click = 0;

    for(let i = 0;i < 3;i++){
        if(player[i].poker!=null)
            player[i].poker=[];
    }

    $('.money_1 span').html(player[0].gold);
    $('.money_2 span').html(player[1].gold);
    $('.money_3 span').html(player[2].gold);
    $('.money_4 span').html(gameData.multiple);
    //开始游戏和退出游戏按钮的点击函数
    let status = false;
    $(".start").click(function(){
        $(".io_button").hide();
		let bgMusic_2=document.getElementById("bgMusic_2");//炸弹bgm
		bgMusic_2.play();
        //绑定发牌洗牌
        $(".mid_top").on("click",".all_poker li",function(){
            if(status){
                return false;
            }
            if(click==0){
                clearPoker()
            }else{
                dealPoker()
            }
        })
    })


    //洗牌动画
    function clearPoker(){
        status = true;
        //打乱初始牌组
        for(let i=0;i<5;i++){
            all_poker.sort(function(x, y){
                return Math.random() - 0.5;
            })
        }

        //保留原牌组代码
        let poker_html = $(".mid_top").html();
        //删除原来的牌组
        $(".all_poker").remove()

        //生成三个临时牌组用于动画
        let temp_html = '';
        //通过双循环生成三个牌组的HTML代码
        for(let j=0; j<3; j++){
            temp_html += '<ul class="all_poker" style="top:-'+j*265+'px">';
            for(let i=0; i<18; i++){
                temp_html += '<li class="back" style="top:-'+0.5*i+'px"></li>';
            }
            temp_html += '</ul>';
        }
        $(".mid_top").append(temp_html)

        //完成洗牌动画
        for(let i=0; i<3;i++){
            $(".all_poker").eq(0).animate({left:"-500px"}, 500).animate({left:"0px"}, 500)
            $(".all_poker").eq(0).animate({left:"500px"}, 500).animate({left:"0px"}, 500)
        }

        //恢复原牌组
        setTimeout(function(){
            $(".mid_top").html(poker_html)
            click++;
            status = false;
        },3100)

    }

    function dealPoker(){
        let num = 0;
        let poker_html = '';
        function go(){
            //给左边玩家发牌
            $(".all_poker li:last").animate({left:"-600px",top:"250px"},100,function(){
                $(".all_poker li:last").remove();
                player[0].poker.push(all_poker.pop());
                poker_html = makePoker(player[0].poker[player[0].poker.length -1]);
                $(".play_1").append(poker_html);
                $(".play_1 li:last").css({top:num*32 +'px'})

                //给中间玩家发牌
                $(".all_poker li:last").animate({ top:"600px"},100, function(){
                    $(".all_poker li:last").remove();
                    player[1].poker.push(all_poker.pop());
                    poker_html = makePoker(player[1].poker[player[1].poker.length - 1]);       // 生成对应数据的牌页面
                    $(".play_2").append(poker_html);
                    $(".play_2 li:last").css({left:num*30 +'px'})
                    $(".play_2").css({left:-num*15 +'px'})

                    // 给右边玩家发牌
                    $(".all_poker li:last").animate({left:"600px", top:"250px"},100, function(){
                        $(".all_poker li:last").remove();
                        player[2].poker.push(all_poker.pop());
                        poker_html = makePoker(player[2].poker[player[2].poker.length - 1]);       // 生成对应数据的牌页面
                        $(".play_3").append(poker_html);
                        $(".play_3 li:last").css({top:num*32 +'px'})

                        if(++num <= 16){
                            go();
                        }else{
                            //把所有玩家手牌进行排序
                            sortPoker(player[0].poker)
                            sortPoker(player[1].poker)
                            sortPoker(player[2].poker)
                            console.log(player)

                            setTimeout(()=>{
                                $(".play_1 li").css({"background":''}).addClass("back")     // 把牌背重新生成
                                $(".play_2 li").css({"background":''}).addClass("back")     // 把牌背重新生成
                                $(".play_3 li").css({"background":''}).addClass("back")     // 把牌背重新生成

                                setTimeout(()=>{
                                    $('.play_1 li').remove()
                                    $('.play_2 li').remove()
                                    $('.play_3 li').remove()
                                    //按已经排好序的数据重新生成牌面
                                    for(let i=0; i<player[1].poker.length; i++){
                                        $('.play_1').append(makePoker(player[0].poker[i]))
                                        $('.play_1 li:last').css({top: i*32+'px'})

                                        // poker_html = makePoker(player[1].poker[i])
                                        $('.play_2').append(makePoker(player[1].poker[i]))
                                        $('.play_2 li:last').css({left: i*30+'px'})

                                        $('.play_3').append(makePoker(player[2].poker[i]))
                                        $('.play_3 li:last').css({top: i*32+'px'})
                                    }
                                    $(".mid_top").off("click",".all_poker li")
                                    console.log("起飞")
                                    //发牌结束，调用抢地主函数
                                    getBoss()
                                },500)
                            },500)
                        }
                    });
                });
            });
        }
        go();
    }

    //抢地主函数
    function getBoss(get, num, get_data){
        //设置参数默认值
        if(get==undefined){
            //随机点名一名玩家开始抢地主
            get = Math.floor(Math.random()*3)
        }
        num = num ==undefined?0 : num;
        get_data = get_data == undefined? [null,null,null]: get_data;

        if(num == 3){
            //解绑事件
            $(".get-boss .get").off()      //把目标元素上的所有事件解除
            $(".get-boss .cancel").off()
            //如果三个玩家都不抢地主
            if(get_data[0] == get_data[1] && get_data[1] == get_data[2]){
                if(get_data[0] == 0){
                    $(".help").html("流局啦");
                    $(".help").show();					
                    num = 0;
                    gameData.boss = -2;
                    localStorage.setItem("player", JSON.stringify(player));
                    setTimeout(()=>{
                        window.location.reload();					
                    },1500)
                }
            }else{
                if(get_data[0] == 1 && get_data[1] == 0 && get_data[2] == 0){
                    setBoss(0)
                }else if(get_data[0] == 0 && get_data[1] == 1 && get_data[2] == 0){
                    setBoss(1)
                }else if(get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 1){
                    setBoss(2)
                }
            }
        }
        if(num<5&&gameData.boss == -1){
            console.log(gameData.boss)
            //所有的组件先隐藏
            $(".get-boss").hide();

            //把对应选择权的玩家的组件显示
			// 改成叫地主和不叫组件
			if(num==0)
			{
				$(".get-boss .get").text("叫地主")	
	           	$(".get-boss .cancel").text("不叫")
			}
			else{
					 $(".get-boss .get").text("抢地主")
					 $(".get-boss .cancel").text("不抢")
				}
            $(".get-boss").eq(get).show();

            //解绑事件
            $(".get-boss .get").off()      //把目标元素上的所有事件解除
            $(".get-boss .cancel").off()

            //动态绑定抢地主跟不抢的事件
            $(".get-boss").eq(get).find(".get").on("click",(event)=>{
                // alert("抢地主")				
                event.stopPropagation();
                get_data[get] = 1;         //设置当前玩家的选择

                num++
				// 叫地主地主
				if(num==1)
				{					
					let jdz=document.getElementById("jdz");
						jdz.play()										
				}else if(num==2)				
				{
					let qdz_a=document.getElementById("qdz_a");
						qdz_a.play()
				}
				else if(num==3){
					let qdz_b=document.getElementById("qdz_b");
						qdz_b.play()
				}
                gameData.multiple = gameData.multiple*2;
                $('.money_4 span').html(gameData.multiple);
                //如果当前玩家抢地主是第四轮抢，则抢到地主
                if(num == 4){
					let qdz_c=document.getElementById("qdz_c");
						qdz_c.play()
                    setBoss(get)
                }
                get = ++get>2?0:get;
                console.log(get);
                getBoss(get,num,get_data)
            })

            $(".get-boss").eq(get).find(".cancel").on("click",(event)=>{
			//不抢
                event.stopPropagation();
                get_data[get] = 0; //设置当前玩的选择
                num++
				if(num==1)
				{
					let bj=document.getElementById("bj");
					bj.play()
				}else{
					let bq=document.getElementById("bq");
					bq.play()
				}
                let boss;
                //第四次选择不抢也有人会是地主
                if(num == 4){
                    let pre_get = get-1 < 0? 2:get -1;

                    console.log(get_data[pre_get])
                    if(get_data[pre_get] == 1){
                        boss = pre_get;
                    }else{
                        boss = pre_get-1 <0? 2:pre_get-1;
                    }
                    setBoss(boss)
                }else{
                    get = ++get > 2 ?0: get;
                    console.log(num);
                    getBoss(get, num, get_data);
                }
            })
        }		
        //如果当前玩家已经不抢地主了，跳过他让下一个人选择
        if(get_data[get] === 0){
            get =++get > 2 ?0:get;
            getBoss(get, num, get_data);
            return false;
        }
	
		if(get==0)
		{
			let a= Math.floor(Math.random()*2)
			$( ".qdz1").show()
			if(a==0)
			{
				
				$(".get-boss").eq(get).find(".cancel").click()
				if(num==1)
				{	
					// alert(num)
					$( ".qdz1" ).css( "background" ,"url(../images/qdz/bujiao.png)");
				}
				else{
					$( ".qdz1" ).css( "background" ,"url(../images/qdz/buqiang.png)");
				}
				
				setTimeout(function(){$( ".qdz1").hide()}, 2000);			
			}			
			else
			{
				
				$(".get-boss").eq(get).find(".get").click()
				if(num==1){
					// alert(num)
					$( ".qdz1" ).css( "background" ,"url(../images/qdz/jdz.png)");
				}
				else{
					
					$( ".qdz1" ).css( "background" ,"url(../images/qdz/qdz.png)");
				}
				
				setTimeout(function(){$( ".qdz1").hide()}, 2000);	
			}
		}	
		if(get==2)
		{
			let b= Math.floor(Math.random()*2)
			$( ".qdz2").show()
			if(b==0)
			{
				
				$(".get-boss").eq(get).find(".cancel").click()
				if(num==1)
				{
					// alert(num)
					$( ".qdz2" ).css( "background" ,"url(../images/qdz/bujiao.png)");
				}
				else{
					$( ".qdz2" ).css( "background" ,"url(../images/qdz/buqiang.png)");
				}
				setTimeout(function(){$( ".qdz2").hide()}, 2000);	
				
			}			
			else
			{
				
				$(".get-boss").eq(get).find(".get").click()
				if(num==1){
					// alert(num)
					$( ".qdz2" ).css( "background" ,"url(../images/qdz/jdz.png)");
				}
				else{
					$( ".qdz2" ).css( "background" ,"url(../images/qdz/qdz.png)");
				}				
				setTimeout(function(){$( ".qdz2").hide()}, 2000);	
			}			
		}
    }

    //设置地主玩家
    function setBoss(boss){
        console.log('Boss:'+boss);
        // 隐藏与解绑所有抢地主相关的元素
        $('.get-boss').hide();
        $('.get-boss .get').off();
        $('.get-boss .cancel').off();

        //设置当前地主玩家
        gameData.boss = boss;
        $(".crown" + (boss + 1)).css({ display: "block" })
        //翻开桌面的三张牌
        $('.all_poker li').eq(0).animate({"left":"-300px"})
        $('.all_poker li').eq(1).animate({"left":"300px"},()=>{
            //最后三张牌置入地主玩家手中
            player[gameData.boss].poker.push(all_poker[0],all_poker[1],all_poker[2])
            sortPoker(player[gameData.boss].poker);
            console.log(player[gameData.boss].poker)
            //动画与页面
            $('.all_poker li').remove()
            for(let i=0; i<all_poker.length; i++){
                $('.all_poker').append(makePoker(all_poker[i]))
                if(i==0){
                    $('.all_poker li:last').css({left:"-300px"})
                }else if(i==2){
                    $('.all_poker li:last').css({left:"300px"})
                }
            }

            //玩家重新排序手牌
            $(".play_"+(boss+1)).find('li').remove()
            for(let i=0; i<player[boss].poker.length; i++){
                if(boss+1 == 1){
                    $(".play_"+(boss+1)).append('<li class="back" style="top:'+i*32+'px"></li>')
                }
                if(boss+1 == 2){
                    $(".play_"+(boss+1)).append('<li class="back" style="left:'+i*30+'px"></li>')
                }
                if(boss+1 == 3){
                    $(".play_"+(boss+1)).append('<li class="back" style="top:'+i*32+'px"></li>')
                }
            }
            if(boss+1 == 2){
                $(".play_"+(boss+1)).css({left:'-'+20*15+'px'})
            }
            setTimeout(()=>{
                $(".play_"+(boss+1)).find("li").remove()
                for(let i=0; i<player[boss].poker.length; i++){
                    $(".play_"+(boss+1)).append(makePoker(player[boss].poker[i]));
                    if(boss+1 == 1){
                        $(".play_"+(boss+1)+' li:last').css({top:i*32+'px'})
                    }
                    if(boss+1 == 2){
                        $(".play_"+(boss+1)+' li:last').css({left:i*30+'px'})
                    }
                    if(boss+1 == 3){
                        $(".play_"+(boss+1)+' li:last').css({top:i*32+'px'})
                    }
                }
                // 调用出牌阶段方法
                gameData.play = boss;       // 设置当前出牌的玩家
                playPoker()
            },500)
        })
    }

    //出牌阶段
    function playPoker(pass){

        //隐藏所有玩家出牌的组件
        $(".play-btn").hide();

        //当前玩家的出牌组件显示
        $('.play-btn').eq(gameData.play).show();

        //显示倒计时
        clearInterval(interval);
        $('.info_'+(gameData.play+1)+' .m').show();
        time_Go(14);

        //通过pass值判断跳过次数
        if(pass == 2){
            gameData.desktop.type = 0;
            gameData.desktop.poker = [];
            gameData.desktop.max = 0;
            $(".out_"+(gameData.play+1)).hide();
            $(".out_"+(gameData.play+1)).find('li').remove();
        }

        //解绑事件
        clickOff();

        //绑定选牌事件
        $(".play_"+(gameData.play+1)+' li').on('click',function(){
            console.log("进入选牌事件")
            //判断当前元素是否被选中
            if($(this).hasClass("on")){
                //去掉被选中的样式
                $(this).removeClass("on");

                let poker = {};
                poker.num = $(this).attr("data-num");
                poker.color = $(this).attr("data-color");

                //通过循环得到选中元素的下标
                for(let i=0; i<gameData.select.poker.length; i++){
                    if(gameData.select.poker[i].num == poker.num && gameData.select.poker[i].color == poker.color){
                        gameData.select.poker.splice(i, 1);       // 通过下标删除数组中对应的元素
                        break;
                    }
                }
            }else{
                // 把选择中牌变成被选中的样式
                $(this).addClass("on");
                // 把选中的牌的数据放入，选择的牌组数据中
                let poker =  {};
                poker.num = $(this).attr("data-num");
                poker.color = $(this).attr("data-color");
                gameData.select.poker.push(poker);
            }
            console.log(gameData.select.poker)
        })

        //绑定出牌事件
        $(".play-btn").eq(gameData.play).on("click",'.play',function(){
            if(!checkPoker(gameData.select)){
                $(".help").html("不能这样出牌");
                $(".help").show();
                setTimeout(()=>{
                    $(".help").hide();
                },1500)
                $(".play_"+(gameData.play+1)+' li').removeClass("on");
                gameData.select.type = 0;
                gameData.select.poker = [];
                gameData.select.max = 0;
            }else{
                if(checkVS()){
                    for(let i = 0;i < 3;i++){
                        $(".out_"+(i+1)).hide();
                        $(".out_"+(i+1)).find("li").remove()
                    }
                    $(".out_"+(gameData.play+1)).show();
                    for(let i=0; i<gameData.select.poker.length; i++){
                        console.log(gameData.select.poker[i].num)
                        for(let j=0; j<player[gameData.play].poker.length; j++){
                            if( gameData.select.poker[i].num == player[gameData.play].poker[j].num  &&
                                gameData.select.poker[i].color == player[gameData.play].poker[j].color
                            ){
                                player[gameData.play].poker.splice(j, 1);
                                break;
                            }
                        }
                    }
                    $(".play_"+(gameData.play+1)).find("li").remove()
                    for(let i=0; i<player[gameData.play].poker.length; i++){
                        $(".play_"+(gameData.play+1)).append(makePoker(player[gameData.play].poker[i]));
                        if(gameData.play+1 == 1){
                            $(".play_"+(gameData.play+1)+' li:last').css({top:i*32+'px'})
                        }
                        if(gameData.play+1 == 2){
                            $(".play_"+(gameData.play+1)+' li:last').css({left:i*30+'px'})
                        }
                        if(gameData.play+1 == 3){
                            $(".play_"+(gameData.play+1)+' li:last').css({top:i*32+'px'})
                        }
                    }
                    clickOff();
                    if(gameData.select.poker[0].num==1&&gameData.select.type == 1)
                    {
                        let san=document.getElementById("san");
                            san.play()
                    }
                    else if(gameData.select.poker[0].num==2&&gameData.select.type == 1)
                    {
                        let si=document.getElementById("si");
                            si.play()
                    }
                    else if(gameData.select.poker[0].num==3&&gameData.select.type == 1)
                    {
                                     let wu=document.getElementById("wu");
                                     wu.play()
                    }
                    else if(gameData.select.poker[0].num==4&&gameData.select.type == 1)
                    {
                                     let liu=document.getElementById("liu");
                                     liu.play()
                    }
                    else if(gameData.select.poker[0].num==5&&gameData.select.type == 1)
                    {
                                     let qi=document.getElementById("qi");
                                     qi.play()
                    }
                    else if(gameData.select.poker[0].num==6&&gameData.select.type == 1)
                    {
                                     let ba=document.getElementById("ba");
                                     ba.play()
                    }
                    else if(gameData.select.poker[0].num==7&&gameData.select.type == 1)
                    {
                                     let jiu=document.getElementById("jiu");
                                     jiu.play()
                    }
                    else if(gameData.select.poker[0].num==8&&gameData.select.type == 1)
                    {
                                     let shi=document.getElementById("shi");
                                     shi.play()
                    }
                    else if(gameData.select.poker[0].num==9&&gameData.select.type == 1)
                    {
                                     let j=document.getElementById("j");
                                     j.play()
                    }
                    else if(gameData.select.poker[0].num==10&&gameData.select.type == 1)
                    {
                                     let q=document.getElementById("q");
                                     q.play()
                    }
                    else if(gameData.select.poker[0].num==11&&gameData.select.type == 1)
                    {
                                     let k=document.getElementById("k");
                                     k.play()
                    }
                    else if(gameData.select.poker[0].num==12&&gameData.select.type == 1)
                    {
                                     let a=document.getElementById("a");
                                     a.play()
                    }
                    else if(gameData.select.poker[0].num==13&&gameData.select.type == 1)
                    {
                                     let er=document.getElementById("er");
                                     er.play()
                    }
                    else if(gameData.select.poker[0].num==14&&gameData.select.poker[0].num == 0&&gameData.select.type == 1)
                    {
                                     let dawang=document.getElementById("dawang");
                                     dawang.play()
                    }
                    else if(gameData.select.poker[0].num==14&&gameData.select.poker[0].num == 1&&gameData.select.type == 1)
                    {
                                    
                                   let xiaowang=document.getElementById("xiaowang");
                                   xiaowang.play()
                    }
                    //2张牌的情况
                    if(gameData.select.poker[0].num==1&&gameData.select.type == 2)
					{
									 let san=document.getElementById("duisan");
									 	san.play()
					}
					else if(gameData.select.poker[0].num==2&&gameData.select.type == 2)
					{
									 let si=document.getElementById("duisi");
									 	si.play()
					}
					else if(gameData.select.poker[0].num==3&&gameData.select.type == 2)
					{
									 let wu=document.getElementById("duiwu");
									 wu.play()
					}
					else if(gameData.select.poker[0].num==4&&gameData.select.type == 2)
					{
									 let liu=document.getElementById("duiliu");
									 liu.play()
					}
					else if(gameData.select.poker[0].num==5&&gameData.select.type == 2)
					{
									 let qi=document.getElementById("duiqi");
									 qi.play()
					}
					else if(gameData.select.poker[0].num==6&&gameData.select.type == 2)
					{
									 let ba=document.getElementById("duiba");
									 ba.play()
					}
					else if(gameData.select.poker[0].num==7&&gameData.select.type == 2)
					{
									 let jiu=document.getElementById("duijiu");
									 jiu.play()
					}
					else if(gameData.select.poker[0].num==8&&gameData.select.type == 2)
					{
									 let shi=document.getElementById("duishi");
									 shi.play()
					}
					else if(gameData.select.poker[0].num==9&&gameData.select.type == 2)
					{
									 let j=document.getElementById("duij");
									 j.play()
					}
					else if(gameData.select.poker[0].num==10&&gameData.select.type == 2)
					{
									 let q=document.getElementById("duiq");
									 q.play()
					}
					else if(gameData.select.poker[0].num==11&&gameData.select.type == 2)
					{
									 let k=document.getElementById("duik");
									 k.play()
					}
					else if(gameData.select.poker[0].num==12&&gameData.select.type == 2)
					{
									 let a=document.getElementById("duia");
									 a.play()
					}
					else if(gameData.select.poker[0].num==13&&gameData.select.type == 2)
					{
									 let er=document.getElementById("duier");
									 er.play()
                    }
                    //三张
                    if(gameData.select.type == 3){
                        let sange=document.getElementById("sange");
				        sange.play()
                    }				                                        
                    if(gameData.select.type == 4 ){
                        let zhadan_bgm=document.getElementById("zhadan_bgm");//炸弹bgm	
                        let zhadan=document.getElementById("zhadan");
					    zhadan.play()						
                        // let get_img=document.getElementsByClassName("zhadan").getElementsByTagName("img")//返回图像数组
                                        
                        $(".zhadan").css({'display':'block'})
                        setTimeout(()=>{
                            zhadan_bgm.load()
                            zhadan_bgm.play()						
                        },1500)
                        setTimeout(()=>{
                            $(".zhadan").css({'display':'none'})
                                zhadan_bgm.pause()
                            },2500)
                                        			                       
                    }
                    if(gameData.select.type == 5){
                        let sandaiyi=document.getElementById("sandaiyi");
					    sandaiyi.play()
                    }
                    if(gameData.select.type == 6){
                        let shunzi=document.getElementById("shunzi");
					    shunzi.play()
                    }
                    if(gameData.select.type == 7){
                        let sandaiyidui=document.getElementById("sandaiyidui");
					    sandaiyidui.play()
                    }
                    if(gameData.select.type == 8){
                        let liandui=document.getElementById("liandui");
					    liandui.play()
                    }
                    if(gameData.select.type == 9){
                        let sidaier=document.getElementById("sidaier");
					    sidaier.play()
                    }
					// 火箭
					if(gameData.select.type == 888){
					    let huojian_bgm=document.getElementById("huojian_bgm");
					    huojian_bgm.load()
					    huojian_bgm.play()
					    $(".huojian").css({
					    	'animation': 'huojian_run 6s linear 1',
					    	'animation-delay': 0.5 + 's'
					    })
					    setTimeout(()=>{
					    	$(".huojian").css({'animation': '',
					    		'animation-delay':''})//删除动画效果
					    	huojian_bgm.pause()
					    },6600)
					                    			                       
					}
                    if(gameData.select.type == 555 ||gameData.select.type == 666 ||gameData.select.type == 777){
                        let feiji_bgm=document.getElementById("feiji_bgm");
                        feiji_bgm.load()
                        feiji_bgm.play()
                        $(".feiji").css({
                            'animation': 'feiji_run 2s linear 1',
                            'animation-delay': 0.5 + 's',
                            'display':'block'
                        })
                        setTimeout(()=>{
                            $(".feiji").css({'animation': '',
                                'animation-delay':'',
                                'display':'none'})//删除动画效果
                            feiji_bgm.pause()
                        },2600)                       
                    }

                    // 1、如果能出的话，首选需要把手牌的数据替换掉桌面的数据
                    gameData.desktop.type = gameData.select.type;
                    gameData.desktop.max = gameData.select.max;
                    // 由于数组也是引用赋值，所以数组的拷贝需要使用循环进行遍历
                    gameData.desktop.poker =[];
                    for(let i=0; i<gameData.select.poker.length; i++){
                        gameData.desktop.poker[i] = {};
                        gameData.desktop.poker[i].num = gameData.select.poker[i].num;
                        gameData.desktop.poker[i].color = gameData.select.poker[i].color;
                    }

                    for(let i=0; i<gameData.desktop.poker.length; i++){
                        $(".out_"+(gameData.play+1)).append(makePoker(gameData.desktop.poker[i]));
                        if(gameData.play+1 == 1){
                            $(".out_"+(gameData.play+1)+' li:last').css({top:i*32+'px'})
                        }
                        if(gameData.play+1 == 2){
                            $(".out_"+(gameData.play+1)+' li:last').css({left:i*30+'px'})
                        }
                        if(gameData.play+1 == 3){
                            $(".out_"+(gameData.play+1)+' li:last').css({top:i*32+'px'})
                        }
                    }
                    if(gameData.play+1 == 1){
                        $(".out_"+(gameData.play+1)).css({top:'-'+gameData.desktop.poker.length*30+'px'})
                    }
                    if(gameData.play+1 == 3){
                        $(".out_"+(gameData.play+1)).css({top:'-'+gameData.desktop.poker.length*30+'px'})
                    }

                    // 玩家手牌数据删除后，有可能玩家就已经没朋手牌了。所以每一次出牌都应该先进行本局游戏的胜负
                    if(player[gameData.play].poker.length == 0){
                        // 进入结算阶段
                        gameClose()

                        return false;
                    }

                    // 2、选中的牌组数据要清空
                    gameData.select.type = 0;
                    gameData.select.poker = [];
                    gameData.select.max = 0;

                    console.log(gameData.desktop.poker)

                    $('.info_'+(gameData.play+1)+' .m').hide();
                    gameData.play = ++gameData.play>2? 0:gameData.play;     // 设置下一个出牌的玩家
                    clickOff();
                    // 使用自调函数让下一个玩家出牌
                    playPoker(0)
                }else{
                    $(".help").html("不能这样出牌");
                    $(".help").show();
                    setTimeout(()=>{
                        $(".help").hide();
                    },1500)
                    $(".play_"+(gameData.play+1)+' li').removeClass("on");
                    gameData.select.type = 0;
                    gameData.select.poker = [];
                    gameData.select.max = 0;
                }

            }
        })

        //绑定过牌事件
        $(".play-btn").eq(gameData.play).on("click",'.cancel',function(){
            if(gameData.desktop.type == 0){
                $(".help").html("你必须出牌");
                $(".help").show();
                setTimeout(()=>{
                    $(".help").hide();
                },1500)
            }else{
               let by=document.getElementById("buyao");
                by.play();	
                $(".play_"+(gameData.play+1)+' li').removeClass("on");
                gameData.select.type = 0;
                gameData.select.poker = [];
                gameData.select.max = 0;
                $('.info_'+(gameData.play+1)+' .m').hide();
                gameData.play = ++gameData.play>2? 0:gameData.play;     // 设置下一个出牌的玩家
                // 使用自调函数让下一个玩家出
                clickOff();
                playPoker(++pass)
            }
        })

        $(".play-btn").eq(gameData.play).on("click",'.tishi',function(){
            tip();
        })
    }

    //结算函数阶段
    function gameClose(){
        clearInterval(interval);
        $('.info_'+(gameData.play+1)+' .m').hide();
        $(".play-btn").hide();
        let count = gameData.multiple * 100;

        // 本局是地主赢了还是农民赢了
        if(gameData.boss == gameData.play){
            if(gameData.boss==1)
			{
				$( ".tb" ).css( "background" ,"url(../images/end/shengli.png)");
				let bgMusic_2=document.getElementById("bgMusic_2");
				bgMusic_2.pause()
				 let yingle=document.getElementById("yingle");
				 yingle.play()
			}else{
				$( ".tb" ).css( "background" ,"url(../images/end/shibai.png)");
				let bgMusic_2=document.getElementById("bgMusic_2");
				bgMusic_2.pause()
				let shule=document.getElementById("shule");
				shule.play()
			}
            // 除了地主外其它玩家都进行减分
            for(let i=0; i<3; i++){
                if(i != gameData.boss){
                    player[i].gold -= count/2
                }
            }
            // 地主玩家加分
            player[gameData.boss].gold += count;
        }else{
			if(gameData.boss==1)
			{
				$( ".tb" ).css( "background" ,"url(../images/end/shibai.png)");
				let bgMusic_2=document.getElementById("bgMusic_2");
				bgMusic_2.pause() 
				let shule=document.getElementById("shule");
				shule.play() 
				
			}else{
				$( ".tb" ).css( "background" ,"url(../images/end/shengli.png)");
				let bgMusic_2=document.getElementById("bgMusic_2");
				bgMusic_2.pause() 
				let yingle=document.getElementById("yingle");
				yingle.play()
			}
            // 地主玩家减分
            player[gameData.boss].gold -= count;

            // 除了地主外其它玩家都进行加分
            for(let i=0; i<3; i++){
                if(i != gameData.boss){
                    player[i].gold += count/2
                }
            }
        }
        localStorage.setItem("player", JSON.stringify(player));
        //显示结算界面
        $(".last_box").show();
        $(".last_box .tx .rw").css({background:'url(../images/end/photo_'+(gameData.play+1)+'.png)'});
        $(".last_box .tx .rw").css('background-size','cover');
        $(".end_1").html(player[0].gold);
        $(".end_2").html(player[1].gold);
        $(".end_3").html(player[2].gold);
        $(".mul").html(gameData.multiple);
    }

    function clickOff(){
        $('.play_'+(gameData.play+1)+' li').off();
        $(".play-btn").eq(gameData.play).off('click','.play');
        $(".play-btn").eq(gameData.play).off('click','.tishi');
        $(".play-btn").eq(gameData.play).off('click','.cancel');
    }

    //计时器
    function time_Go(i){
        let e = $(".m span").eq(gameData.play);
        interval = setInterval(function(){
            e.html(i);
            i--;
            if(i <0){
                player[gameData.play].gold -= 50;
                $('.money_'+(gameData.play+1)+' span').html(player[gameData.play].gold)
                clearInterval(interval);
            }
        },1000);
    }

    //炸弹
    function zhaDan(){
        let zhadan_bgm=document.getElementById("zhadan_bgm");//炸弹bgm	
		zhadan_bgm.pause()
		//炸弹动画
		$('.kaishi').click(function() {
			let zhadan_bgm=document.getElementById("zhadan_bgm");//炸弹bgm							
			// let get_img=document.getElementsByClassName("zhadan").getElementsByTagName("img")//返回图像数组
							
			$(".zhadan").css({'display':'block'})
			setTimeout(()=>{
			    zhadan_bgm.load()
			    zhadan_bgm.play()						
			},1500)
			setTimeout(()=>{
				$(".zhadan").css({'display':'none'})
					zhadan_bgm.pause()
				},2500)
							
			})			
    }
    //飞机
    function plant(){
				//初始化
				let feiji_bgm=document.getElementById("feiji_bgm");
				feiji_bgm.pause()
				        // 飞机动画
						$('.kaishi').click(function() {
							let feiji_bgm=document.getElementById("feiji_bgm");
							feiji_bgm.load()
							feiji_bgm.play()
							$(".feiji").css({
								'animation': 'feiji_run 2s linear 1',
                                'animation-delay': 0.5 + 's',
                                'display':'block'
							})
							setTimeout(()=>{
								$(".feiji").css({'animation': '',
                                    'animation-delay':'',
                                    'display':'none'})//删除动画效果
								feiji_bgm.pause()
							},2600)
							
						})
    }
})