<template>
  <div>
    <!-- rendering the map on the page -->
    <GMapMap :center="coords" :zoom="10" map-type-id="terrain" style="width: 70vw; height: 50rem">
      <!-- Marker to display the searched location -->
      <GMapMarker :key="index" v-for="(m, index) in markerDetails" :position="m.position" :clickable="true"
        :draggable="false">
      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

export default {
  props: ['locations', 'latestLocation'],
  setup(props) {
    const coords = ref<{lat: number, lng: number}>({ lat: 51.5072, lng: 0.1276 })
    const markerDetails = ref<{ position: { lat: number, lng: number}}[]>([])

    watch(() => props.latestLocation, (newLocation) => {
      if (newLocation) {
        coords.value = { lat: newLocation.lat, lng: newLocation.lng }
      } else {
        coords.value = { lat: 51.5072, lng: 0.1276 }
      }
    }, { immediate: true });

    watch(() => props.locations, (locations) => {
      markerDetails.value = []
      locations.forEach((location : { lat : number, lng : number}) => {
        markerDetails.value.push({ position: { lat: location.lat, lng: location.lng } })
      });
    }, { immediate: true, deep: true });

    return {
      coords,
      markerDetails
    }
  }
}
</script>
<style scoped>
.search-box {
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.location-details {
  color: black;
  font-size: 12px;
  font-weight: 500;
}
</style>
