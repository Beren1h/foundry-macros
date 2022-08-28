new Dialog({
    title: "Universal Player D20",
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
            width: 150px;
        }
     </style>
     <p class="outer">
        <div class="box">
            <label>ability score</label>
            <select id="ab">
                <option value="1">strength</option>
                <option value="2">dexterity</option>
                <option value="2">constitution</option>
                <option value="5">intelligence</option>
                <option value="0">wisdom</option>
                <option value="-1">charisma</option>
            </select>
        </div>
        <div class="box">
            <label>proficency bonus</label>
            <select id="pb">
                <option value="-2">-2</option>
                <option value="2">+2</option>
                <option value="3" selected>+3</option>
                <option value="4">+4</option>
                <option value="5">+5</option>
                <option value="6">+6</option>
            </select>
            <select id="pm">
                <option value="0">not proficient</option>
                <option value="0.5">half proficient</option>
                <option value="1" selected>proficient</option>
                <option value="2">expertise</option>
            </select>
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
        content.find('[id=ab]')[0].focus();
    },
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll",
            callback: async (content) => {

                let ability = content.find('[id=ab]')[0];
                let proficiency = content.find('[id=pm]')[0];
                let rollAdjustment = content.find('[id=ra]')[0];
                let pb = content.find('[id=pb')[0].value;
                let am = parseFloat(ability.value);
                let pm = parseFloat(proficiency.value);
                let ra = rollAdjustment.value;
                let pbpm = Math.floor(pb * pm);
                let abilityPlus = am >= 0 ? "+" : "";
                
                switch(ra)
                {
                    case "1":
                        formula = "2d20kh"
                        formulaWord = "(advantage)"
                        break;
                    case "-1":
                        formula = "2d20kl"
                        formulaWord = "(disadvantage)"
                        break;
                    default:
                        formula = "1d20"
                        formulaWord = ""
                }

                let roll = new Roll(formula + "+" + am + "+" + pbpm);
                
                await roll.evaluate(async=true);

                await roll.toMessage({
                    flavor: `
                        <div>${abilityPlus}${am} ${ability.options[ability.selectedIndex].text}</div>
                        <div>+${pbpm} ${proficiency.options[proficiency.selectedIndex].text}</div>
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