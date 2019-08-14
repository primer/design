workflow "lint" {
  on = "push"
  resolves = [
    "npm lint"
  ]
}

action "npm install" {
  uses = "actions/npm@v2.0.0"
  args = "ci"
}

action "npm lint" {
  needs = ["npm install"]
  uses = "actions/npm@v2.0.0"
  args = "run lint"
}
