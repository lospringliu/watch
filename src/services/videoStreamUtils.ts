'use strict'

const log = (line) => {
  if (!line) return
  let message
  if (line.message) {
    message = `Error: ${line.message.toString()}`
    console.error(line)
  } else {
    message = line
  }
  if (message) {
    console.log(message)
  }
}

const statusMessages = (stream) => {
  let time = 0
  const timeouts = [
    'Stream: Still loading data from IPFS...',
    'Stream: This can take a while depending on content availability',
    'Stream: Hopefully not long now',
    'Stream: *Whistles absentmindedly*',
    'Stream: *Taps foot*',
    'Stream: *Looks at watch*',
    'Stream: *Stares at floor*',
    'Stream: *Checks phone*',
    'Stream: *Stares at ceiling*',
    'Stream: Got anything nice planned for the weekend?'
  ].map(message => {
    time += 5000
    return setTimeout(() => {
      log(message)
    }, time)
  })
  stream.once('data', () => {
    log('Stream: Started receiving data')
    timeouts.forEach(clearTimeout)
  })
  stream.once('error', () => {
    timeouts.forEach(clearTimeout)
  })
}

const createVideoElement = () => {
  const videoElement = document.getElementById('video') as HTMLVideoElement
  videoElement?.addEventListener('loadedmetadata', () => {
    videoElement.play()
      .catch(log)
  })
  const events = [
    'playing',
    'waiting',
    'seeking',
    'seeked',
    'ended',
    'loadedmetadata',
    'loadeddata',
    'canplay',
    'canplaythrough',
    'durationchange',
    'play',
    'pause',
    'suspend',
    'emptied',
    'stalled',
    'error',
    'abort'
  ]
  events.forEach(event => {
    videoElement?.addEventListener(event, () => {
      log(`Video: ${event}`)
    })
  })
  videoElement?.addEventListener('error', () => {
    log(videoElement.error)
  })
  return videoElement
}

export {
  log,
  createVideoElement,
  statusMessages
}
