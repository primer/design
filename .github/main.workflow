workflow "Lint and test" {
  on = "push"
  resolves = [
    "lint",
    "preview",
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

action "preview" {
  needs = ["deploy"]
  uses = "shawnbot/now-branch-preview@54ead8e"
  secrets = ["ZEIT_TOKEN", "GITHUB_TOKEN"]
  env = {
    PREVIEW_URL_TEMPLATE = "{name}-{branch}"
  }
}
