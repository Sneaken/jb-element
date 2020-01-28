<template>
  <div
    :class="[
      type === 'textarea' ? 'jb-textarea' : 'jb-input',
      inputSize ? 'jb-input--' + inputSize : ''
    ]"
  >
    <template v-if="type !== 'textarea'">
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="jb-input__inner"
        v-bind="$attrs"
        :disabled="inputDisabled"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
      />
    </template>

    <!--    <textarea-->
    <!--      v-else-->
    <!--      :tabindex="tabindex"-->
    <!--      class="jb-textarea__inner"-->
    <!--      ref="textarea"-->
    <!--      v-bind="$attrs"-->
    <!--      :disabled="inputDisabled"-->
    <!--      :readonly="readonly"-->
    <!--      :autocomplete="autoComplete || autocomplete"-->
    <!--      :style="textareaStyle"-->
    <!--      @compositionstart="handleCompositionStart"-->
    <!--      @compositionupdate="handleCompositionUpdate"-->
    <!--      @compositionend="handleCompositionEnd"-->
    <!--      @input="handleInput"-->
    <!--      @focus="handleFocus"-->
    <!--      @blur="handleBlur"-->
    <!--      @change="handleChange"-->
    <!--      :aria-label="label"-->
    <!--    />-->
    <!-- aria-label 该属性用于读屏幕软件-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { merge } from '@/api/methods'

/** The resizeable of el-input component */
type Resizable = 'none' | 'both' | 'horizontal' | 'vertical'
type InputType = 'text' | 'textarea'
/** Component size definition for button, input, etc */
type ElementUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Controls how el-input component automatically sets size */
interface AutoSize {
  /** Minimum rows to show */
  minRows: number

  /** Maximum rows to show */
  maxRows: number
}

@Component({
  inheritAttrs: false
})
export default class JbInput extends Vue {
  @Inject({ default: '' }) readonly jbForm!: string
  @Inject({ default: '' }) readonly jbFormItem!: string
  @Prop({ type: [String, Number] })
  private value?: string | number

  @Prop({ type: String })
  private size?: ElementUIComponentSize

  @Prop({ type: String })
  private resize?: Resizable

  @Prop({ type: String })
  private form?: string

  /** 输入框置为禁用状态。 不能被tab选中*/
  @Prop({ type: Boolean })
  private disabled?: boolean

  /** 把输入字段设置为只读。 能被tab选中*/
  @Prop({ type: Boolean })
  private readonly?: boolean

  @Prop({ type: String, default: 'text' })
  private type?: InputType

  @Prop({ type: [Boolean, Object], default: false })
  private autosize?: boolean | AutoSize

  @Prop({ type: String, default: 'off' })
  private autocomplete?: string

  @Prop({
    type: String,
    validator(val) {
      process.env.NODE_ENV !== 'production' &&
        console.warn(
          "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
        )
      return true
    }
  })
  private autoComplete?: string

  @Prop({
    type: Boolean,
    default: true
  })
  private validateEvent?: boolean

  @Prop({ type: String })
  private suffixIcon?: string

  @Prop({ type: String })
  private prefixIcon?: string

  @Prop({ type: String })
  private label?: string

  @Prop({
    type: Boolean,
    default: false
  })
  private clearable?: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  private showPassword?: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  private showWordLimit?: boolean

  @Prop({ type: String })
  private tabindex?: string

  private textareaCalcStyle: object = {}
  private hovering: boolean = false
  private focused: boolean = false
  private isComposing: boolean = false
  private passwordVisible: boolean = false
  private get inputDisabled() {
    // return this.disabled || (this.jbForm || { disabled: false }).disabled
    return this.disabled
  }
  // private get _elFormItemSize() {
  //   return (this.elFormItem || {}).elFormItemSize
  // }
  private get inputSize() {
    // return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    return this.size
  }
  private get textareaStyle() {
    return merge({}, this.textareaCalcStyle, { resize: this.resize })
  }

  // private handleInput(event: Event) {
  //   // should not emit input during composition
  //   // see: https://github.com/ElemeFE/element/issues/10516
  //   if (this.isComposing) return
  //
  //   // hack for https://github.com/ElemeFE/element/issues/8548
  //   // should remove the following line when we don't support IE
  //   if (event.target.value === this.nativeInputValue) return
  //
  //   this.$emit('input', event.target.value)
  //
  //   // ensure native input value is controlled
  //   // see: https://github.com/ElemeFE/element/issues/12850
  //   this.$nextTick(this.setNativeInputValue)
  // }
}
</script>

<style lang="stylus" scoped>
@import "input.styl"
</style>
