import {expect, test} from '@oclif/test'

describe('generate:hook', () => {
  test
  .stdout()
  .command(['generate:hook'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['generate:hook', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
