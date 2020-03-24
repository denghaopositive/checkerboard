		//创建一个容器
		let dom = document.createDocumentFragment();
		let container = document.querySelector(".container");
		for(let i=1;i<=100;i++){
			let btn = document.createElement("button");
			btn.className = i;
			dom.appendChild(btn);
		}
		container.appendChild(dom);
		//红方选手
		let redSquare = "O";
		// 黑方选手
		let blackSquare = "X";
		//判断轮到谁下
		let flag = true;
		//保存上一次的落子的dom
		let prevDom = null;
		// 每次落子的位置
		let array = [];
		// 棋子的历史记录
		let historys = [];
		// 悔棋的记录
		let unhistorys = [];
		//调用事件委派
		delegate(container,'click','button',function(e){
			//如果此处已下棋子，则不执行方法
			if(e.target.innerText) return;
			flag?isRedOrblack(e,redSquare):isRedOrblack(e,blackSquare);
			prevDom = e.target;
		});
		//判断哪方下棋
		function isRedOrblack(e,square){
			// 保存当前事件的对象
			let nowDom = e.target;
			nowDom.innerText = square;
			// 记录在数组的对应类名序号的下标下
			array[nowDom.className] = square;
			historys.push(nowDom.className);
			
			Object.assign(unhistorys,historys);
			// console.log(unhistorys)
			action(parseInt(nowDom.className),square);
			flag=!flag;
		}
		//判断胜负循环检索的方法
		function decide(value,Operator,str,count){
			for(i=1;i<5;i++){
				if(array[value+Operator*i] === str)
				 count++;
				 else break;
			}
			return count;
		}
		//判断胜负
		function action(value,str){
			//垂直方向上的棋子
			let Hcount=1;
			//水平方向上的棋子
			let Vcount=1;
			//左对角方向上的棋子
			let LTacr = 1;
			//右方向上的棋子
			let RTacr = 1;
			//垂直方向
			Hcount = decide(value,-10,str,Hcount);
			Hcount = decide(value,10,str,Hcount);
			// 水平方向
			Vcount = decide(value,-1,str,Vcount);
			Vcount = decide(value,1,str,Vcount);
			//上左边对角方向
			LTacr = decide(value,-11,str,LTacr);
			LTacr = decide(value,11,str,LTacr);
			//上右边对角方向
			RTacr = decide(value,-9,str,RTacr);
			RTacr = decide(value,9,str,RTacr);
			(Hcount === 5 || Vcount === 5 || LTacr === 5 || RTacr === 5) && alert(str + "胜利");
		};
		// 悔棋
		let BankDom = document.querySelector("#bank");
		let containerBtn = document.querySelectorAll("button");
		BankDom.onclick = function (){
			// 可以悔棋多次
			if(historys.length){
				let number = setBank();
				// 对应的button按钮元素下标需要类名值减一
				containerBtn[number].innerText= "";
			}
			// 只能悔棋一次
// 			if(prevDom){
// 				prevDom.innerText="";
// 				setBank();
// 				prevDom = null;
// 			}
		}
		//设置悔棋的相应数据
		function setBank(){
			//拿到记录中的棋子下标
			let number = parseInt(historys.pop());
			// 记录棋子值的数组中的下标对应按钮的类名的值
			array[number] = "";
			// 更改下棋的选手
			flag = !flag;
			// 返回棋子位置的数组在末尾拿掉对应的值减去一就是该btn按钮的下标
			return number-1;
		}
		//将毁掉的棋重新赋值
		function setValue(number,square){
			containerBtn[number-1].innerText= square;
			array[number] = square;
		}
		//撤销悔棋
		let revokeBank = document.querySelector("#revokeBank");
		revokeBank.onclick = function (){
			if(!unhistorys.length) return;
			for(let i=historys.length;i<unhistorys.length;i++){
				historys.push(unhistorys[i]);
				flag?setValue(unhistorys[i],redSquare):setValue(unhistorys[i],blackSquare)
				// 更改下棋的选手
				flag = !flag;
			}
		}
		
