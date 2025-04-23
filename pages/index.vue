<script lang="ts" setup>
const { data: index } = await useAsyncData('page', () => queryCollection('pages').where('title', '=', 'index').first())
const { data: bio } = await useAsyncData('bio', () => queryCollection('pages').where('title', '=', 'bio').first())
const { data: events } = await useAsyncData('events', () => queryCollection('events').order('date', 'DESC').all())
console.log('EVENTS', events.value, index.value, bio.value)
const { MIXCLOUD_MIX } = useRuntimeConfig().public

declare global {
  interface Window {
    Mixcloud: any
  }
}
let widget: any
const albumCoverUrl = ref('/favicon.svg')
const albumCover = ref()
const isPlaying = ref(false)
useScript({
  src: '//widget.mixcloud.com/media/js/widgetApi.js',
  defer: false,
})
onMounted(async () => {
  const data: any = await $fetch(MIXCLOUD_MIX)

  const json = JSON.parse(data)
  albumCoverUrl.value = json?.pictures?.extra_large
  if (widget) {
    console.log('MIXCLOUD MIX ', JSON.parse(data.value as any))
    widget.play()
  }
  // widget.ready.then(() => {
  //
  //   widget.events.ended.once(() => {
  //     widget.pause()
  //     widget.seek(0)
  //   })
  //   widget.play()
  // })
})

async function initializePlayer() {
  widget = window.Mixcloud.PlayerWidget(document.getElementById('myplayer'))
  console.log('%cPlayer initialized!', 'background:indigo;font-size:3rem', widget)
  const ready = await widget.ready.then()
  if (!ready)
    return

  console.log('READY', ready)

  widget.events.play.on(async () => {
    console.log('[PLAY]', isPlaying.value)

    isPlaying.value = true
  })
  widget.events.pause.on(() => {
    console.log('[STOP]')
    isPlaying.value = false
  })

  // widget.ready.then( (e: any) => {
  //   console.log('%cMIXCLOUD BITCH!', 'background:purple;font-size:3rem',e)

  //   widget.load(MIXCLOUD_MIX).then(()=>widget.play())
  // }).catch((e: any) => {
  //   console.log('Errore widget', e)
  // })
}

async function onPlay() {
  // console.log("[ON PLAY] - IS PAUSED",await widget.getIsPaused())
  console.log('[ON PLAY] - CURRENT KEY', widget)
  if (!widget)
    return
  const isPlaying = await widget.getIsPaused()
  if (isPlaying) {
    widget.play()
  }
  else {
    widget.pause()
  }
}
</script>

<template>
  <main class="">
    <div class="h-[30dvh] md:h-[50dvh]  flex justify-center items-center gap-8 w-full max-w-fit">
      <div class="">
        <div class="grid w-64 aspect-square ">
          <img ref="albumCover" loading="lazy" :src="albumCoverUrl" class="bg-white/30  w-64 rounded-full spin aspect-square object-cover relative col-start-1 col-end-2 row-start-1 row-end-2 z-0" :class="{ play: isPlaying }">
          <div class="col-start-1 col-end-2 row-start-1 row-end-2 flex items-center justify-center">
            <button class="cursor-pointer" @click="onPlay">
              <Icon :name="isPlaying ? 'i-line-md-pause' : 'i-line-md-pause-to-play-filled-transition'" size="64" />
            </button>
          </div>
        </div>

        <iframe id="myplayer" width="100%" height="auto" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&hide_artwork=1&autoplay=0&feed=%2Fofficialbiro%2Fbass-cuddles%2F" frameborder="0" allow="autoplay" class="hidden" @load="initializePlayer" />
        <!-- <iframe id="myplayer" width="100%" height="auto" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2Fofficialbiro%2Fbass-cuddles%2F" frameborder="0" @load="initializePlayer"   /> -->
      </div>
      <div class="">
        <img loading="lazy" src="/logo_flat.svg" alt="logo" class="w-48 h-auto -ml-8">
        <h1 class="text-xl md:text-3xl ">
          Let's mix up the party!
        </h1>
        <button class="bg-white rounded-full px-8 py-2 text-black mt-4">
          BOOKING
        </button>
      </div>
    </div>
    <div class="py-4 max-w-none grid grid-cols-3 gap-8">
      <h2 class="text-3xl font-bold col-span-full">
        Prossime date
      </h2>
      <div v-for="event in events" :key="event.path" class="border-2 border-white p-4 rounded-lg bg-neutral-900 flex flex-col long-shadow ">
        <h3 class="uppercase text-3xl font-black flex-grow border-b-2 pb-4">
          {{ event.location }}
        </h3>
        <div class="py-4 capitalize">
          {{ formatDate(event.date) }}
        </div>
      </div>
    </div>
    <div class="prose prose-invert py-12">
      <ContentRenderer v-if="index" :value="index" :excerpt="true" />
      <ContentRenderer v-if="bio" :value="bio" :excerpt="true" />
    </div>
  </main>
</template>

<style>
.spin{
  animation: spin 10s linear 0s infinite forwards;
  animation-play-state: paused;
  &.play{
    animation-play-state: running;
  }
}

@keyframes spin {
  to{
    rotate: 360deg;
  }
}

.long-shadow{
  box-shadow:
    rgb(255,255,255) 1px 1px,
    rgb(255,255,255) 2px 2px,
    rgb(255,255,255) 3px 3px,
    rgb(255,255,255) 4px 4px,
    rgb(255,255,255) 5px 5px,
    rgb(255,255,255) 6px 6px,
    rgb(255,255,255) 7px 7px,
    rgb(255,255,255) 8px 8px,
}
</style>
