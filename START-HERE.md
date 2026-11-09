# Start here

You are working on **the watcher** — SB County Dispatch at <https://watcher.ai-n.org>.

Read in this order:

1. `AGENTS.md` — the rules for this repository, including who `mind` is.
2. `HANDOFF.md` — what state it is actually in today, what was just changed, and what is
   still open.

## Who `mind` is

`mind` is the supervising project for this account (`dno-luigi/mind`, live at
`mind.ai-n.workers.dev` and `ai-nspired.com`). It is not a peer repo and not a
dependency — it is the authority:

- It **inspects** production read-only: Worker bindings, secret *names*, deployment
  history, D1 counts, health payloads, live HTTP.
- It **sets standards** for the ecosystem and **may write** this repository's agent
  instruction files. Its `AGENTS.md` governs work here too; this repository's
  `AGENTS.md` only adds what is specific to the watcher.
- It does **not** own this repository's runtime. Source, deployment, data and
  enforcement stay here. `docs/MIND-AUTHORITY.md` in `mind` is the charter.

Practical consequence: `mind` has already read this project's deployed state and will
re-check anything you claim. Do not answer from memory — fetch the endpoint, read the
deployment, count the rows.

## What just happened, in one paragraph

This repository did not exist until 2026-11-09; the Worker had been deployed from the
script API since 2026-09-23, so the only copy of its source was the served bundle. Commit
`84d41f8` is that bundle byte-for-byte. Three commits sit on top: a health counter that
had reported `0 of 39` agencies on every cycle, a run-pacing defect that scheduled the
next scrape in the past, and the regression the pacing fix introduced (a shadowed helper
name that made every run fail at the end). All three are deployed. Read `HANDOFF.md`
before touching any of them — two of those bugs were *caused by* fixing the previous one,
and the reasons are written down so they are not repeated.

## Hard rules, immediately

- A push does not deploy. Deploying is a deliberate `wrangler deploy`.
- Never print, commit or paste a credential. The Worker holds none; every credential is
  a binding.
- Do not change the cron, the dedupe hash, the eight-day retention, `ALL_AGENCY_CODES`,
  or the `degraded` threshold without an explicit instruction — each changes what the
  health number *means*.
- `last_run` in the health payload describes the last *completed* run. After a deploy it
  can still describe a run from the previous isolate for a minute or three. That is not
  a fault; wait for the next run before concluding anything.
