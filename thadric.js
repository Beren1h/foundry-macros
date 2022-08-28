main();

async function main()
{
    const thadric = {
        "name": "thadric",
        "pb": 2,
        "int": 3
    };    

    let actor = game.actors.getName(thadric.name);

    actor.data.flags.obj = thadric;

    console.log(actor.id, actor);
    
}
