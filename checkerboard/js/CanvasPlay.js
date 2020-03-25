    var margin = 40, //棋格的大小
        padding = 5, //棋子与棋格的margin
        num = 15, //棋格的数量
        width = margin * num, //棋盘的宽
        height = margin * num, //棋盘的高
        srceenX = 0, //鼠标的X坐标
        srceeny = 0, //鼠标的Y坐标
        isFalseX = false, //判断鼠标是否在棋盘之内
        isFalseY =false,
        isChangePlayer = false,
        isClear = false, //是否清理画布
        circleRadius = width/num/2 - padding, //判断当前点击是红方还是黑方
        coords = [], //保存点击过的坐标
        record = []; //保存棋盘上红方子或者黑方子
		victory = null; //判断胜利者

    //定义棋盘上棋格未下子状态为0
    for(var i = 0; i<num; i++){
        var arr = []
        for(var j = 0; j < num; j++){
            arr.push(0)
        }
        record.push(arr)
    }    
    
    drawCanvas("canvas")

    //绘制基础布局
    function drawCanvas(id){
        var canvas = document.getElementById(id);
        if(canvas == null || !canvas.getContext) return false;
        var ctx = canvas.getContext("2d");
        if(isClear){
            ctx.clearRect(margin, margin,width, height);
        }
        for(var i = 1; i<num; i++){
            drawLine(ctx, i, num)
            drawverb(ctx, i, num)
        }

        drawPieces(canvas, ctx)
        return ctx; 
    }

    //画列
    function drawverb(ctx, i, num){
        ctx.strokeRect(margin, margin, width, height)
        ctx.beginPath();
        ctx.moveTo(margin, margin + height*i/num);
        ctx.lineTo(margin + width, margin + height*i/num);
        ctx.stroke()
    }

    //画行
    function drawLine(ctx, i, num){
        ctx.strokeRect(margin, margin, width, height)
        ctx.beginPath();
        ctx.moveTo(margin + width*i/num, margin);
        ctx.lineTo(margin + width*i/num, margin + height);;
        ctx.stroke()
    }


    //绘制棋子
    function drawPieces(canvas, ctx){
        canvas.addEventListener("mousemove", function(e){
            srceenX = e.pageX;
            srceenY = e.pageY;
            isFalseX = srceenX > margin ? (srceenX < (margin+width) ? true : false ) : false;
            isFalseY = srceenY > margin ? (srceenY < (margin+height) ? true : false ) : false;
            if(isFalseX && isFalseY){
                canvas.style.cursor = "pointer";
            }else{
                canvas.style.cursor = "default";
            }

        },false)

        canvas.addEventListener("click", function(e){
            srceenX = e.pageX;
            srceenY = e.pageY;
            isFalseX = srceenX > margin ? (srceenX < (margin+width) ? true : false ) : false;
            isFalseY = srceenY > margin ? (srceenY < (margin+height) ? true : false ) : false;
            if(isFalseX && isFalseY){
                var benchmarkX = Math.floor((srceenX - margin)/margin);
                var benchmarkY = Math.floor((srceenY - margin)/margin);
                
                if(coords.length === 0){
                    drawWhiteCircle(benchmarkX, benchmarkY ,ctx)
                    isChangePlayer = true;
                    addCoords(benchmarkX, benchmarkY, 1)
                }else{
                    if(verdictCoords(benchmarkX, benchmarkY)){
                        
                        if(!isChangePlayer){
                            drawWhiteCircle(benchmarkX, benchmarkY ,ctx)
                            addCoords(benchmarkX, benchmarkY, 1)
                            isChangePlayer = true;
                        }else {
                            drawBlackCircle(benchmarkX, benchmarkY ,ctx)
                            addCoords(benchmarkX, benchmarkY, 2)
                            isChangePlayer = false;

                        }
                        
                    }
                    if(isVictory()){
						//游戏结束
						// victory==1?alert("红方胜"):alert("黑方胜");
                        setTimeout(function(){
							victory==1?alert("红方胜"):alert("黑方胜");
                        },0)
                    }
                }
            }
        },false)

    }

    //画红色的圆
    function drawWhiteCircle(x, y, ctx){
        editRecord(x, y, 1)
        ctx.fillStyle = "#f55"
        ctx.beginPath();
        ctx.arc(margin * (x + 1) + margin/2, margin * (y + 1) + margin/2,circleRadius, 0, Math.PI*2);
        ctx.closePath()
        ctx.fill()
    }

    //画黑色的圆
    function drawBlackCircle(x, y, ctx){
        editRecord(x, y, 2)
        ctx.fillStyle = "#333"
        ctx.beginPath();
        ctx.arc(margin * (x + 1) + margin/2, margin * (y + 1) + margin/2,circleRadius, 0, Math.PI*2);
        ctx.closePath()
        ctx.fill()
    }


    //编辑棋盘上的标记,1代表红方落子,2代表黑方落子
    function editRecord(x, y, num){
        record.forEach(function(item, index){
            if(index === y){
                item.forEach(function(item, index){
                    if(x === index){
                        record[y][x] = num
                    }
                })
            }
        })
    }

    //判断棋盘上的标记，是否达到胜利条件
    function isVictory(){
        var isWin = false, a1, a2, a3, a4, a5;console.log(record)
        for(var i=0,len=record.length; i<len; i++){
            for(var j=0; j<record[i].length; j++){
                if(record[i][j] !==0 ){
                    if(j< record[i].length - 5){
                        //判断水平方向
                        a1 = record[i][j];
                        a2 = record[i][j + 1];
                        a3 = record[i][j + 2];
                        a4 = record[i][j + 3];
                        a5 = record[i][j + 4];
                        if(isEqual(a1, a2, a3, a4, a5)){
                            isWin = true;
                        }
                        
                        //判断正斜线方向
//                         a1 = record[i][j];
//                         a2 = record[i + 1][j + 1];
//                         a3 = record[i + 2][j + 2];
//                         a4 = record[i + 3][j + 3];
//                         a5 = record[i + 4][j + 4];
// 						console.log(a1, a2, a3, a4, a5)
//                         if(isEqual(a1, a2, a3, a4, a5)){
//                             isWin = true;
//                         }

                        //判断垂直方向
                        a1 = record[i][j];
                        a2 = record[i + 1][j];
                        a3 = record[i + 2][j];
                        a4 = record[i + 3][j];
                        a5 = record[i + 4][j];
                        if(isEqual(a1, a2, a3, a4, a5)){
                            isWin = true;
                        }
                    }
                    if(j > 3 && i < len - 5){
						//判断正斜线方向
						a1 = record[i][j];
						a2 = record[i + 1][j + 1];
						a3 = record[i + 2][j + 2];
						a4 = record[i + 3][j + 3];
						a5 = record[i + 4][j + 4];
						console.log(a1, a2, a3, a4, a5)
						if(isEqual(a1, a2, a3, a4, a5)){
						    isWin = true;
						}
                        //判断反斜线方向
                        a1 = record[i][j];
                        a2 = record[i + 1][j - 1];
                        a3 = record[i + 2][j - 2];
                        a4 = record[i + 3][j - 3];
                        a5 = record[i + 4][j - 4];
                        if(isEqual(a1, a2, a3, a4, a5)){
                            isWin = true;
                        }
                    }
                }
            }
        }
        return isWin
    }

    //判断相邻的5个数字是否相等,若相等则代表已分胜负
    function isEqual(a1, a2, a3, a4, a5){
        if(a1 == a2 && a2==a3 && a3==a4 && a4 == a5){
			victory = a5;
            return true;
        }else {
            return false
        }
    }

    //判断当前位置是否落子
    function verdictCoords(x, y){
        var isTrue = true;
        coords.forEach(function(item, index){
            if(item.x === x && item.y === y){
                isTrue = false
            }
        })
        return isTrue
    }
    
    //给点击过的增加标记
    function addCoords(x, y, num){
        coords.push({
            x: x,
            y: y,
            num: num
        })
    }

    //悔棋
    document.getElementById("button").addEventListener("click", function(){
        isClear = true;
        var ctx = drawCanvas("canvas");
        var lastCoords = coords.splice(coords.length -1, 1)
        editRecord(lastCoords[0].x, lastCoords[0].y, 0)
        coords.forEach(function(item){
            if(item.num === 1){
                drawWhiteCircle(item.x, item.y ,ctx);
            }else if(item.num ===2){
                drawBlackCircle(item.x, item.y ,ctx);
            }
        })
        if(coords.length%2 === 0){
            isChangePlayer = false
        }else{
            isChangePlayer = true
        }
        isClear = false;
    }, false)
