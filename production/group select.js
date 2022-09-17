new Dialog({
    title: "Minion Overkill",
    content: `
        <p>
            <label>Group:</label>
            <input style="width:100%" id="group" />
        </p>
     `,
    render: (content) => {
        content.find('[id=group]')[0].select();
        content.find('[id=group]')[0].focus();
    },
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Select",
            callback: (content) => {
                let match = content.find('[id=group]')[0].value;
                let tokens = canvas.tokens.placeables.filter(i => i.data.name == match);
                tokens.forEach(i => i.control({
                    releaseOthers: false
                }))
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