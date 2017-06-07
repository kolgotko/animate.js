'use strict';

class Animate {

    static run(struct = {}) {

        let {
            duration = 300,
            timing = timeFraction => timeFraction,
            draw = progress => {}
        } = struct;

        let start = performance.now();

        let reqest = time => {

            // timeFraction от 0 до 1
            let timeFraction = (time - start) / struct.duration;

            if (timeFraction > 1) timeFraction = 1;

            // текущее состояние анимации
            let progress = timing(timeFraction);

            draw((progress * 100));

            if (timeFraction < 1) requestAnimationFrame(reqest);

        }

        requestAnimationFrame(reqest);

    }

    /* Пример использования

    Animate.linear({
        duration: 300,
        draw: progress => {

            console.log(progress);

        }
    })

    */

    static linear(struct) {

        struct.timing = timeFraction => timeFraction;
        Animate.run(struct);

    }

    /* Пример использования

    Animate.cubic({
        duration: 300,
        draw: progress => {

            console.log(progress);

        }

    }, [.6,.53,0,-1.18])

    */

    static cubic(struct, coords = [0.65, 0.05, 0.36, 1]) {

        let p1 = [0,0];
        let p2 = [coords[0],coords[1]];
        let p3 = [coords[2],coords[3]];
        let p4 = [1,1];

        struct.timing = timeFraction => {

            let x = (Math.pow((1 - timeFraction), 3) * p1[0]) + (3 * Math.pow((1 - timeFraction), 2) * timeFraction * p2[0]);
            x = x + (3 * (1 - timeFraction) * Math.pow(timeFraction, 2) * p3[0]) + (Math.pow(timeFraction, 3) * p4[0]);

            let y = (Math.pow((1 - timeFraction), 3) * p1[1]) + (3 * Math.pow((1 - timeFraction), 2) * timeFraction * p2[1]);
            y = y + (3 * (1 - timeFraction) * Math.pow(timeFraction, 2) * p3[1]) + (Math.pow(timeFraction, 3) * p4[1]);

            return y;

        }

        Animate.run(struct);

    }

}

window.Animate = Animate;

export default Animate;
