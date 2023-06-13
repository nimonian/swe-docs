export const themeData = JSON.parse("{\"logo\":\"/mv-symbol.png\",\"logoDark\":\"/mv-symbol-dark.png\",\"docsDir\":\"/docs\",\"navbar\":[{\"text\":\"Frontend\",\"children\":[{\"text\":\"components\",\"link\":\"/frontend/components\"}]},{\"text\":\"Backend\",\"children\":[{\"text\":\"Encryption\",\"link\":\"/backend/encryption\"},{\"text\":\"Hashing\",\"link\":\"/backend/hashing\"},{\"text\":\"Basic Auth\",\"link\":\"/backend/basic-auth\"},{\"text\":\"Token Auth\",\"link\":\"/backend/jwt\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
