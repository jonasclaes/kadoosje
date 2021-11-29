<template>
    <div
        class="transition transform duration-300 hover:scale-105"
        :class="cssClasses">
        <router-link
            :to="{
                name: 'WishlistItem',
                params: { uuid: uuid, itemUuid: item.uuid },
            }">
            <div
                class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full break-all">
                <h2 class="text-lg">{{ item.name }}</h2>
                <img
                    :src="imageLocation"
                    alt="Picture"
                    class="max-h-60 object-contain object-center w-full"/>
                <small class="truncate block">{{ item.description }}</small>
            </div>
        </router-link>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'WishlistListItem',
    props: ['uuid', 'item', 'isLoggedIn'],
    computed: {
        imageLocation: function () {
            return `/assets/img/${this.item.picture}`;
        },
        cssClasses: function () {
            const classes = [];

            if (this.item.purchased && !this.isLoggedIn) classes.push('opacity-50');

            return classes.join(' ');
        },
    },
});
</script>

<style scoped></style>