<template>
  <div>
    <section
      class="hero"
      v-for="(factoid, index) in factoids"
      :key="factoid.unit"
    >
      <div class="hero-inner" :id="`section-${index}`">
        <figure></figure>
        <div class="hero__title">
          <h2>{{ factoid.amount }}</h2>
          <p>&nbsp;{{ factoid.unit }}</p>
        </div>
      </div>
    </section>
    <section style="min-height:100vh;">
      <TravelMap class="travel-map" :points="points" />
      <Stage
        v-for="(stage, index) in displayedStages"
        :currentStage="currentStage"
        :index="index"
        :key="stage.startTown"
        :stage="stage"
      />
    </section>
  </div>
</template>

<script>
import windowScrollPosition from "./mixins/windowScrollPosition";
import Stage from "./components/Stage";
import TravelMap from "./components/TravelMap";

export default {
  name: "App",
  components: {
    Stage,
    TravelMap
  },
  mixins: [windowScrollPosition()],
  data() {
    return {
      points: [],
      stages: [
        {
          endTown: "Chiemsee",
          startTown: "Munich",
          distance: 103.19,
          heightGain: 1621,
          time: 515
        },
        {
          endTown: "Schönram",
          startTown: "Chiemsee",
          distance: 154.52,
          heightGain: 1748,
          time: 447
        },
        {
          endTown: "Tegernsee",
          startTown: "Schönram",
          distance: 150.58,
          heightGain: 2182,
          time: 479
        },
        {
          endTown: "Bad Hindelang",
          startTown: "Tegernsee",
          distance: 141.25,
          heightGain: 2315,
          time: 448
        },
        {
          endTown: "Lindau",
          startTown: "Bad Hindelang",
          distance: 103.85,
          heightGain: 567,
          time: 276
        }
      ]
    };
  },
  computed: {
    currentStage() {
      if (this.points.length < 1090) {
        return 1;
      }
      if (this.points.length < 2890) {
        return 2;
      }
      if (this.points.length < 4840) {
        return 3;
      }
      if (this.points.length < 6620) {
        return 4;
      }
      return 5;
    },
    displayedStages() {
      return this.stages.filter((_, index) => this.currentStage > index);
    },
    getPosition() {
      return this.position;
    },
    totalDistance() {
      return this.stages.reduce((acc, cur) => acc + cur.distance, 0).toFixed(2);
    },
    totalElevationGain() {
      return this.stages.reduce((acc, cur) => acc + cur.heightGain, 0);
    },
    totalTime() {
      return (this.stages.reduce((acc, cur) => acc + cur.time, 0) / 60).toFixed(
        2
      );
    },
    factoids() {
      return [
        {
          amount: this.totalDistance,
          unit: `kilometres travelled`
        },
        {
          amount: this.totalTime,
          unit: `hours in the saddle`
        },
        {
          amount: this.totalElevationGain,
          unit: `metres of elevation gain`
        },
        {
          amount: 1,
          unit: `Austrias accidentally visited`
        },
        {
          amount: 7,
          unit: `Bräustüberls visited`
        },
        {
          amount: "Roßfeldstraße",
          unit: "Germany's highest road"
        },
        {
          amount: "The Tatzelwurm",
          unit: "Max gradient: 18%"
        },
        {
          amount: "Oberjochpass",
          unit: "Camping at 1178m"
        },
        {
          amount: "Riedbergpass",
          unit: "Germany's highest pass"
        }
      ];
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700");

$ff-serif: "Roboto Slab", serif;
$ff-sans-serif: "Roboto", sans-serif;

$assets: (
  1: "./assets/images/james-flat.jpg",
  2: "./assets/images/michael-butterfly.jpg",
  3: "./assets/images/group-tatzelwurm.jpg",
  4: "./assets/images/michael-austria.jpg",
  5: "./assets/images/james-brauhaus.jpg",
  6: "./assets/images/michael-rossfeldstrasse.jpg",
  7: "./assets/images/james-sudelfeld.jpg",
  8: "./assets/images/oberjoch.jpg",
  9: "./assets/images/michael-riedberg.jpg"
);

@function image($key) {
  $id: map-get($assets, $key);
  @return url($id);
}

// Global styles
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overscroll-behavior-y: none;
}

p {
  font-family: $ff-sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
}

// Fixed background image element
figure {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}

// Hero section
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;

  @each $asset in $assets {
    $i: index($assets, $asset);
    &:nth-child(#{$i}) figure {
      background: image($i) no-repeat center center fixed;
      background-size: cover;
      object-fit: cover;
    }
  }
}

.hero-inner {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  clip: rect(0, auto, auto, 0);

  @supports (-webkit-overflow-scrolling: touch) {
    clip: unset;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}

.hero__title {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  font-family: $ff-serif;
  font-size: 8vw;
  text-align: center;

  @media (min-width: 1200px) {
    font-size: 6rem;
  }
}
</style>
