<template>
  <div>
    <section class="hero" v-for="(factoid, index) in factoids" :key="factoid.unit">
      <div class="hero-inner" :id="`section-${index}`">
        <figure></figure>
        <div class="hero__title">
          <h2>{{ factoid.amount }}</h2>
          <p>{{ factoid.unit }}</p>
        </div>
      </div>
    </section>
    <section class="content">
      <article class="content__inner">
        <h1 class="content__title">Some Happy Little Text</h1>
        <p>
          A thin paint will stick to a thick paint. The shadows are just like
          the highlights, but we're going in the opposite direction. When you do
          it your way you can go anywhere you choose.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      stages: [
        {
          distance: 103.19,
          heightGain: 1621,
          time: 515
        },
        {
          distance: 154.52,
          heightGain: 1748,
          time: 447
        },
        {
          distance: 150.58,
          heightGain: 2182,
          time: 479
        },
        {
          distance: 141.25,
          heightGain: 2315,
          time: 448
        },
        {
          distance: 103.85,
          heightGain: 567,
          time: 276
        }
      ]
    };
  },
  computed: {
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
          unit: `hours spent in the saddle`
        },
        {
          amount: this.totalElevationGain,
          unit: `metres of elevation gain`
        },
        {
          amount: 1.5,
          unit: `countries visited (what even is Austria?)`
        },
        {
          amount: 7,
          unit: `Bräustüberls visited`
        },
        {
          amount: "",
          unit: "Germany's highest road"
        },
        {
          amount: "",
          unit: "This fucking road"
        },
        {
          amount: "",
          unit: "Germany's highest pass"
        }
      ];
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");

$ff-serif: "Roboto", sans-serif;
$ff-sans-serif: "Roboto", sans-serif;
$color-accent: #a9dfbf;

$assets: (
  1: "./assets/images/james-flat.jpg",
  2: "./assets/images/michael-butterfly.jpg",
  3: "./assets/images/group-tatzelwurm.jpg",
  4: "./assets/images/michael-austria.jpg",
  5: "./assets/images/james-brauhaus.jpg",
  6: "./assets/images/michael-rossfeldstrasse.jpg",
  7: "./assets/images/james-sudelfeld.jpg",
  8: "./assets/images/michael-riedberg.jpg"
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
}

p {
  font-family: $ff-sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
}

figure {
  margin: 0;
}

// Fixed background image element
figure {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  color: white;
  font-family: $ff-serif;
  font-size: 8vw;
  letter-spacing: -0.125rem;
  text-align: center;

  @media (min-width: 1200px) {
    font-size: 6rem;
  }
}

// Content section
.content {
  position: relative;
  margin: 0 auto 8rem;
  padding: 2rem;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: white;
    z-index: 99;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
}

.content__inner {
  margin: 0 auto;
  max-width: 700px;

  > * + * {
    margin-top: 1.5rem;
  }
}

.content__title {
  font-family: $ff-serif;
  font-size: 3rem;
  line-height: 1.25;
  letter-spacing: -0.125rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 4rem;
  }
}
</style>
