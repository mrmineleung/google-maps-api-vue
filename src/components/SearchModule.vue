<template>
  <div class="flex flex-row mb-3 ">
    <InputText type="text" placeholder="Search" id="value" v-model="searchText" @keyup.enter="search"
      class="text-black-300 font-medium" />
    <Button @click="search" class="text-white-300 font-medium ml-2 p-button-rounded" icon="pi pi-search"></Button>
    <Toast />
  </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
  setup(props, { emit }) {
    const searchText = ref('');
    const toast = useToast();

    const search = async () => {
      try {

        if (searchText.value == null || searchText.value === '') {
          toast.add({ severity: "error", detail: "Search text can not be empty!" })
          return
        }

        // Construct the URL for the Google Maps Geocoding API
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&address=${encodeURIComponent(
          searchText.value
        )}`;

        const response = await axios.get(apiUrl);

        if (response.data.status === 'OK') {
          // Process and emit the search results
          const location = response.data.results.map((result : any) => ({
            id: result.formatted_address + Date.now(),
            address: result.formatted_address,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            searchTime: new Date()
          }))
          .find((element : Location) => element !== undefined);

          emit('addLocation', location)
        } else if (response.data.status === 'ZERO_RESULTS') {
          toast.add({ severity: "error", detail: "No result found! Please try again!" })
          console.error(`No result found for keyword ${searchText.value} !`);
        }
        else {
          toast.add({ severity: "error", detail: "Network issue! Please try again!" })
          console.error('Geocoding API request failed');
        }
      } catch (error) {
        toast.add({ severity: "error", detail: "Search failed! Please check your keyword!" })
        console.error('Error during geocoding request', error);
      }
    };

    return {
      searchText,
      search,
    };
  },
};
</script>
  