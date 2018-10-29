workflow "Lint and test" {
  on = "push"
  resolves = [
    "lint",
    "deploy",
  ]
}

action "install" {
  uses = "actions/npm@94e6933"
  args = "ci"
}

action "lint" {
  needs = ["install"]
  uses = "actions/npm@94e6933"
  args = "run lint"
}

action "deploy" {
  needs = ["install"]
  uses = "actions/zeit-now@d9a6263"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
