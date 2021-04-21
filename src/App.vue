<template>
  <div>
    <Cover />
    <HeroImage
      v-for="(factoid, index) in factoids"
      :key="factoid.unit"
      :factoid="factoid"
      :index="index"
    />
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

import Cover from "./components/Cover";
import HeroImage from "./components/HeroImage";
import Stage from "./components/Stage";
import TravelMap from "./components/TravelMap";

export default {
  name: "App",
  components: {
    Cover,
    HeroImage,
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
      return this.stages.reduce((acc, cur) => acc + cur.distance, 0).toFixed(0);
    },
    totalElevationGain() {
      return this.stages.reduce((acc, cur) => acc + cur.heightGain, 0);
    },
    totalTime() {
      return (this.stages.reduce((acc, cur) => acc + cur.time, 0) / 60).toFixed(
        0
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
  },
  provide() {
    return {
      scrolledToBottom: this.scrolledToBottom
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700");

$ff-serif: "Roboto Slab", serif;
$ff-sans-serif: "Roboto", sans-serif;

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
  font-size: 4vw;
  line-height: 1.5;
  opacity: 0.8;
}

h2 {
  font-size: 8vw;
  font-family: $ff-serif;
}
h3 {
  font-family: $ff-serif;
  margin: 0;
}
</style>
