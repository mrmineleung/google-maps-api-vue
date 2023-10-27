<template>
  <div class="mb-3"></div>
  <div>
    <Button @click="deleteSelected" class="text-white-300 font-medium mb-3 p-button-rounded" icon="pi pi-trash"></Button>
  </div>
  <DataTable v-model:selection="selectedLocations" :value="locationList" paginator :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]" scrollable scrollHeight="400px" tableStyle="min-width: 10rem">
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field="address" header="Address" style="width: 75%"></Column>
  </DataTable>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';

export default {
  emits: ['deleteSelected'],
  props: ['locations'],
  setup(props, { emit }) {
    const selectedLocations = ref<Location[]>([]);
    const locationList = ref<Location[]>([])
    watch(() => props.locations, (locations) => {
      locationList.value = []
      locations.forEach((element : Location) => {
        locationList.value.push(element)
      });
    }, { immediate: true, deep: true });


    const deleteSelected = () => {
      emit('deleteSelected', selectedLocations.value);
      selectedLocations.value = [];
    };

    return {
      selectedLocations,
      deleteSelected,
      locationList
    };
  },
};
</script>
  