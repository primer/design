workflow "lint and deploy" {
  on = "push"
  resolves = [
    "lint",
    "deploy",
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

action "deploy" {
  needs = ["install"]
  uses = "primer/deploy@v2.0.0"
  secrets = [
    "GITHUB_TOKEN",
    "ZEIT_TOKEN",
  ]
}
