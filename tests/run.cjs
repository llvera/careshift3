const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');let failed=0;
for(const file of fs.readdirSync(__dirname).filter(f=>f.startsWith('check-')&&f.endsWith('.cjs')).sort()){
 const result=spawnSync(process.execPath,[path.join(__dirname,file)],{cwd:root,encoding:'utf8'});
 console.log(`${result.status===0?'PASS':'FAIL'} ${file}`);
 if(result.status!==0){failed++;console.error(result.stdout,result.stderr)}
}
process.exitCode=failed?1:0;
