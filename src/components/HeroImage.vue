<template>
  <section class="hero">
    <div class="hero-inner" :id="`section-${index}`">
      <figure></figure>
      <div class="hero__title">
        <h2>{{ factoid.amount }}</h2>
        <p>&nbsp;{{ factoid.unit }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    factoid: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
$ff-serif: "Roboto Slab", serif;
$ff-sans-serif: "Roboto", sans-serif;
$assets: (
  1:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530583/james-flat_k6xf5g.jpg",
  2:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530583/michael-butterfly_dd2i2n.jpg",
  3:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530583/group-tatzelwurm_kwj2dr.jpg",
  4:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530584/michael-austria_c6h5bv.jpg",
  5:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530583/james-brauhaus_joblfh.jpg",
  6:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530585/michael-rossfeldstrasse_abh9hd.jpg",
  7:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530583/james-sudelfeld_lngavh.jpg",
  8:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530584/oberjoch_nwhsul.jpg",
  9:
    "https://res.cloudinary.com/availu-stage/image/upload/c_scale,w_auto/dpr_auto/v1623530585/michael-riedberg_l2ezbu.jpg"
);

@function image($key) {
  $id: map-get($assets, $key);
  @return url($id);
}

// Hero section
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;

  @each $asset in $assets {
    $i: index($assets, $asset);
    &:nth-child(#{$i + 1}) figure {
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
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  font-family: $ff-serif;
  text-align: center;

  @media (min-width: 1200px) {
    font-size: 6rem;
  }
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
</style>
