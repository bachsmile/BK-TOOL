<template>
  <div class="cm-ac-container">
    <slot name="action" class="action">

    </slot>
    <h3>
      Danh sách
    </h3>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.cm-ac-container {
  position: relative;
  background-color: #ffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.2);

  .action {
    padding: 8px 12px;
    background-color: #ffe4c4;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid #e77604;
    border-right: unset;
    position: absolute;
    top: 4px;
    right: 0px;
    z-index: 999;
  }

  .content {
    /* margin-top: 50px; */
  }
}
</style>