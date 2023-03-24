const fs = require('fs');
const os = require('os');
const path = require('path');
const colors = require('colors');

const modsLook = require('./data/mods/mods-look.json');
const config = require('./config.json');

const modNamePrefix = config.modNamePrefix

const modsInstaller = fs.readdirSync(__dirname + '/data/mods');
const modsInstallerPath = __dirname + '/data/mods';
const platform = os.platform();

const home = os.homedir();

const minecraftPathWin = path.join(home, 'AppData', 'Roaming', '.minecraft');
const minecraftPathMac = path.join(home, 'Library', 'Application Support', 'minecraft');
const minecraftPath = platform === 'win32' ? minecraftPathWin : minecraftPathMac; //TODO: Add support for Linux


main();


function main(){
	console.log('\x1Bc');
	if(!minecraftRootFolderCheck()){
		return;
	}
	if(!minecraftModsFolderCheck()){
		return;
	}
	if(!minecraftOldModsFolderCheck()){
		return;
	}
	const folderData = getFolderData();
	message('Loading', 0);
	modsPackageOperation(folderData);
	oldModsMove(folderData);
	message('installCompleted', 300000, modsLook.modsPackage.modsCoreVerison + ' | ' + modsLook.modsPackage.packageVersion);
}


function getFolderData(){
	let date = new Date();
	const minecraftModsPath = minecraftPath + '/mods';
	const modsMinecraft = fs.readdirSync(minecraftModsPath);
	const oldModsPath =  minecraftModsPath + '/old-mods';
	const oldModsPathDate = oldModsPath + '/' + date.toDateString().replace(/:/g, '-') + ' ' + date.getTime().toString(36);
	console.log(minecraftModsPath);
	console.log(fs.readdirSync(minecraftModsPath));
	return {
		minecraftModsPath: minecraftModsPath,
		modsMinecraft: modsMinecraft,
		oldModsPath: oldModsPath,
		oldModsPathDate: oldModsPathDate,
	}
}


function minecraftRootFolderCheck(){
	if (!fs.existsSync(minecraftPath)){
		message('MinecraftRootFolderDosentExist')
		return false;
	}
	return true;
}

function minecraftModsFolderCheck(){
	if (!fs.existsSync(minecraftPath + '/mods')){
		fs.mkdirSync(minecraftPath + '/mods');
	}
	if (!fs.existsSync(minecraftPath + '/mods')){
		message('MinecraftModsFolderDosentExist');
		return false;
	}
	return true;
}

function minecraftOldModsFolderCheck(){
	if (!fs.existsSync(minecraftPath + '/mods/old-mods')){
		fs.mkdirSync(minecraftPath + '/mods/old-mods');
	}
	if (!fs.existsSync(minecraftPath + '/mods/old-mods')){
		message('MinecraftOldModsFolderDosentExist');
		return false;
	}
	return true;
}


function modsPackageOperation(folderData){
	if(!fs.existsSync(folderData.minecraftModsPath + '/.mods-look.json')){
		modsCopy(folderData);
		actualModsLookCopy(folderData);
		return;
	}
	modsLookFilter(folderData);	
	modsCopy(folderData);
	actualModsLookCopy(folderData);
}

function modsLookFilter(folderData){
		console.log(folderData.modsMinecraft);
		const modsMinecraftFiltered = folderData.modsMinecraft.filter(mod => mod.startsWith(modNamePrefix) && mod.endsWith('.jar')) || [];
		const modsToDelete = modsMinecraftFiltered.filter(elem => modsLook.mods.findIndex(i=>i.name == elem) === -1);
		modsToDelete.forEach(mod => {
			fs.unlinkSync(folderData.minecraftModsPath + '/' + mod);
		});
}

function modsCopy(folderData){
	for (const mod of modsInstaller) {
		if (mod.endsWith('.jar')) {
			fs.copyFileSync(modsInstallerPath + '/' + mod, folderData.minecraftModsPath + '/' + mod);
		}
	}
}

function actualModsLookCopy(folderData){
	fs.copyFileSync(modsInstallerPath + '/mods-look.json', folderData.minecraftModsPath + '/.mods-look.json');
}

function oldModsMove(folderData){
	let oldModsPathDateExist = fs.existsSync(folderData.oldModsPathDate);
	for (const mod of folderData.modsMinecraft) {
		if (!mod.startsWith(modNamePrefix) && mod.endsWith('.jar')) {
			if (!oldModsPathDateExist) {
				fs.mkdirSync(folderData.oldModsPathDate);
				oldModsPathDateExist = true;
			}
			fs.renameSync(folderData.minecraftModsPath + '/' + mod, folderData.oldModsPathDate + '/' + mod);
		}
	}
}


function message(name, timeMs = 300000, description = null){
	console.log('\x1Bc');
	if (description === null){
		description = config.messages[name].description;
	}
	config.messages[name].body.forEach(str => {
		config.messages[name].type === 'OK' ? console.log(str.bgGreen):
		config.messages[name].type === 'ERROR' ? console.log(str.bgRed): console.log(str.bgWhite);
	});
	console.log('');
	if (description !== null){
		console.log(description)
		console.log('');
	}
	sleep(timeMs);
}


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}