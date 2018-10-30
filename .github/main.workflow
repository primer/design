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
  uses = "shawnbot/zeit-now@9f28e66"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "preview" {
  needs = ["deploy"]
  uses = "shawnbot/now-branch-preview@baf545c"
  secrets = ["ZEIT_TOKEN", "GITHUB_TOKEN"]
  env = {
    PREVIEW_URL_TEMPLATE = "{name}-{branch}",
  }
}
