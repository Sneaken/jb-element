<template>
  <!-- a标签无 disable 属性-->
  <!--  纵使样式被设置成  cursor not-allowed href链接还是能生效跳转-->
  <a
    :class="[
      'jb-link',
      type ? `jb-link--${type}` : '',
      {
        'is-disabled': disabled,
        'is-underline': underline && !disabled
      }
    ]"
    v-bind="$attrs"
    :href="disabled ? null : href"
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>
    <template v-if="$slots.icon"
      ><slot v-if="$slots.icon" name="icon"></slot
    ></template>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
@Component
export default class JbLink extends Vue {
  @Prop({ type: String, default: 'default' }) type?: LinkType
  @Prop({ type: String }) href?: string
  @Prop({ type: String }) icon?: string
  @Prop({ type: Boolean, default: true }) underline?: boolean
  @Prop({ type: Boolean, default: false }) disabled?: boolean

  handleClick(evt: Event) {
    !this.disabled && !this.href && this.$emit('click', evt)
  }
}
</script>

<style lang="stylus" scoped>
@import "link.styl"
</style>
