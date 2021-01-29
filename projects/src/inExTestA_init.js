//IMPORTS FROM OTHER SCRIPT FILES

import { TestClassA } from './inExTestA_scriptA.js';
import { TestClassB, TestFunctionB, testObjectB } from './inExTestA_scriptB.js';

let tcaInstance, tcbInstance;

//REST OF PROGRAM

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){


	console.log('DOMContentLoaded');

	tcaInstance = new TestClassA();
	tcbInstance = new TestClassB();

	console.log(tcaInstance.testVarA);

	tcaInstance.testMethodA();

	console.log(tcbInstance.testVarA);

	tcbInstance.testMethodA();

	tcbInstance.testMethodB();

	TestFunctionB();

	console.log('TestClassB object name: ' + testObjectB.name);
    
});
