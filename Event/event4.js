function Event() {
	this.evt2Handlers = {}
}
Event.prototype.on = function(name, callback) {
	if(this.evt2Handlers[name]) {
		this.evt2Handlers[name].push(callback)
	} else {
		this.evt2Handlers[name] = [callback]
	}
}

Event.prototype.removeListener = function(evtName, callback) {
	let handlers = this.evt2Handlers[evtName]
	let index = handlers.indexOf(callback)
	// let index = this.evt2Handlers[evtName].indexOf(callback)
	if(index > -1) {
		handlers.splice(index, 1)
	}
}


Event.prototype.emit = function(name, ...args) {
	let handlers = this.evt2Handlers[name] || []
	for(let fn of handlers) {
		fn(...args)
	}
}


let emitter = new Event();
let handler1 = (...args) => {
	console.log(`an event occurred ! with respons: ${args}`)
}

let handler2 = () => {console.log(` another handler2`)}
let handler3 = () => {console.log(` another handler3`)}

emitter.on('iEvent1', handler1)
emitter.on('iEvent2', handler2)
emitter.on('iEvent3', handler3)

// 以下两种方式 removeListener 效果不一样，两个回调函数的指向是不一样的，本质上不是同一个函数
emitter.removeListener('iEvent1', handler1)

emitter.removeListener('iEvent1', function() {
	console.log('hander removed')
})

emitter.emit('iEvent1', 'a', 'b')
emitter.emit('iEvent2', handler2)
emitter.emit('iEvent3', handler3)

/*
{
	"iEvent": [handler1],
	'iEvent2': [handler2, handler3]
}*/



