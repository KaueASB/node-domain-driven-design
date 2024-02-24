import { Either, left, right } from './either'

function testEither(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('Success')
  } else {
    return left('Error')
  }
}

test('Success result', () => {
  const successResult = testEither(true)

  expect(successResult.isRight()).toBe(true)
  expect(successResult.isLeft()).toBe(false)
})

test('Error result', () => {
  const errorResult = testEither(false)

  expect(errorResult.isRight()).toBe(false)
  expect(errorResult.isLeft()).toBe(true)
})
