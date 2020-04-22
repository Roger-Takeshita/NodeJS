const event = {
    name: 'Birthday Party',
    guestList: ['Roger', 'Thaisa', 'Yumi'],
    printGuestList() {
        this.guestList.forEach((guest) => {
            console.log(`Guest ${guest} is attending ${this.name}`);
        });
    },
    printGuestList2: function () {
        this.guestList.forEach((guest) => {
            console.log(`Guest ${guest} is attending ${this.name}`);
        });
    }
};

event.printGuestList();
console.log();
event.printGuestList2();
