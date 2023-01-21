import {expect, test} from '@oclif/test'

describe('scaffold', () => {
  test
  .stdout()
  .command(['scaffold'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['scaffold', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
