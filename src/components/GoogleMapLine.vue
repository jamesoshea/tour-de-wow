<script>
import { LINE_PATH_CONFIG } from "../constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    }
  },

  mounted() {
    console.log(this.path)
    const { Polyline } = this.google.maps;
    new Polyline({
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG
    });
  },

  render() {},
};
</script>
