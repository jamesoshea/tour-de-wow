import points from "../data/stageOnePoints.json";

export default function windowScrollPosition() {
  return {
    data() {
      return {
        // Initialize scroll position at [0, 0]
        scrolledToBottom: false
      };
    },
    created() {
      const point = points.shift();
      this.points.push(point);
      // Only execute this code on the client side, server sticks to [0, 0]
      if (!this.$isServer) {
        this._scrollListener = () => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
          ) {
            if (!this.scrolledToBottom) {
              const interval = setInterval(() => {
                const point = points.shift();
                if (!point) {
                  clearInterval(interval);
                  return;
                }
                this.points.push(point);
              }, 1);
            }
            // you're at the bottom of the page
            this.scrolledToBottom = true;
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
