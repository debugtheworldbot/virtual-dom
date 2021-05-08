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
  children: [
    createElement('div', {children: [`count:${count}`]}),
    createElement('input', {}),
    createElement('div', {children: generateImg(count)}),
    'end'
  ]
})

const generateImg = (count: number) => {
  return Array.from({length: count}, () =>
    createElement('img', {attrs: {src: 'https://media.giphy.com/media/HhPade8aPmh0u5VKbJ/giphy.gif'}}),
  )
}
let vApp = createVApp(1)
const $app = render(vApp)
const $rootEle = mount($app, document.getElementById('app'))

setInterval(() => {
  const n = Math.floor(Math.random() * 10) + 1
  const vNewApp = createVApp(n)
  const patch = diff(vApp, vNewApp)
  patch($rootEle)
  vApp = vNewApp
}, 1000)

// console.log($app)
