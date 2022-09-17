main();

async function main()
{
    const thadric = {
        "name": "thadric",
        "pb": 2,
        "actions": [
            {
                "name": "",
                "use": 0,
                "reset": "",
                "description": ""
            }
        ],
        "hitDice": [
            { 
                size: 10, 
                max: 3,
                current: 3
            },
            { 
                size: 8,
                max: 3,
                current: 3
            }
        ],
        "abilities": {
            "str": 1,
            "dex": 2,
            "con": 2,
            "int": 5,
            "wis": 0,
            "cha": -1
        }
    };    

    let actor = game.actors.getName(thadric.name);

    actor.data.flags.obj = thadric;

    console.log(actor.id, actor);
    
}
