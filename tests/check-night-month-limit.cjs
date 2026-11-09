const fs=require('node:fs'),vm=require('node:vm');
const c=vm.createContext({structuredClone,localStorage:{getItem:()=>null,setItem(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),c);
vm.runInContext(`
s.month='2026-11';const p=s.staff.find(p=>p.id==='1002');
const set=(days)=>{s.table=Object.fromEntries(days.map(d=>[key(p,d),{kind:'夜'}]));};
const has=(code)=>checks().some(e=>e.p===p&&e.ruleCode===code&&e.severity==='ERROR');
set([3,4,12,13,22,23]);if(!has('NIGHT_MONTH_MAX'))throw Error('Six nights must be a hard error');
set([3,4,12,13,22]);if(!has('NIGHT_FIVE_REQUIRES_BOUNDARY'))throw Error('Five without cross-month must be rejected');
set([3,4,12,13,30]);if(nightQuotaViolations(s.table).length)throw Error('First night at month end should count toward five');
set([3,4,12,29,30]);if(!has('NIGHT_FIVE_REQUIRES_BOUNDARY'))throw Error('Pair entirely within this month is not cross-month');
set([1,8,9,19,20]);if(!has('NIGHT_FIVE_REQUIRES_BOUNDARY'))throw Error('Month-start night requires prior-month declaration');
s.history[p.id]={nextNight:1};if(nightQuotaViolations(s.table).length)throw Error('Declared month-start continuation should count toward five');
s.history={};s.table={};s.locks={};
if(!planNights(s.table,new Set())||nightQuotaViolations(s.table).length||Array.from({length:N()},(_,i)=>daily(i+1).night).some(n=>n!==1))throw Error('Night search must cover month within quota');
`,c);
console.log('Night quota: six rejected, five only with a cross-month pair, monthly generation verified');
