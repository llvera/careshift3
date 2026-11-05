const fs=require('fs'),vm=require('vm'),assert=require('assert');
const c={localStorage:{getItem:()=>null,setItem:()=>{}},structuredClone,Date,Math,document:{querySelector:()=>null}};
vm.createContext(c);vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),c);
vm.runInContext(`render=()=>{};
for(const month of ['2026-02','2026-09','2026-10']){s.month=month;s.table={};s.locks={};generate();if(!s.generationRun?.nightCovered||Array.from({length:N()},(_,i)=>daily(i+1).night).some(n=>n!==1))throw Error('Uncovered night '+month);if(checks().some(e=>/夜勤应连续|夜勤缺少|夜勤超过|夜勤后需/.test(e.msg)))throw Error('Night block or recovery violated')}
// A first night on the last day is a valid cross-month group.
s.month='2026-10';s.table={};s.locks={'1002:31':true,'1002:30':true};s.table['1002:31']={kind:'夜'};s.table['1002:30']={kind:'休'};generate();if(!s.generationRun?.nightCovered||get(s.staff[1],31).kind!=='夜'||checks().some(e=>e.p?.id==='1002'&&e.d===31&&/缺少前一班|连续两班/.test(e.msg)))throw Error('Month-end first night rejected');
// Day one may complete last month's pair, followed by two rest days.
s.month='2026-11';s.table={};s.locks={};s.history={'1002':{nextNight:1,lastNight:0}};generate();if(!s.generationRun?.nightCovered||get(s.staff[1],1).kind!=='夜'||[2,3].some(d=>get(s.staff[1],d).kind!=='休'))throw Error('Month-start continuation');s.history={};
// One ordinary worker cannot cover every night while retaining recovery.
s.staff=s.staff.filter(p=>p.id==='1002');s.table={};s.locks={};generate();if(s.generated)throw Error('Impossible two-night/two-rest plan accepted');
// Explicitly locked leave must remain intact and cannot be marked complete.
s.table={'1002:1':{kind:'有休'}};s.locks={'1002:1':true};generate();if(s.generated||get(s.staff[0],1).kind!=='有休')throw Error('Impossible plan incorrectly accepted');`,c);
console.log('Night coverage and mandatory paired nights/recovery checks passed');
