<template>
	<view
		class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"
		><text class="fc-b-9 fs-24">{{ title }}</text>
		</u-button>
    <my-button :falseText="'Change Batch'" :initActive="false" class="w-200" mana @onTap="tap">
    </my-button>
	</view>
</template>

<script>
import MyButton from '../../../../components/MyButton/MyButton.vue'
	export default {
  components: { MyButton },
		name: 'FindTitle',
		props: ['title'],
		data() {
			return {}
		},
    methods: {
      tap: function(){
        this.$emit('onTap')
      }
    },
	}
</script>

<style lang="scss"></style>
