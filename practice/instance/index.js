import Vue from 'vue'
const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  watch: {
    text: function (newText, oldText) {
      console.log(`${newText} : ${oldText}`)
    }
  }
})
app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)

// console.log(app.$refs)
// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
