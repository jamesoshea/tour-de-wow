<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyDsVv1zFyTIKEbfgyZW9ew5fUI4xNmAdXw"
  >
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path="line.path"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";

import { mapSettings } from "../constants/mapSettings";

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine
  },
  props: {
    points: Array
  },
  data() {
    return {
      markers: [],
      lines: [
        {
          id: "1",
          path: this.points
        }
      ]
    };
  },

  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },

    mapCenter() {
      return {
        lat: 47.843956,
        lng: 11.197257
      };
    }
  }
};
</script>
