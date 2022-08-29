async function DeleteRolls(){
    let actor = game.actors.getName("data");
    actor.data.flags.rolls = [];
}

//await DeleteRolls();

async function SaveRoll(roll)
{
    let actor = game.actors.getName("data");

    if (roll._formula == "1d20 + 99")
    {
        actor.data.flags.rollHistory = [];
        return;
    }

    let rollHistory = actor.data.flags.rollHistory;

    rollHistory = rollHistory === undefined ? [] : rollHistory;
    
    let clone = [...rollHistory];

    console.log("clone", clone);

    var duplicate = clone.some(item => {
        return item._formula == roll._formula;
    });

    if (!duplicate)
    {
        clone.push(roll);
        rollHistory = clone;
    }
    //rollHistory.push(roll);

    //let duplicate = false;

    // for(var item of rollHistory)
    // {
    //     console.log(item._formula, "   ", roll._formula, "   ", item._formula == roll._formula);
    //     if (item._formula == roll._formula)
    //     {
    //         duplicate = true;
    //         break;
    //     }
    // }

    // let duplicate = rollHistory.some(item => {
    //     //console.log(roll._formula, item._formula);
    //     return item._formula == roll._formula
    //     // if (item._formula == roll._formula)
    //     // {
    //     //     console.log("duplicate exit");
    //     //     return true;
    //     // }
    //     // console.log("not duplicate");
    //     // return false;
    // });

    //console.log("duplicate", duplicate);

    // if (!duplicate)
    // {
    //     actor.data.flags.rollHistory = rollHistory;
    // }

    // rollHistory.every(item => {
    //     if (item._formula == roll._formula)
    //     {
    //         match = true;
    //         return false;
    //     }
    //     return true;
    // });

    // rollHistory.forEach((item) => {
    //     if (item._formula == roll._formula)
    //     {
    //         match = true;
    //         return;
    //     }
    // });

    //let rollHistory = actor.data.flags.rollHistory ?? [];
    //rolls.push(roll);
    //actor.data.flags.rolls = rolls.push(roll);
    //console.log("save roll = ", rolls, "roll", roll);
    

    console.log("wtf", rollHistory);
}

async function DoRoll(roll, flavor)
{
    await roll.evaluate(async=true);

    return roll.toMessage({
        flavor: `
            ${flavor}
        `
    });
}

// async function GetRolls()
// {
//     let actor = game.actors.getName("data");
//     let o = "";

//     let x = actor.data.flags.rolls ?? [];



//     x.forEach((item, index) => {
//         console.log(item);
//         o = o + "<option value=\"" + item._Formula + "\">" + item._Formula + "</option>"
//     })

//     return o;
// }

// let rolls = await GetRolls();

//console.log(rolls);

new Dialog({
    title: "Universal Dice Roller",
    content: `
     <style>
        .outer {
            display: flex;
            flex-direction: column;
        }
        .box {
            display: flex;
            flex-direction: row;
            gap: 10px;
            margin: 0 0 10px 0;
        }
        .box label {
            width: 125px;
        }
        .instruction {
            display: flex;
            flex-direction: column;
            gap: 5px;
            background-color: #E8E8E8;
            border-radius: 4px;
            padding: 4px;
        }
        .instruction div {
            font-size: 12px;
            font-weight: 700
        }
     </style>
     <div class="outer">
        <div class="box">
            <div class="instruction">
                <div>+CTRL advantage</div>
                <div>+ALT disadvantage</div>
            </div>
        </div>
        <div class="box">
            <label>count</label>
            <input id="count" value=1 />
        </div>
        <div class="box">
            <label>die sides</label>
            <select id="die">
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20" selected>20</option>
                <option value="100">100</option>
            </select>
        </div>

        <div class="box">
            <label>modifer</label>
            <input id="mod" value=0 />
        </div>
     </div>
    `,
    render: (content) => {
        content.find('[id=count]')[0].focus();
        content.find('[id=count]')[0].select();
    },
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll",
            callback: async (content) => {

                let count = content.find('[id=count]')[0];
                let die = content.find('[id=die]')[0];
                let modifer = content.find('[id=mod]')[0];
                
                let baseFormula = count.value + "d" + die.value;

                let shift = !!window.event.shiftKey;
                let ctrl = !!window.event.ctrlKey;
                let alt = !!window.event.altKey;

                if (window.event){
                    if (shift) {
                        //what cool thing to do here?
                    };
                    if (alt){
                        baseFormula = "2d20kl"
                    };
                    if (ctrl){
                        baseFormula = "2d20kh"
                    };
                }
                
                //console.log(window.event);

                let formula = baseFormula + "+" + modifer.value + " # booyah";

                let roll = new Roll(formula);

                await SaveRoll(roll);

                //let flavor = "universal dice roller";
                //let flavor = shift ? baseFlavor + " (1 of 2)" : baseFlavor;

                //let actor = game.actors.getName("data");

                //var rolls = actor.data.flags.rolls ?? [];
                
                //console.log(rolls);

                //rolls.push(await DoRoll(roll, flavor));
                
                //let actor = game.actors.getName("data");

                //actor.data.flags.rolls = rolls;
            

                //var a = await DoRoll(roll, flavor);

                //console.log("a=", a);

                //await a;
                
                // if (shift)
                // {
                //     let repeat = new Roll(formula);
                //     rolls.push(await DoRoll(repeat, flavor + " (repeat)"));
                // }

                //console.log(rolls);
                // await roll.evaluate(async=true);

                // await roll.toMessage({
                //     flavor: `
                //         universal dice roller
                //     `
                // });


                //let last = new Roll(formula);

                //await DoRoll(last, "udr last");
                // await last.evaluate(async=true);

                // await last.toMessage({
                //     flavor: `
                //         universal dice roller (last)
                //     `
                // });

                // let chat = {
                //     content: `
                //         ${roll.formula}
                //     `
                // }

                // let chat = {
                //     content: `
                //         alt = ${alt}
                //         shift = ${shift}
                //         ctrl = ${ctrl}
                //     `
                // };

                // ChatMessage.create(chat, {});
            }
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => {}
        } 
    },
    default: "one",
    close: () => {}
}).render(true);

