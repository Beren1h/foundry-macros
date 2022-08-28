main()

async function main () {
    let match = "1";
    //let tokens = canvas.tokens.placeables.filter(i => i.data.name == token.data.name);
    let tokens = canvas.tokens.placeables.filter(i => i.data.name == match);
    tokens.forEach(i => i.control({
        releaseOthers: false
    }))
}

async function main () {
    canvas.tokens.placeables.forEach(token => {
        if (token.data.name == "1")
        {
            token.control;
        }
    });
}