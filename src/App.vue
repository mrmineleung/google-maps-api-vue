<template>
  <div class="card">
    <div class="flex flex-column md:flex-row card-container">
      <div class="align-items-center justify-content-center font-bold text-white border-round m-4">
        <Button @click="getUserLocation" label="Locate Me" icon="pi pi-map-marker"
          class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap mb-3"></Button>
        <SearchModule @addLocation="addLocation" />
        <AddressList v-if="latestLocation" :locations="locations" @deleteSelected="deleteSelected" />
        <TimeDisplay v-if="latestLocation" :latestLocation="latestLocation" />
      </div>
      <div class="flex align-items-center justify-content-center font-bold text-white border-round">
        <MapView :locations="locations" :latestLocation="latestLocation" />
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import SearchModule from './components/SearchModule.vue';
import MapView from './components/MapView.vue';
import AddressList from './components/AddressList.vue';
import TimeDisplay from './components/TimeDisplay.vue';

export default {
  components: {
    SearchModule,
    MapView,
    AddressList,
    TimeDisplay,
  },
  setup() {
    const locations = ref<Location[]>([]);
    const latestLocation = ref<Location | null>(null);

    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&latlng=${latitude},${longitude}`;

          try {
            const response = await axios.get(apiUrl);

            if (response.data.status === 'OK') {
              const result = response.data.results[0];
              const address = result.formatted_address;

              const userLocation: any = {
                id: address + Date.now(),
                lat: latitude,
                lng: longitude,
                address: address,
                searchTime: new Date()
              };

              addLocation(userLocation)
            } else {
              console.error('Geocoding API request failed');
            }
          } catch (error) {
            console.error('Error during geocoding request', error);
          }
        });
      } else {
        alert('Geolocation is not available in your browser.');
      }
    };


    const addLocation = (location: Location) => {
      locations.value.push(location);
      latestLocation.value = location;
    };

    const deleteSelected = (selectedLocations: Location[]) => {
      locations.value = locations.value.filter(
        (location) => !selectedLocations.includes(location)
      );
    };


    return {
      locations,
      latestLocation,
      getUserLocation,
      deleteSelected,
      addLocation
    };
  },
};
</script>
  
<style></style>
  