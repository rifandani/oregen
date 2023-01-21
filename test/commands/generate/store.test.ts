import {expect, test} from '@oclif/test'

describe('generate:store', () => {
  test
  .stdout()
  .command(['generate:store'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['generate:store', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
