class Warrior {
    constructor(id, healthElement) {
        this.element = document.getElementById(id);
        this.healthElement = healthElement;
        this.position = id === 'red-warrior' ? 50 : 700;
        this.health = 150;
        this.isDefending = false;
        this.element.style.left = this.position + 'px';
    }

    move(direction) {
        if (direction === 'left' && this.position > 0) {
            this.position -= 10;
        } else if (direction === 'right' && this.position < 760) {
            this.position += 10;
        }
        this.element.style.left = this.position + 'px';
    }

    attack() {
        this.element.classList.add('attacking');
        return true;
    }

    defend() {
        this.isDefending = true;
        this.element.classList.add('defending');
        setTimeout(() => {
            this.isDefending = false;
            this.element.classList.remove('defending');
        }, 500);
    }

    takeDamage() {
        if (!this.isDefending) {
            this.health -= 10;
            this.healthElement.style.width = (this.health / 150) * 100 + '%';
            this.healthElement.textContent = this.health;
        }
        return this.health <= 0;
    }
}

const redWarrior = new Warrior('red-warrior', document.getElementById('red-health'));
const blueWarrior = new Warrior('blue-warrior', document.getElementById('blue-health'));
const gameMessage = document.getElementById('game-message');

function checkDistance() {
    return Math.abs(redWarrior.position - blueWarrior.position) <= 70;
}

function showMessage(message) {
    gameMessage.textContent = message;
}

document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        // Red Warrior Controls
        case 'a':
            redWarrior.move('left');
            break;
        case 'd':
            redWarrior.move('right');
            break;
        case 'w':
            if (redWarrior.attack() && checkDistance()) {
                if (blueWarrior.takeDamage()) {
                    showMessage('Red Warrior Wins!');
                    document.removeEventListener('keydown', () => {});
                }
            }
            break;
        case 's':
            redWarrior.defend();
            break;

        // Blue Warrior Controls
        case 'j':
            blueWarrior.move('left');
            break;
        case 'l':
            blueWarrior.move('right');
            break;
        case 'i':
            if (blueWarrior.attack() && checkDistance()) {
                if (redWarrior.takeDamage()) {
                    showMessage('Blue Warrior Wins!');
                    document.removeEventListener('keydown', () => {});
                }
            }
            break;
        case 'k':
            blueWarrior.defend();
            break;
    }
});