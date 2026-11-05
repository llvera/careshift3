const fs=require('node:fs'),vm=require('node:vm');
const c=vm.createContext({structuredClone,localStorage:{getItem:()=>null,setItem(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),c);
vm.runInContext(`
render=()=>{};s.month='2026-11';s.staff=[
 {id:'1010',full:false},{id:'1011',full:false},
 {id:'A',full:true,manager:true},{id:'B',full:true},{id:'C',full:true},{id:'D',full:true}
];s.table={'1010:24':{kind:'兼职',start:'07:00',end:'13:00'},'1011:24':{kind:'兼职',start:'07:00',end:'13:00'},'A:24':{kind:'早'},'B:24':{kind:'早'},'C:24':{kind:'晚'},'D:24':{kind:'晚'}};s.locks={};s.history={};
const input=daily(24);
if(coveragePriority('晚',input,4)<=coveragePriority('早',input,4))throw Error('Evening deficit should beat redundant early');
repairEvening(s.table);
if(get(s.staff[3],24).kind!=='晚'||daily(24).early!==3||daily(24).late!==3)throw Error('Two part-time early + one full-time early should free the other full-time employee');
if(checks().some(e=>e.d===24&&['MAX_CONSECUTIVE','MIDDLE_SEQUENCE','COVERAGE_INTERVAL'].includes(e.ruleCode)))throw Error('Repair violated constraints');
s.table['B:24']={kind:'早'};s.locks['B:24']=true;repairEvening(s.table);
if(s.table['B:24'].kind!=='早')throw Error('Locked early changed');
s.locks={};s.table['1010:24'].start='08:30';repairEvening(s.table);
if(s.table['B:24'].kind!=='晚')throw Error('Removed morning continuous requirement must not block repair');
`,c);
console.log('November 24: part-time early replacement, evening priority, locks and morning coverage passed');
