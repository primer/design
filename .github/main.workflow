workflow "lint" {
  on = "push"
  resolves = [
    "lint"
  ]
}

action "install" {
  uses = "actions/npm@v2.0.0"
  args = "ci"
}

action "lint" {
  needs = ["install"]
  uses = "actions/npm@v2.0.0"
  args = "run lint"
}
