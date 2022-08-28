main();

async function main () {

    const me = "thadric"

    game.macros.getName("SetThadric").execute();
    
    let actor = game.actors.getName(me);
    let thadric = actor.data.flags.obj;

    console.log("thadric=", thadric);

    let chatData = {
        content: 8 + thadric.pb + thadric.int
    }

    ChatMessage.create(chatData, {});
}