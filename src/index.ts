import {render} from './render'
import {createElement} from './createElement'
import {mount} from './mount'

const vApp = createElement('div', {
  attrs: {
    id: 'app',
    name: 'hello',
  },
  innerHTML: 'hi there 11',
  children: [
    createElement('img', {attrs: {src: 'https://media.giphy.com/media/HhPade8aPmh0u5VKbJ/giphy.gif'}}),
    'just string',
    createElement('div', {attrs: {name: 'another div'}, innerHTML: 'another div'})
  ]
})

const $app = render(vApp)
mount($app, document.getElementById('app'))
console.log($app)
