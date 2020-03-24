function delegate(element, eventType, selector, fn) {
			// 给被事件委派元素注册事件
			element.addEventListener(eventType, e => {
				//获取到触发这个事件的元素对象
				let el = e.target;
				//使用循环去判断el元素是不是选择器元素
				//如果el不是选择器元素则将el的上一级父元素赋值给el
				//直到el的父元素是选择器类型的元素或el的父元素到达事件边界也就是到达element元素的时候结束循环
				while (!el.matches(selector)) {
					// el等于element元素,代表触发事件的元素不是事件委派者元素
					if (element === el) {
					   el = null;
					   break;
					}
					el = el.parentNode;
				}
				//如果el=null,则未在事件委派者元素上触发事件,则不执行事件函数
				//否则使用函数原型上的call方法执行事件函数,
				//使用call的形式执行可以使事件函数参数更灵活的设置
				el && fn.call(el, e, el)
			});
			//返回被事件委派元素对象,也可以不返回;
			return element
		};
