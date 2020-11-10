/*生成牌面的html代码函数*/
function makePoker(poker){
    //普通花色的坐标
    let color = [
        {x:-179,y:-260},    //方块花色的坐标
        {x:-179,y:-18},    //梅花花色的坐标
        {x:-12,y:-260},    //红桃花色的坐标
        {x:-12,y:-18}    //黑桃花色的坐标
    ];
    let x,y;
    if(poker.num != 14){
        x = color[poker.color].x;
        y = color[poker.color].y;
    }else{
        if(poker.color == 0){         //大小王花色的坐标
            x = -179;
            y = -18;
        }else{
            x = -12;
            y = -18;
        }
    }
    return '<li data-num="'+poker.num+'" data-color="'+poker.color+'" style="width: 150px; height: 229px; background: url(../images/face/'+poker.num+'.png) '+x+'px  '+y+'px;"></li>';
}

//牌组数据排序函数
function sortPoker(poker_data){
    poker_data.sort((x,y)=>{
        if(x.num != y.num){
            return x.num-y.num;
        }else{
            return x.color-y.color;
        }
    });
}

//检查牌组的函数
/* 
    牌型分类：
    1       单张
    2       对子
    3       三张
    4       普炸
    5       三带一
    6       顺子
    7       三带二
    8       连对
    9       四带二
    10      四带两对
    555     飞机带1
    666     飞机带2
    777     飞机不带
    888     王炸

*/
function checkPoker(data){
    //先排序选中的牌组
    sortPoker(data.poker);

    let length = data.poker.length;  //牌组张数

    switch(length){
        //一张牌
        case 1:
            data.type = 1;    //设置牌型
            //判断大小王
            if(data.poker[0].num == 14){
                if(data.poker[0].color == 0){
                    data.max = 14;
                }else{
                    data.max = 15;
                }
            }else{
                data.max = data.poker[0].num;
            }
            return true;      //符合规则返回true
            break;

        //两张牌
        case 2:
            if(data.poker[0].num != data.poker[1].num){
                return false;
            }else{
                //王炸
                if(data.poker[0].num ==14){
                    data.type = 888;
                    data.max = 14;
					let wangzha=document.getElementById("wangzha");
						wangzha.play()
                }else{
                    data.type = 2;
                    data.max = data.poker[0].num;
                }
                return true;
            }
            break;

        //三张牌
        case 3:
            if(data.poker[0].num == data.poker[2].num){
                data.type =3;
                data.max = data.poker[0].num;
                return true;
            }
            return false;
            break;

        //四张牌
        case 4:
            if(data.poker[0].num == data.poker[3].num){
                data.type = 4;
                data.max = data.poker[0].num;
                return true;
				
            }else if(data.poker[0].num == data.poker[2].num || data.poker[1].num == data.poker[3].num){
                data.type = 5;
                data.max = data.poker[1].num;
                return true;
            }
            return false;
            break;

        case 5:
            //先判断顺子
            if(checkStraight(data.poker)){
                data.type = 6;
                data.max = data.poker[data.poker.length-1].num;
                return true;
            }

            //判断是否为三带二
            if(data.poker[0].num == data.poker[2].num && data.poker[3].num == data.poker[4].num ||
                data.poker[0].num == data.poker[1].num && data.poker[2].num == data.poker[4].num
            ){
                data.type = 7;      // 设置牌型为三带二
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        // 判断六张牌的情况
        case 6:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为四带二
            if(data.poker[0].num == data.poker[3].num || 
                data.poker[1].num == data.poker[4].num || 
                data.poker[2].num == data.poker[5].num
                ){
                data.type = 9;      // 设置牌型为四带二
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为飞机
            if(checkPlane(data.poker)){
                data.type = 777;      // 设置牌型为飞机
                data.max = checkPlane(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;
        
        // 七张牌的情况
        case 7:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            return false;
            break;
        
        // 八张牌的情况
        case 8:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为飞机
            if(checkPlaneWith1(data.poker)){
                data.type = 555;      // 设置牌型为飞机带1
                data.max = checkPlaneWith1(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            
            // 判断四带两对
            if( data.poker[0].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num      // 判断前四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[0].num;   // 设置牌型的判断值
				let sidailiangdui=document.getElementById("sidailiangdui");
					sidailiangdui.play()
                return true;
            }

            if( data.poker[2].num == data.poker[5].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[6].num == data.poker[7].num      // 判断中间四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[2].num;   // 设置牌型的判断值
				let sidailiangdui=document.getElementById("sidailiangdui");
					sidailiangdui.play()
                return true;
            }

            if( data.poker[4].num == data.poker[7].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num        // 判断后四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[7].num;   // 设置牌型的判断值
				let sidailiangdui=document.getElementById("sidailiangdui");
					sidailiangdui.play()
                return true;
            }

            return false;
            break;
        
        //9张牌的情况
        case 9:
            //判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断是否是飞机
            if(checkPlane(data.poker)){
                data.type = 777;      // 设置牌型为飞机
                data.max = checkPlane(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;
        
        //判断10张牌的情况
        /*
            10张牌飞机情况
                3334445566
                3344455566
                3344555666
        */
        case 10:
            //判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            // 判断是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断是否为飞机
            if(checkPlaneWith2(data.poker)){
                data.type = 666;     //设置牌型为飞机带2
                data.max = checkPlaneWith2(data.poker);   //设置判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;
        
        //判断11张牌的情况
        case 11:
            //判断为顺子的情况
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        
        //判断12张牌的情况
        case 12:
            //判断为顺子的情况
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断为连对的情况
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断为无翅膀飞机的情况
            if(checkPlane(data.poker)){
                data.type = 777;      // 设置牌型为飞机
                data.max = checkPlane(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            //判断为飞机带1
            if(checkPlaneWith1(data.poker)){
                data.type = 555;      // 设置牌型为飞机
                data.max = checkPlaneWith1(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;

        //判断为13张牌的情况
        case 13:
            return false;
            break;
        
        //判断为14张牌的情况
        case 14:
            //判断为连对的情况
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        //判断为15张牌的情况
        case 15:
            //判断为无翅膀飞机的情况
            if(checkPlane(data.poker)){
                data.type = 777;      // 设置牌型为飞机
                data.max = checkPlane(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            //判断是否为飞机带2
            if(checkPlaneWith2(data.poker)){
                data.type = 666;     //设置牌型为飞机带2
                data.max = checkPlaneWith2(data.poker);   //设置判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false
            break;
        
        //判断为16张牌的情况
        case 16:
            //判断为连对的情况
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断是否为飞机带1
            if(checkPlaneWith1(data.poker)){
                data.type = 555;      // 设置牌型为飞机
                data.max = checkPlaneWith1(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;
        
        //判断17张牌的情况
        case 17:
            return false;
            break;
        
        //判断18张牌的情况
        case 18:
            //判断为连对的情况
            if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为连对
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            //判断为无翅膀飞机的情况
            if(checkPlane(data.poker)){
                data.type = 777;      // 设置牌型为飞机
                data.max = checkPlane(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;
        
        //判断19张牌的情况
        case 19:
            return false;
            break;
        
        //判断20张牌的情况
        case 20:
            //判断是否为飞机带1
            if(checkPlaneWith1(data.poker)){
                data.type = 555;      // 设置牌型为飞机
                data.max = checkPlaneWith1(data.poker);   // 设置牌型的判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            //判断是否为飞机带2
            if(checkPlaneWith2(data.poker)){
                data.type = 666;     //设置牌型为飞机带2
                data.max = checkPlaneWith2(data.poker);   //设置判断值
				let feiji=document.getElementById("feiji");
					feiji.play()
                return true;
            }
            return false;
            break;

        default:
            break;
    }
}

// 检查当前牌型是否为顺子
function checkStraight(poker) {
    for(let i=0; i<poker.length-1; i++){
        if(poker[i].num*1 + 1 != poker[i+1].num){
            return false;
        }
    }

    return true;
}

// 检查当前牌型是否为连对
function checkDouble(poker){
    for(let i=0; i<poker.length-2; i += 2){
        if(poker[i].num != poker[i+1].num || poker[i].num*1 + 1 != poker[i+2].num){
            return false;
        }
    }
    if(poker[poker.length-1].num!=poker[poker.length-2].num){
        return false;
    }
    return true;
}

//判断是否为飞机
function checkPlane(poker){
    let temparr1 = [];
    let j = 0;
    for(let i=0;i<poker.length-2;i += 1){       //获取3张
        if(poker[i].num == poker[i+2].num){
            temparr1[j] = poker[i].num;
            j++;
            i+=2;
        }
    }
    if(temparr1.length!=poker.length/3){
        return false;
    }
    for(let i=0;i<temparr1.length-1;i++){       //判断各个三张是否连续
        if(temparr1[i]*1 + 1 != temparr1[i+1]){
            return false;
        }
    }
    return temparr1[temparr1.length-1];
}

//判断牌型是否为飞机带1
function checkPlaneWith1(poker){
    console.log("飞机")
    let temparr1 = [];
    let diff = [];
    let j = 0;
    for(let i=0;i<poker.length-2;i += 1){       //获取3张
        if(poker[i].num == poker[i+3].num){
            diff.push(poker[i]);
        }   
        if(poker[i].num == poker[i+2].num){
            temparr1[j] = poker[i].num;
            j++;
            i+=2;
        }
    }
    for(let i=0;i<temparr1.length-1;i++){       //判断各个三张是否连续
        if(temparr1[i]*1 + 1 != temparr1[i+1]){
            return false;
        }
    }
    for(let i in poker){
        if(temparr1.indexOf(poker[i].num)==-1){
            diff.push(poker[i]);
        }
    }
    if(diff.length!=temparr1.length){
        return false;
    }
    return temparr1[temparr1.length-1];
}

//判断牌型是否为飞机带对子
function checkPlaneWith2(poker){
    let temparr1 = [];
    let temparr2 = [];
    let diff = [];
    let j = 0;
    let k =0;
    for(let i=0;i<poker.length-2;i += 1){       //获取3张
        if(poker[i].num == poker[i+2].num){
            temparr1[j] = poker[i].num;
            j++;
            i+=2;
        }
    }
    for(let i=0;i<temparr1.length-1;i++){       //判断各个三张是否连续
        if(temparr1[i]*1 + 1 != temparr1[i+1]){
            return false;
        }
    }
    for(let i in poker){
        if(temparr1.indexOf(poker[i].num)==-1){
            diff.push(poker[i]);
        }
    }
    for(let i=0;i<diff.length-1;i+=2){
        if(diff[i] != diff[i+1]){
            return false;
        }
    }
    for(let i=0;i<diff.length-1;i+=2){
        temparr2[k] = diff[i];
        k++;
    }
    if(temparr1.length != temparr2.length){
        return false;
    }
        
    return temparr1[temparr1.length-1];
}

// 检查当前手牌是否大于桌上的牌的函数
function checkVS(){
    // 如果桌面上没有牌的话可以直接打出
    if(gameData.desktop.type == 0){
        if(gameData.select.type == 4){
            gameData.multiple = gameData.multiple*2;
            $(".money_4 span").html(gameData.multiple);
        }
        return true;
    }

    // 如果出的牌是王炸的话可以直接打出
    if(gameData.select.type == 888){
        gameData.multiple = gameData.multiple*2;
        $(".money_4 span").html(gameData.multiple);
        return true;
    }

    // 出的是普通炸弹并且桌上的不是炸弹或者王炸就可以直接打出
    if(gameData.select.type == 4 && (gameData.desktop.type != 4 && gameData.desktop.type != 888)){
        gameData.multiple = gameData.multiple*2;
        $(".money_4 span").html(gameData.multiple);
        return true;
    }

    // 如果桌面上的牌是王炸那无论是什么牌都不能打出
    if(gameData.desktop.type == 888){
        return false;
    }

    //特殊情况，12张牌无翅膀飞机压12张牌飞机带1翅膀
    if(gameData.select.poker.length == gameData.desktop.poker.length &&
       gameData.select.poker.length == 12&&
       gameData.select.type == 777&&
       gameData.desktop.type == 555&&
       gameData.select.max > gameData.desktop.max){
        return true;
    }

    // 一般组数据大小的判断
    if( gameData.select.type == gameData.desktop.type && 
        gameData.select.poker.length == gameData.desktop.poker.length &&
        gameData.select.max*1 > gameData.desktop.max*1
    ){
        if(gameData.select.type == 4){
            gameData.multiple = gameData.multiple*2;
            $(".money_4 span").html(gameData.multiple);
        }
        return true;
    }else{
        return false;
    }
}

function tip(){
    let tip_num = gameData.desktop.poker.length*1;
    if(tip_num == 0){
        $(".help").html("任意出牌");
        $(".help").show();
        setTimeout(()=>{
            $(".help").hide();
        },1500)
    }
    switch(tip_num){
        case 1:
            for(let i = 0;i<player[gameData.play].poker.length;i++){
                if(player[gameData.play].poker[i].num>gameData.desktop.max){
                    $(".play_"+(gameData.play+1)+' li').eq(i).addClass("on");
                    gameData.select.poker.push(player[gameData.play].poker[i]);
                    break;
                }
            }
        case 2:
            if(gameData.desktop.type == 2){
                for(let i = 0;i<player[gameData.play].poker.length;i++){
                    if(player[gameData.play].poker[i].num == player[gameData.play].poker[i+1].num&&player[gameData.play].poker[i].num>gameData.desktop.max){
                        $(".play_"+(gameData.play+1)+' li').eq(i).addClass("on");
                        $(".play_"+(gameData.play+1)+' li').eq(i+1).addClass("on");
                        gameData.select.poker.push(player[gameData.play].poker[i]);
                        gameData.select.poker.push(player[gameData.play].poker[i+1]);
                        break;
                    }
                }
            }
        case 3:
            if(gameData.desktop.type == 3){
                for(let i = 0;i<player[gameData.play].poker.length;i++){
                    if(player[gameData.play].poker[i].num == player[gameData.play].poker[i+2].num&&player[gameData.play].poker[i].num>gameData.desktop.max){
                        $(".play_"+(gameData.play+1)+' li').eq(i).addClass("on");
                        $(".play_"+(gameData.play+1)+' li').eq(i+1).addClass("on");
                        $(".play_"+(gameData.play+1)+' li').eq(i+2).addClass("on");
                        gameData.select.poker.push(player[gameData.play].poker[i]);
                        gameData.select.poker.push(player[gameData.play].poker[i+1]);
                        gameData.select.poker.push(player[gameData.play].poker[i+2]);
                        break;
                    }
                }
            }
        default:
            break;
    }
}