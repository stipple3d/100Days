class TestClassB{
	constructor(){
		this.testVarA = 'TestClassB: varA';
		this.testVarB = 'TestClassB: varB';
	}

	testMethodA = function(){
		console.log('TestClassB: testMethodA running');
	}

	testMethodB = function(){
		console.log('TestClassB: testMethodB running');
	}
}

function TestFunctionB(){
	console.log('TestClassB: TestFunctionB running');
}

const testObjectB = {name: 'testObj'};

export {TestClassB, TestFunctionB, testObjectB};