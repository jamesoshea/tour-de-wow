import stageOnePoints from "../data/stageOnePoints.json";
import stageTwoPoints from "../data/stageTwoPoints.json";
import stageThreePoints from "../data/stageThreePoints.json";
import stageFourPoints from "../data/stageFourPoints.json";
import stageFivePoints from "../data/stageFivePoints.json";

let counter = 0;

const validatePoint = point => {
  counter++;
  if (counter % 10 !== 0) {
    return false;
  }
  if (!point) {
    return false;
  }
  if (typeof point?.lat !== "number") {
    return false;
  }
  if (typeof point?.lng !== "number") {
    return false;
  }
  return true;
};

export default function windowScrollPosition() {
  return {
    data() {
      return {
        scrolledToBottom: false
      };
    },
    mounted() {
      const points = [
        ...stageOnePoints,
        ...stageTwoPoints,
        ...stageThreePoints,
        ...stageFourPoints,
        ...stageFivePoints
      ].filter(validatePoint);
      const point = points.shift();
      this.points.push(point);

      this._scrollListener = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          // you're at the bottom of the page
          if (this.scrolledToBottom) {
            // deal with case where this has already happened
            return;
          }
          this.scrolledToBottom = true;
          const interval = setInterval(() => {
            const point = points.splice(0, 5);
            if (!point) {
              clearInterval(interval);
              return;
            }
            this.points.push(...point);
          }, 1);
          window.removeEventListener("scroll", this._scrollListener);
        }
      };

      // When scrolling, update the position
      window.addEventListener("scroll", this._scrollListener);
    },
    beforeDestroy() {
      // Detach the listener when the component is gone
      window.removeEventListener("scroll", this._scrollListener);
    }
  };
}
