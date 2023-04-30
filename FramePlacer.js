export class FramePlacer {
    constructor(html) {
        this.html = html;
    }

    static replace(html) {
        new FramePlacer(html).replace();
    }

    replace() {
        let frames = this.#extractFrames(this.html);
        this.#replaceWithFrames(frames);
    }

    #extractFrames(html) {
        let frames = [];
        let template = this.#createTemplate(html)
        let frameElements = template.content.querySelectorAll('turbo-frame');

        frameElements.forEach(frameElement => {
            let frame = {
                id: frameElement.id,
                frame: frameElement
            };

            frames.push(frame);
        });

        return frames;
    }

    #replaceWithFrames(frames) {
        frames.forEach(frame => {
            this.#replaceElementById(frame.id, frame.frame);
        });
    }

    #replaceElementById(id, newElement) {
        let currentElement = document.getElementById(id);

        if (currentElement) {
            document.getElementById(id).replaceWith(newElement)
        }
    }

    #createTemplate(html) {
        let template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;

        return template
    }
}
