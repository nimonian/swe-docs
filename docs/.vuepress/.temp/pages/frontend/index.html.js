export const data = JSON.parse("{\"key\":\"v-06198984\",\"path\":\"/frontend/\",\"title\":\"Module 1\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1686673560000,\"contributors\":[{\"name\":\"nimonian\",\"email\":\"nimon@hotmail.co.uk\",\"commits\":1}]},\"filePathRelative\":\"frontend/README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
