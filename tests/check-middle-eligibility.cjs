const fs = require('node:fs'), vm = require('node:vm');
const c = vm.createContext({structuredClone, localStorage:{getItem:()=>null,setItem(){}}});
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/render\(\);\s*$/,''),c);
vm.runInContext(`
const [p,a,b,c,d,e,f]=s.staff;
const put=(person,day,kind)=>s.table[key(person,day)]={kind};
const has=(code,day)=>checks().some(x=>x.ruleCode===code&&(day===undefined||x.d===day));
put(p,1,'中'); put(a,1,'早'); put(b,1,'早'); put(c,1,'晚'); put(d,1,'晚');
if(has('MIDDLE_NEED',1))throw Error('Middle itself must not count toward the baseline');
if(preservesMiddleNeed(e,1,{kind:'早'},s.table))throw Error('Third early worker must invalidate middle');
put(e,1,'早');
if(!has('MIDDLE_NEED',1))throw Error('Early coverage already satisfied');
put(e,1,'休'); put(f,1,'晚');
if(!has('MIDDLE_NEED',1))throw Error('Evening coverage already satisfied');
for(const [before,after] of [['晚','中'],['中','早'],['中','中']]){
 put(p,2,before); put(p,3,after);
 if(!has('MIDDLE_SEQUENCE',3))throw Error('Missing forbidden sequence: '+before+after);
}
put(p,2,'中');put(p,3,'晚');
if(has('MIDDLE_SEQUENCE',3))throw Error('Middle to late should be allowed');
put(p,5,'中');
if(!has('MIDDLE_MONTH_MAX'))throw Error('Third middle shift should be rejected');
`,c);
