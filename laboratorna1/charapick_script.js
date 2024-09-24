const character_data = {
    human: { hp: 14, atk: 8, def: 6, stamina: 10, trait: "Balance", icon: "human_icon.png" },
    elf: { hp: 17, atk: 9, def: 6, stamina: 12, trait: "Agility", icon: "elf_icon.png" },
    fairy: { hp: 12, atk: 6, def: 4, stamina: 16, trait: "High speed", icon: "fairy_icon.png" },
    goliath: { hp: 22, atk: 12, def: 8, stamina: 7, trait: "Crushing strength", icon: "goliath_icon.png" },
    orc: { hp: 20, atk: 10, def: 5, stamina: 9, trait: "Strike chain", icon: "orc_icon.png" },
    tiefling: { hp: 18, atk: 7, def: 7, stamina: 10, trait: "Deceit", icon: "tiefling_icon.png" },
};

const class_data = {
    barbarian: { hp: 4, atk: 5, def: 2 },
    druid: { hp: 3, atk: 2, def: 2 },
    monk: { hp: 2, atk: 3, def: 3 },
    paladin: { hp: 2, atk: 2, def: 5 },
    rogue: { hp: 1, atk: 6, def: 1 },
    sorcerer: { hp: 1, atk: 7, def: 0 },
    none: { hp: 0, atk: 0, def: 0 }
};

const enemy_data = {
    dragon: { hp: 25, atk: 15, def: 4 },
    cyclop: { hp: 18, atk: 12, def: 2 },
    goblin: { hp: 10, atk: 8, def: 0 },
};

function update_stats() {

    const race_selector = document.querySelector('#character_race');
    const race = race_selector.value;

    const class_selector = document.querySelector('input[name="class"]:checked');
    const c_class = class_selector ? class_selector.value : 'none';


    const race_stats = character_data[race];
    const class_stats = class_data[c_class];

    if (race_stats) {

        document.getElementById('hp').textContent = race_stats.hp + class_stats.hp;
        document.getElementById('atk').textContent = race_stats.atk + class_stats.atk;
        document.getElementById('def').textContent = race_stats.def + class_stats.def;
        document.getElementById('stamina').textContent = race_stats.stamina;
        document.getElementById('trait').textContent = race_stats.trait;

        const character_img = document.getElementById('character_icon');

        character_img.src = race_stats.icon;
        character_img.style.display = 'block';

    } 
    
    else document.getElementById('character_icon').style.display = 'none';
}

function start_fight() {

    const race_selector = document.getElementById('character_race');
    const race = race_selector.value;

    const class_selector = document.querySelector('input[name="class"]:checked');
    const c_class = class_selector ? class_selector.value : 'none';

    const race_stats = character_data[race];
    const class_stats = class_data[c_class];

    const total_HP = race_stats.hp + class_stats.hp;
    const total_ATK = race_stats.atk + class_stats.atk;
    const total_DEF = race_stats.def + class_stats.def;

    const enemy_i = Object.keys(enemy_data);
    const enemy_type = enemy_i[Math.floor(Math.random() * enemy_i.length)];
    const enemy_stats = enemy_data[enemy_type];

    const character_end_hp = total_DEF + total_HP - enemy_stats.atk;
    const enemy_end_hp = enemy_stats.def + enemy_stats.hp - total_ATK;

    if (character_end_hp > enemy_end_hp && character_end_hp !=0) win = 1;
    else win = 0;

    const character_name_input = document.getElementsByTagName('input')[0];
    const character_name = character_name_input.value.trim();
    const display_name = character_name || 'Your character';

    if (win) alert(`${display_name} won against the ${enemy_type}!`);
    else alert(`${display_name} lost to the ${enemy_type}!`);
}

document.getElementById('character_race').addEventListener('change', update_stats);

document.querySelectorAll('input[name="class"]').forEach((input) => { input.addEventListener('change', update_stats); });

document.getElementById('startFight').addEventListener('click', start_fight);
