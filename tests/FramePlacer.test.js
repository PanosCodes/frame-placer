import globalJsdom from 'jsdom-global';
import { FramePlacer } from "../index.js";
import { expect } from 'chai';

describe('#replace()', () => {
    let frameId = 'frame1';

    let dom = `
             <html>
                <body>
                    <turbo-frame id=${frameId}>
                        <h3>Original frame</h3>
                    </turbo-frame>
                    <turbo-frame id="some-frame">
                        <h3>Some other frame</h3>
                    </turbo-frame>
                </body>
            </html>
        `;

    beforeEach(() => globalJsdom(dom));

    context('when turbo-frame exists in DOM', () => {
        let incomingFrame = `<turbo-frame id='${frameId}'>Incoming frame</turbo-frame>`;

        it('replaces turbo-frame with new content', () => {
            FramePlacer.replace(incomingFrame);

            expect(global.document.body.textContent).to.contain('Incoming frame')
            expect(global.document.body.textContent).to.not.contain('Original frame')
        })
    })

    context('when turbo-frame does not exist in DOM', () => {
        let incomingFrame = `<turbo-frame id="not-in-current-dom">Incoming frame</turbo-frame>`;

        it('does not replace turbo-frame', () => {
            FramePlacer.replace(incomingFrame);

            expect(document.body.textContent).to.not.contain('Incoming frame')
            expect(document.body.textContent).to.contain('Original frame')
        })
    })

    context('when multiple turbo-frame exist in template', () => {
        let incomingFrame = `
            <turbo-frame id="not-in-current-dom">Incoming frame NOT in DOM</turbo-frame>
            <turbo-frame id="${frameId}">Incoming frame in DOM</turbo-frame>
        `;

        it('replaces only the existing frame', () => {
            FramePlacer.replace(incomingFrame);

            expect(document.body.textContent).to.not.contain('Incoming frame NOT in DOM')
            expect(document.body.textContent).to.contain('Incoming frame in DOM')
            expect(document.body.textContent).to.contain('Some other frame')
        })
    })
})
