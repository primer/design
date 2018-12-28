workflow "lint and deploy" {
  on = "push"
  resolves = [
    "lint",
    "deploy/alias",
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

action "deploy/alias" {
  needs = ["deploy"]
  uses = "shawnbot/now-branch-preview@9f674f6"
  secrets = ["ZEIT_TOKEN", "GITHUB_TOKEN"]
  env = {
    PREVIEW_URL_TEMPLATE = "primer-design-{branch}.now.sh"
    STATUS_CONTEXT = "deploy/preview"
  }
}
