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
    const line = new this.google.maps.Polyline({
      path: [this.path[0], this.path[0]],
      map: this.map,
      ...LINE_PATH_CONFIG
    });

    let previousPathLength;

    const drawLine = setInterval(() => {
      const pathLength = this.path.length;
      requestAnimationFrame(() => {
        line.setPath(this.path);
        const lastPoint = this.path[this.path.length - 1];
        this.map.setCenter(lastPoint);
      });
      if (pathLength === previousPathLength) {
        console.log("wow");
        clearInterval(drawLine);
      }
      previousPathLength = pathLength;
    }, 60);
  },

  render() {}
};
</script>
