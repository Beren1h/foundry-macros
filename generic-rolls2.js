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

                if (window.event){
                    if (!!window.event.shiftKey) {
                        //what cool thing to do here?
                    };
                    if (!!window.event.altKey){
                        baseFormula = "2d20kl"
                    };
                    if (!!window.event.ctrlKey){
                        baseFormula = "2d20kh"
                    };
                }

                let roll = new Roll(baseFormula + "+" + modifer.value);
                
                await roll.evaluate(async=true);

                await roll.toMessage({
                    flavor: `
                        universal dice roller
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

