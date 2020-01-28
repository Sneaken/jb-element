<template>
  <transition name="el-fade-in">
    <div
      class="jb-backtop"
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        right: styleRight,
        bottom: styleBottom
      }"
    >
      <slot>
        <el-icon name="caret-top" />
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { throttle } from 'throttle-debounce'
@Component
export default class JbBacktop extends Vue {
  @Prop({ type: Number, default: 200 }) private visibilityHeight!: number
  @Prop({ type: String }) private target!: string
  @Prop({ type: Number, default: 40 }) private right: number = 40
  @Prop({ type: Number, default: 40 }) private bottom: number = 40

  private el: HTMLElement | null = null
  private container: Document | HTMLElement | null = null
  private visible: boolean = false
  private throttledScrollHandler: any

  private get styleBottom(): string {
    return `${this.bottom}px`
  }
  private get styleRight(): string {
    return `${this.right}px`
  }

  mounted() {
    this.init()
    this.throttledScrollHandler = throttle(300, this.onScroll)
    this.container!.addEventListener('scroll', this.throttledScrollHandler)
  }

  init() {
    this.container = document
    this.el = document.documentElement
    if (this.target) {
      this.el = document.querySelector(this.target)
      if (!this.el) {
        throw new Error(`target is not existed: ${this.target}`)
      }
      this.container = this.el
    }
  }
  onScroll() {
    const scrollTop = this.el!.scrollTop
    this.visible = scrollTop >= this.visibilityHeight
  }
  handleClick(e: MouseEvent) {
    this.scrollToTop()
    this.$emit('click', e)
  }
  scrollToTop() {
    const el = this.el
    let step = 0
    const interval = setInterval(() => {
      if (el!.scrollTop <= 0) {
        clearInterval(interval)
        return
      }
      step += 10
      el!.scrollTop -= step
    }, 20)
  }

  beforeDestroy() {
    this.container!.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>

<style lang="stylus" scoped>
@import "backtop.styl"
</style>
