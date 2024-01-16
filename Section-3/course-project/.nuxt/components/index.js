export { default as NavigationTheHeader } from '../../components/Navigation/TheHeader.vue'
export { default as NavigationTheSideNavToggle } from '../../components/Navigation/TheSideNavToggle.vue'
export { default as NavigationTheSidenav } from '../../components/Navigation/TheSidenav.vue'
export { default as UIAppButton } from '../../components/UI/AppButton.vue'
export { default as UIAppControlInput } from '../../components/UI/AppControlInput.vue'
export { default as PostsPostList } from '../../components/Posts/PostList.vue'
export { default as PostsPostPreview } from '../../components/Posts/PostPreview.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
