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
     </style>
     <p class="outer">
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
                <option value="20">20</option>
                <option value="100">100</option>
            </select>
        </div>
        <div class="box">
            <label>modifer</label>
            <input id="mod" value=0 />
        </div>
        <div class="box">
            <label>roll adjustment</label>
            <select id="ra">
                <option value="0">normal</option>
                <option value="1">advantage</option>
                <option value="-1">disadvantage</option>
            </select>
        </div>
     </p>
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

                // let ability = content.find('[id=ab]')[0];
                // let proficiency = content.find('[id=pm]')[0];
                let count = content.find('[id=count]')[0];
                let die = content.find('[id=die]')[0];
                let modifer = content.find('[id=mod]')[0];
                 let adjustment = content.find('[id=ra]')[0];
                // let pb = content.find('[id=pb')[0].value;
                // let am = parseFloat(ability.value);
                // let pm = parseFloat(proficiency.value);
                let ra = adjustment.value;
                // let pbpm = Math.floor(pb * pm);
                // let abilityPlus = am >= 0 ? "+" : "";
                
                let baseFormula = count.value + "d" + die.value;

                switch(ra)
                {
                    case "1":
                        baseFormula = "2d20kh"
                        formulaWord = "(advantage)"
                        break;
                    case "-1":
                        baseFormula = "2d20kl"
                        formulaWord = "(disadvantage)"
                        break;
                    // default:
                    //     formula = baseFormula
                    //     formulaWord = ""
                }

                let roll = new Roll(baseFormula + "+" + modifer.value);
                // let roll = new Roll(formula + "+" + am + "+" + pbpm);
                
                await roll.evaluate(async=true);

                // <div>${abilityPlus}${am} ${ability.options[ability.selectedIndex].text}</div>
                // <div>+${pbpm} ${proficiency.options[proficiency.selectedIndex].text}</div>

                await roll.toMessage({
                    flavor: `
                        idk
                    `
                });
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

