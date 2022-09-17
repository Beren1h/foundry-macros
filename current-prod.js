new Dialog({
    title: "Roll d20 + modifier",
    content: `
        <p>
            <label>Count:</label>
            <input style="width:100%" id="count" value=1 />
            <label>Die Size:</label>
            <input style="width:100%" id="die" />
            <label>Modifier:</label>
            <input style="width:100%" id="modifier" />
            <label>Advantage/Disadvantage:</label>
            <input style="width:100%" id="adjust" />
        </p>
     `,
    render: (content) => {
        content.find('[id=count]')[0].select();
        content.find('[id=count]')[0].focus();
    },
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll!",
            callback: (content) => {
                modifier = content.find('[id=modifier]')[0].value;
                die = content.find('[id=die]')[0].value;
                adj = content.find('[id=adjust]')[0].value;
                count = content.find('[id=count]')[0].value;
                switch(adj)
                {
                    case "a":
                        var roll = new Roll("2d" + die + "kh + " + modifier);
                        break;
                    case "d":
                        var roll = new Roll("2d" + die + "kl + " + modifier);
                        break;
                    default:
                        var roll = new Roll(count + "d" + die + " + " + modifier);
                }
                roll.toMessage();
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