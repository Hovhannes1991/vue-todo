<template>
    <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
    <defs>
      <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
        <stop offset="0%" :stop-color="stop_color1" />
        <stop offset="100%" :stop-color="stop_color2" />
      </linearGradient>
      <linearGradient id="lineGradient">
        <stop offset="0%" :stop-color="stop_color1" />
        <stop offset="100%" :stop-color="stop_color2" />
      </linearGradient>
      <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"></path>
      <path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>
      <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>
      <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
    </defs>
  </svg>
</template>

<script>
export default {
    name: 'SvgForStyle',
    data(){
      return {
        stop_color1: '#104758',
        stop_color2: '#0fc0f5'
      }
    }
}
</script>