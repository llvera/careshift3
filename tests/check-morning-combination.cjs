const fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({structuredClone,localStorage:{getItem:()=>null,setItem(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),ctx);
vm.runInContext(`
s.month='2026-11';s.staff=[{id:'1010',full:false},{id:'1011',full:false},{id:'A',full:true,manager:true},{id:'B',full:true},{id:'C',full:true},{id:'D',full:true}];
s.table={'1010:10':{kind:'兼职',start:'08:30',end:'15:00'},'1011:10':{kind:'兼职',start:'08:00',end:'13:00'},'A:10':{kind:'早'},'B:10':{kind:'早'},'C:10':{kind:'晚'},'D:10':{kind:'晚'}};s.history={};s.locks={};
repairEvening(s.table);
if(get(s.staff[3],10).kind!=='晚'||daily(10).early!==3||daily(10).before!==2||daily(10).late!==3)throw Error('Actual November arrival times must allow early-to-late repair');
s.table['A:10']={kind:'半休'};
if(checks().some(e=>e.d===10&&['PAIR_FULLTIME_EARLY','EARLY_MIN','BEFORE_EIGHT_THIRTY_MIN','COVERAGE_INTERVAL','HALFDAY_MANAGER'].includes(e.ruleCode)))throw Error('Manager half day must satisfy early combination');
s.table['1011:10'].start='08:30';
if(!checks().some(e=>e.d===10&&e.ruleCode==='BEFORE_EIGHT_THIRTY_MIN'))throw Error('Exactly 08:30 is not before 08:30');
s.table['1011:10'].start='08:00';s.table['A:10']={kind:'休'};
if(!checks().some(e=>e.d===10&&e.ruleCode==='PAIR_FULLTIME_EARLY'))throw Error('Pair still needs a full-time early worker');
`,ctx);
console.log('Morning combination, 08:30 boundary, manager half day and evening repair passed');
