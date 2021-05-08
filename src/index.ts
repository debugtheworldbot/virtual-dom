import {render} from './render'
import {createElement} from './createElement'
import {mount} from './mount'
import {diff} from './diff'

const createVApp = count => createElement('div', {
  attrs: {
    id: 'app',
    name: 'father',
    dataCount: count
  },
  innerHTML: 'hi there',
  children: [
    createElement('img', {attrs: {src: 'https://media.giphy.com/media/HhPade8aPmh0u5VKbJ/giphy.gif'}}),
    createElement('input',{}),
    createElement('div', {attrs: {name: 'another div'}, innerHTML: 'another div'})
  ]
})
let count = 0
let vApp = createVApp(count)
const $app = render(vApp)
let $rootEle = mount($app, document.getElementById('app'))

setInterval(() => {
  count++
  const vNewApp = createVApp(count)
  const patch = diff(vApp,vNewApp)

  $rootEle = patch($rootEle)

  vApp = vNewApp
}, 1000)

// console.log($app)
