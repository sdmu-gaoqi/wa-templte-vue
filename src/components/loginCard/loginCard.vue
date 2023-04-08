<template>
  <div class="loginCard">
    <slot></slot>
    <div class="logo">WA</div>
  </div>
</template>

<style lang="scss" scoped>
.loginCard {
  width: 790px;
  min-height: 500px;
  border-radius: 8px 8px 120px;
  overflow: hidden;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  user-select: none;
  box-shadow: rgba(19, 9, 40, 0.16) 0px 36px 36px -12px,
    rgba(19, 9, 40, 0.08) 0px 1px 2px 0px;
  .logo {
    font-size: 100px;
    font-weight: bold;
    text-align: center;
    padding-top: 50px;
    flex: 1;
    color: #fff;
    background: linear-gradient(
        295deg,
        rgb(255, 190, 158) 0%,
        rgb(255, 218, 198) 100%
      )
      0% 0% / 100%;
  }
}
</style>
