import stageOnePoints from "../data/stageOnePoints.json";
import stageTwoPoints from "../data/stageTwoPoints.json";
import stageThreePoints from "../data/stageThreePoints.json";
import stageFourPoints from "../data/stageFourPoints.json";
import stageFivePoints from "../data/stageFivePoints.json";

export default function windowScrollPosition() {
  return {
    data() {
      return {
        // Initialize scroll position at [0, 0]
        scrolledToBottom: false
      };
    },
    created() {
      const points = [
        ...stageOnePoints,
        ...stageTwoPoints,
        ...stageThreePoints,
        ...stageFourPoints,
        stageFivePoints
      ];
      const point = points.shift();
      this.points.push(point);
      // Only execute this code on the client side, server sticks to [0, 0]
      if (!this.$isServer) {
        this._scrollListener = () => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
          ) {
            // you're at the bottom of the page
            // deal with case where this already happened
            if (this.scrolledToBottom) {
              return;
            }
            this.scrolledToBottom = true;
            const interval = setInterval(() => {
              const point = points.splice(0, 50);
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
      }
    },
    beforeDestroy() {
      // Detach the listener when the component is gone
      window.removeEventListener("scroll", this._scrollListener);
    }
  };
}
