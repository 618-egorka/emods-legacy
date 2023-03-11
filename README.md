Установка
===========

Потребуется Майнкрафт с установленным [Fabric 1.19.2](https://fabricmc.net/use/installer/)

Скачай релиз сборки для твоей системы (macOS / Windows) и запусти установщик. Всё готово, сборка установлена. Если у тебя были какие-то свои моды, то установщик поместил их в папку `mods/old-mods/текущая-дата`, чтобы ты их не потерял


Windows жалуется
===========

Windows может посчитать файл установки вредоносным. В таком случае нажми
```
подробнее → выполнить в любом случае
```

Моды в этой версии
===========

Значком `✦` помечены обязательные к установке моды для игры на сервере. Всего 26 модов

| Название + ссылка  | Описание  |
|-------------:|:---------------|
| [✦ Fabric 1.19.2](https://fabricmc.net/use/installer/)| Ядро необходимое для запуска модов|
| [✦ Fabric API](https://www.curseforge.com/minecraft/mc-mods/fabric-api)| API необходимое для запуска модов|
| [✦ Creativecore](https://www.curseforge.com/minecraft/mc-mods/creativecore)| библиотека необходимая для запуска модов|
| [✦ Cloth config API](https://www.curseforge.com/minecraft/mc-mods/cloth-config)| API необходимое для запуска модов|
| [Phosphor](https://www.curseforge.com/minecraft/mc-mods/phosphor)| Оптимизация игры|
| [✦ Sodium](https://www.curseforge.com/minecraft/mc-mods/sodium)| Оптимизация игры (аналог OptiFine)|
| [Iris shaders](https://www.curseforge.com/minecraft/mc-mods/irisshaders)| Обеспечивает поддержику шейдеров для Sodium|
| [Falling leaves](https://www.curseforge.com/minecraft/mc-mods/falling-leaves-fabric)| Косметический мод, добавляет частицы листвы|
| [✦ Сreate](https://www.curseforge.com/minecraft/mc-mods/create-fabric)| Глобальный индустриальный мод добавляющий множество уникальных механик|
| [✦ Twilight forest](https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest)| Глобальный магический мод, добавляющий новое измерение|
| [✦ Farmers delight](https://www.curseforge.com/minecraft/mc-mods/farmers-delight-fabric)| Глобальный мод, разнообразит приготовление еды|
| [✦ Farmers respite](https://www.curseforge.com/minecraft/mc-mods/farmers-respite)| Аддон к farmers-delight, добавляющий приготовление чая, кофе и других напитков |
| [Dash loader](https://www.curseforge.com/minecraft/mc-mods/dashloader)| Оптимизация, кеширует файлы игры, ускоряя запуск в 2 раза |
| [Lazydfu](https://www.curseforge.com/minecraft/mc-mods/lazydfu)| Оптимизация, также ускоряет запуск игры в 2 раза |
| [Fastfurnace](https://www.curseforge.com/minecraft/mc-mods/fast-furnace-for-fabric)| Оптимизация, ускоряет печки за счёт кеширования последнего использованного рецепта|
| [Emotecraft](https://www.curseforge.com/minecraft/mc-mods/emotecraft)| Добавляет в игру эмоции|
| [Enhanced block entities](https://www.curseforge.com/minecraft/mc-mods/enhanced-block-entities)| Оптимизация, превращает блочные сущности в блоки, что очень сильно оптимизирует сундуки и подобные блоки|
| [Plasmovoice](https://www.curseforge.com/minecraft/mc-mods/plasmo-voice)| Добавляет в игру голосовой чат с множеством режимов|
| [Ambientsounds](https://www.curseforge.com/minecraft/mc-mods/ambientsounds)| Добавляет в игру множество фоновых звуков|
| [Chat up!](https://www.curseforge.com/minecraft/mc-mods/chat-up)| Немного приподнимает чат, чтобы он не перекрывал собой GUI|
| [First person model](https://www.curseforge.com/minecraft/mc-mods/first-person-model)| Улучшенный вид от первого лица|
| [Presence footsteps](https://www.curseforge.com/minecraft/mc-mods/presence-footsteps)| Добавляет звук для хождения по абсолютно каждому блоку|
| [Skin layers 3d](https://www.curseforge.com/minecraft/mc-mods/skin-layers-3d)| Делает оверлей слой скина объёмным|
| [Smooth-swapping](https://www.curseforge.com/minecraft/mc-mods/smooth-swapping)| Добавляет анимации переноса предметов из Minecraft Bedrock|
| [Sound physics remastered](https://www.curseforge.com/minecraft/mc-mods/sound-physics-remastered)| Улучшает звук путём эмулирования его физики|
| [Visuality](https://www.curseforge.com/minecraft/mc-mods/visuality)| Добавляет множество небольших частиц, улучшающих взаимодействие с миром|


Разработка
-----------

Команда компиляции
```
pkg --compress Gzip .
```
