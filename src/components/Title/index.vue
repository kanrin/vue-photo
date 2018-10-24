<template>
    <div class="title">
    </div>
</template>


<style>
    .title {
        width: 40px;
        height: 40px;
        border-width: 20px;
        border-style: solid;
        border-color: red green green red;
        animation: masked-animation 4s infinite linear;
    }
    @keyframes title-animation {
        0% {
            background-position: 0 0;   /*background-position 属性设置背景图像的起始位置。*/
        }
        100% {
            background-position: -100% 0;
        }
    }
</style>

<script>

  export default {
    name: 'Title'
  }
</script>