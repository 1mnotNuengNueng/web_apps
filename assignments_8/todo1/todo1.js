
function delayAndRandom() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let num = Math.floor(Math.random() * 10);
            resolve(num);
        }, 2000);
    });
}

async function random_num() {
    let i = 0;

    while (i < 3) {
        console.log("Wait 2 second ...");

        let num = await delayAndRandom();
        console.log(`Num ${i + 1} : ${num}`);

        if (num % 2 !== 0) {
            console.log("You lost");
            return;
        }

        i++;
    }

    console.log("You win");
}

random_num();