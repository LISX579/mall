<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style>
#tab-bar {
  display: flex;
  background: #f5f5f5;
  height: 49px;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  border-top: 1px solid rgba(100,100,100,.1);
  box-shadow: 0 -3px 1px rgba(100,100,100,0.2);
}
</style>
