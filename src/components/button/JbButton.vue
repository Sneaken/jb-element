<template>
  <button
    class="jb-button"
    @click="click"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'jb-button--' + type : '',
      buttonSize ? 'jb-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading" />
    <i :class="icon" v-if="icon && !loading" />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Inject, Prop, Vue } from 'vue-property-decorator'
/** Button type */
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
/** Same as native button's type */
type ButtonNativeType = 'button' | 'submit' | 'reset' | 'menu'
/** Button size type*/
type ButtonSizeType = 'medium' | ' small ' | ' mini'
@Component
export default class JbButton extends Vue {
  @Inject({ default: '' }) readonly jbForm!: {}
  @Inject({ default: '' }) readonly jbFormItem!: {}

  @Prop({ type: String, default: 'default' }) type?: ButtonType
  @Prop({ type: String }) size?: ButtonSizeType
  @Prop({ type: String }) icon?: string
  @Prop({ type: Boolean, default: false }) plain?: boolean
  @Prop({ type: Boolean, default: false }) round?: boolean
  @Prop({ type: Boolean, default: false }) circle?: boolean
  @Prop({ type: Boolean, default: false }) loading?: boolean
  @Prop({ type: Boolean, default: false }) disabled?: boolean
  @Prop({ type: Boolean, default: false }) autofocus?: boolean
  @Prop({ type: Boolean, default: false }) nativeType?: ButtonNativeType

  private get _elFormItemSize() {
    // @ts-ignore
    return (this.jbFormItem || { elFormItemSize: '' }).elFormItemSize
  }
  private get buttonSize() {
    // @ts-ignore
    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
  }
  private get buttonDisabled() {
    // @ts-ignore
    return this.disabled || (this.jbForm || {}).disabled
  }

  @Emit()
  click(event: Event) {}
}
</script>

<style lang="stylus" scoped>
@import "button.styl"
</style>
