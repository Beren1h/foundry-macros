new Dialog({
    title: "Minion Overkill",
    content: `
        <style>
            xborder: {1px solid #000000}
        </style>
        <p>
            <label>Minion HP:</label>
            <input style="width:100%" id="hp" />
            <label>Damage:</label>
            <input style="width:100%" id="damage" />
        </p>
     `,
    render: (content) => {
        content.find('[id=hp]')[0].select();
        content.find('[id=hp]')[0].focus();
    },
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Calculate",
            callback: (content) => {
                hp = content.find('[id=hp]')[0].value;
                damage = content.find('[id=damage]')[0].value;
                kills = 0;
                while (damage > 0)
                {
                    if (damage > 0)
                    {
                        kills += 1;
                    }
                    damage = damage - hp;
                };
                if (kills < 0)
                {
                    kills = 0
                }
                ChatMessage.create({
                    flavor: 'overkills (' + content.find('[id=damage]')[0].value + ' damage on ' + hp + ' hp)',
                    content: "<h2>" + parseInt(kills - 1) + "</h2>"
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