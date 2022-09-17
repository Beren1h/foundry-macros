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
            align-items: center;
            flex-direction: row;
            gap: 10px;
            margin: 0 0 10px 0;
        }
        .box label {
            display: block;
            text-align: right;
            width: 135px;
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
            <label>proficiency bonus</label>
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
     </div>
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
                let pb = content.find('[id=pb')[0].value;
                let am = parseFloat(ability.value);
                let pm = parseFloat(proficiency.value);
                let pbpm = Math.floor(pb * pm);
                let abilityPlus = am >= 0 ? "+" : "";
                
                let formula = "1d20";

                if (window.event){
                    if (!!window.event.shiftKey) {
                        //what cool thing to do here?
                    };
                    if (!!window.event.altKey){
                        formula = "2d20kl"
                    };
                    if (!!window.event.ctrlKey){
                        formula = "2d20kh"
                    };
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