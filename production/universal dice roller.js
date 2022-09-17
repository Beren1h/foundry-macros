function CreateRoll(formula)
{
    return new Roll(formula);
}

async function SendRollToChat(roll, flavor){
    
    await roll.evaluate(async=true);

    return roll.toMessage({
        flavor: `
            ${flavor}
        `
    });
}

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
                <div>+SHIFT roll twice</div>
            </div>
        </div>
        <div class="box">
            <label>modifer</label>
            <input id="mod" value=0 />
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
     </div>
    `,
    render: (content) => {
        content.find('[id=mod]')[0].focus();
        content.find('[id=mod]')[0].select();
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

                const baseFlavor = "universal dice roller"

                let flavors = [ baseFlavor ]

                if (window.event){
                    if (shift) {
                        flavors = [
                            baseFlavor + " (1 of 2)",
                            baseFlavor + " (2 of 2)"
                        ]
                    };
                    if (alt){
                        baseFormula = "2d20kl"
                    };
                    if (ctrl){
                        baseFormula = "2d20kh"
                    };
                }
                
                let operator = modifer.value < 0 ? "-" : "+";
                let formula = baseFormula + operator + Math.abs(modifer.value);

                await SendRollToChat(
                    CreateRoll(formula), 
                    flavors[0]
                );

                if (shift)
                {
                    await SendRollToChat(
                        CreateRoll(formula),
                        flavors[1]
                    );
                }
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