const fs = require('fs');
const os = require('os');
const path = require('path');
const colors = require('colors');

const modsLook = require('./data/mods/mods-look.json');
const config = require('./config.json');
const devMode = process.env.DEV_MODE || false;
// const devMode = env.DEV_MODE === 'true' ? true : false;

const modNamePrefix = config.modNamePrefix
const modIngorePreifx = config.modIgnorePrefix

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
	try{
		if(devMode){
			message('devMode', 5000);
		}
		if(!minecraftRootFolderCheck()){
			return;
		}
		if(!minecraftInnerFolderCheck('/mods', 'minecraftModsFolderDosentExist')){
			return;
		}
		if(!minecraftInnerFolderCheck('/mods/old-mods', 'minecraftOldModsFolderDosentExist')){
			return;
		}
		const folderData = getFolderData();
		message('loading', 0);
		modsPackageOperation(folderData);
		oldModsMove(folderData);
		message('installCompleted', 300000, modsLook.modsPackage.modsCoreVerison + ' | ' + modsLook.modsPackage.packageVersion);
	} catch (err){
		if (devMode){
			console.error(err);
		}
		message('unknownError');
	}
}


function getFolderData(){
	const date = new Date();
	const minecraftModsPath = minecraftPath + '/mods';
	const oldModsPath =  minecraftModsPath + '/old-mods';
	return {
		minecraftModsPath: minecraftModsPath,
		modsMinecraft: fs.readdirSync(minecraftModsPath),
		oldModsPath: oldModsPath,
		oldModsPathDate: oldModsPath + '/' + date.toDateString().replace(/:/g, '-') + ' ' + date.getTime().toString(36)
	}
}


function minecraftRootFolderCheck(){
	if (!fs.existsSync(minecraftPath)){
		message('MinecraftRootFolderDosentExist')
		return false;
	}
	return true;
}

function minecraftInnerFolderCheck(innerPath, folderDosentExistMessageName){
	if (!fs.existsSync(minecraftPath + innerPath)){
		fs.mkdirSync(minecraftPath + innerPath);
	}
	if (!fs.existsSync(minecraftPath + innerPath)){
		message(folderDosentExistMessageName);
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
		const modsMinecraftFiltered = folderData.modsMinecraft.filter(mod => mod.startsWith(modNamePrefix) && mod.endsWith('.jar'));
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
		if (
			!mod.startsWith(modNamePrefix) && mod.endsWith('.jar') &&
			!mod.startsWith(modIngorePreifx) && mod.endsWith('.jar')) {
			if (!oldModsPathDateExist) {
				fs.mkdirSync(folderData.oldModsPathDate);
				oldModsPathDateExist = true;
			}
			fs.renameSync(folderData.minecraftModsPath + '/' + mod, folderData.oldModsPathDate + '/' + mod);
		}
	}
}


function message(name, timeMs = 300000, description = null){
	if(!devMode){
		console.log('\x1Bc');
	}
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