<template>
  <div>
    <p>Latest Search Time: {{ latestSearchTime }}</p>
  </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';

export default {
  props: ['latestLocation'],
  setup(props) {
    const latestSearchTime = ref('')

    watch(() => props.latestLocation, (newLocation) => {
      if (newLocation) {
        latestSearchTime.value = newLocation.searchTime
      } else {
        latestSearchTime.value = '';
      }
    }, { immediate: true });

    return {
      latestSearchTime
    };
  },
};
</script>
  