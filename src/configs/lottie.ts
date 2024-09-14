export const lottieDefaultOptions = (animationData: JSON, loop = true, autoplay = true) => ({
  loop,
  autoplay,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
})
