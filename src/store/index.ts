import { createStore } from 'vuex'

export default createStore({
  state: {
    designCardsList: [
      {
        designId: 1,
        designViews: 105,
        designName: 'Ostrov',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock1.png'
        ]
      },
      {
        designId: 2,
        designViews: 104,
        designName: 'Flora',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock2-1.png',
          'http://localhost:8080/images/mock2-2.png'
        ]
      },
      {
        designId: 3,
        designViews: 103,
        designName: 'SunWear',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock3.png'
        ]
      },
      {
        designId: 4,
        designViews: 105,
        designName: 'Flora',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock2-1.png',
          'http://localhost:8080/images/mock2-2.png'
        ]
      },
      {
        designId: 5,
        designViews: 103,
        designName: 'SunWear',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock3.png'
        ]
      },
      {
        designId: 6,
        designViews: 104,
        designName: 'Flora',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock2-1.png',
          'http://localhost:8080/images/mock2-2.png'
        ]
      },
      {
        designId: 7,
        designViews: 110,
        designName: 'Ostrov',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock1.png'
        ]
      },
      {
        designId: 8,
        designViews: 101,
        designName: 'SunWear',
        designPublished: true,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock3.png'
        ]
      },
      {
        designId: 9,
        designViews: 101,
        designName: 'SunWear',
        designPublished: false,
        designPreviewImagesList: [
          'http://localhost:8080/images/mock3.png'
        ]
      }
    ]
  },
  getters: {
  },
  mutations: {
    updateDesign (state, data) {
      if (data.designIndex === undefined) {
        state.designCardsList.push(data)
      } else {
        state.designCardsList[data.designIndex].designViews = data.designViews
        state.designCardsList[data.designIndex].designName = data.designName
        state.designCardsList[data.designIndex].designPublished = data.designPublished
      }
    },
    removeDesign (state, index) {
      state.designCardsList.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
