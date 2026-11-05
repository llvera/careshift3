const fs=require('node:fs'),vm=require('node:vm');
const c=vm.createContext({structuredClone,localStorage:{getItem:()=>null,setItem(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),c);
vm.runInContext(`
render=()=>{};
if(!forbiddenTransition({kind:'晚'},{kind:'早'}))throw Error('Late to early must be forbidden');
if(forbiddenTransition({kind:'早'},{kind:'晚'}))throw Error('Early to late must remain allowed');
const p=s.staff[2];s.table={[key(p,1)]:{kind:'晚'},[key(p,2)]:{kind:'早'}};s.locks={[key(p,1)]:true,[key(p,2)]:true};
let issue=checks().find(e=>e.ruleCode==='LATE_EARLY');
if(!issue||issue.severity!=='ERROR'||issue.soft)throw Error('Locked violation must stay a hard error');
s.staff=[{id:'1010',full:false},{id:'1011',full:false},{id:'A',full:true},{id:'B',full:true},{id:'C',full:true},{id:'D',full:true}];s.history={};s.locks={};
s.table={'1010:10':{kind:'兼职',start:'07:00',end:'13:00'},'1011:10':{kind:'兼职',start:'08:00',end:'13:00'},'A:10':{kind:'早'},'B:10':{kind:'早'},'A:11':{kind:'早'},'B:11':{kind:'早'},'C:10':{kind:'晚'},'D:10':{kind:'晚'}};
repairEvening(s.table);
if(s.table['A:10'].kind!=='早'||s.table['B:10'].kind!=='早')throw Error('Evening repair created late to early');
`,c);
console.log('Hard late-to-early validation and evening repair guards passed');
