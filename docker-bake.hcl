group "default" {
  targets = ["app"]
}

target "builder" {
  context = "."
  dockerfile = "Dockerfile"
  target = "builder"
}

target "base" {
  context = "."
  dockerfile = "Dockerfile"
  target = "base"
}

target "app" {
  context = "."
  dockerfile = "Dockerfile"
  target = "app"
  contexts = {
    builder = "target:builder"
    base = "target:base"
  }
}
