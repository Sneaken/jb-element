<template>
  <div class="jb-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class JbButtonGroup extends Vue {}
</script>

<style lang="stylus" scoped>
@import "button.styl"
</style>
