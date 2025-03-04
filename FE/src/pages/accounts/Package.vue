<template>
    <div class="ac-pg">
        <div class="row">
            <div class="v-col col-12 col-md-3 col-sm-6 pg-item">
                123
            </div>
            <div class="v-col col-12 col-md-3 col-sm-6" 
            :style="{
                backgroundImage:`url(${bgLogin})`,
                backgroundSize: 'cover'
            }">
                123
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import bgLogin from '@/assets/img/bgLogin.jpg'

</script>

<style scoped lang="scss">
.ac-pg{
    padding: 16px;
    .pg-item{
        padding: 16px;
        border-radius: 8px;
        background-color: azure;
    }
}
</style>