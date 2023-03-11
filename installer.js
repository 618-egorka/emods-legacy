const fs = require('fs');
const os = require('os');
const path = require('path');
const { exit } = require('process');
const colors = require('colors');

const modsLook = require('./data/mods/mods-look.json');

const modsInstaller = fs.readdirSync(__dirname + '/data/mods');
const modsInstallerPath = __dirname + '/data/mods';
const platform = os.platform();

const home = os.homedir();

const minecraftPathWin = path.join(home, 'AppData', 'Roaming', '.minecraft');
const minecraftPathMac = path.join(home, 'Library', 'Application Support', 'minecraft');
const minecraftPath = platform === 'win32' ? minecraftPathWin : minecraftPathMac; //FIXME: Add support for Linux

const minecraftModsPath = minecraftPath + '/mods';

const modsMinecraft = fs.readdirSync(minecraftModsPath);

const oldModsPath = minecraftModsPath + '/old-mods';
const date = new Date();
const oldModsPathDate = oldModsPath + '/' + date.toDateString().replace(/:/g, '-') + ' ' + date.getTime().toString(36);

const modNamePrefix = 'EMP_'

main();

function main(){
	console.log('\x1Bc');
	folderCheck();
	console.log('                                    '.bgWhite);
	console.log('           Установка сборки..       '.bgWhite);
	console.log('                                    '.bgWhite);
	modsPackageOperation();
	oldModsMove();
	console.log('\x1Bc');
	console.log('                                    '.bgGreen);
	console.log('         Cборка установлена         '.bgGreen);
	console.log('        (можно закрыть окно)        '.bgGreen);
	console.log('                                    '.bgGreen);
	console.log('');
	console.log(modsLook.modsPackage.modsCoreVerison + ' | ' + modsLook.modsPackage.packageVersion);
	console.log('');
	console.log('');
}

function folderCheck(){
	if (!fs.existsSync(minecraftPath)) {
		console.log('\x1Bc');
		console.log('                                    '.bgRed);
		console.log('     Корневая папка майнкрафта      '.bgRed);
		console.log('              не найдена            '.bgRed);
		console.log('                                    '.bgRed);
		console.log('');
		console.log('');
		exit(127);
	}
	if (!fs.existsSync(minecraftModsPath)) {
	fs.mkdirSync(minecraftModsPath);
	}
	if (!fs.existsSync(oldModsPath)) {
		fs.mkdirSync(oldModsPath);
	}
}


function modsPackageOperation(){
	if(!fs.existsSync(minecraftModsPath + '/.mods-look.json')){
		modsCopy();
		actualModsLookCopy();
		return;
	}
	modsLookFilter();	
	modsCopy();
	actualModsLookCopy();
}


function modsLookFilter(){
		// const modsLook = require(modsInstallerPath + '/mods-look.json');
		const modsMinecraftFiltered = modsMinecraft.filter(mod => mod.startsWith(modNamePrefix) && mod.endsWith('.jar'));
		const modsToDelete = modsMinecraftFiltered.filter(elem => modsLook.mods.findIndex(i=>i.name == elem) === -1);

		modsToDelete.forEach(mod => {
			fs.unlinkSync(minecraftModsPath + '/' + mod);
			// console.log('┃┣ Обновлено '.gray + mod);
		});
}


function modsCopy(){
	for (const mod of modsInstaller) {
		if (mod.endsWith('.jar')) {
			fs.copyFileSync(modsInstallerPath + '/' + mod, minecraftModsPath + '/' + mod);
		}
	}
}

function actualModsLookCopy(){
	fs.copyFileSync(modsInstallerPath + '/mods-look.json', minecraftModsPath + '/.mods-look.json');
}


function oldModsMove(){
	oldModsPathDateExist = fs.existsSync(oldModsPathDate);
	for (const mod of modsMinecraft) {
		if (!mod.startsWith(modNamePrefix) && mod.endsWith('.jar')) {
			if (!oldModsPathDateExist) {
				fs.mkdirSync(oldModsPathDate);
				oldModsPathDateExist = true;
			}
			fs.renameSync(minecraftModsPath + '/' + mod, oldModsPathDate + '/' + mod);
		}
	}
}