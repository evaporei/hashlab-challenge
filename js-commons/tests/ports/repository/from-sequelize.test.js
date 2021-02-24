const { createRepositoryModel, fromSequelize } = require('../../../src/ports/repository/from-sequelize')

const createFakeSequelizeModel = () => ({
  create: jest.fn().mockReturnValueOnce(Promise.resolve()),
  findOne: jest.fn().mockReturnValueOnce(Promise.resolve()),
  findAll: jest.fn().mockReturnValueOnce(Promise.resolve()),
  update: jest.fn().mockReturnValueOnce(Promise.resolve()),
  destroy: jest.fn().mockReturnValueOnce(Promise.resolve())
})

test('createRepositoryModel', () => {
  const fakeSequelizeModel = createFakeSequelizeModel()

  const repositoryModel = createRepositoryModel(fakeSequelizeModel)

  expect(repositoryModel).toEqual({
    create: expect.any(Function),
    findOne: expect.any(Function),
    findAll: expect.any(Function),
    update: expect.any(Function),
    destroy: expect.any(Function)
  })

  expect(fakeSequelizeModel.create.mock.calls).toEqual([])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([])

  repositoryModel.create(1, 2, 3)

  expect(fakeSequelizeModel.create.mock.calls).toEqual([[1, 2, 3]])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([])

  repositoryModel.findOne(4, 3, 2)

  expect(fakeSequelizeModel.create.mock.calls).toEqual([[1, 2, 3]])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([[4, 3, 2]])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([])

  repositoryModel.findAll(2, 1, 3)

  expect(fakeSequelizeModel.create.mock.calls).toEqual([[1, 2, 3]])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([[4, 3, 2]])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([[2, 1, 3]])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([])

  repositoryModel.update(9, 8, 8)

  expect(fakeSequelizeModel.create.mock.calls).toEqual([[1, 2, 3]])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([[4, 3, 2]])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([[2, 1, 3]])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([[9, 8, 8]])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([])

  repositoryModel.destroy(7, 5, 4)

  expect(fakeSequelizeModel.create.mock.calls).toEqual([[1, 2, 3]])
  expect(fakeSequelizeModel.findOne.mock.calls).toEqual([[4, 3, 2]])
  expect(fakeSequelizeModel.findAll.mock.calls).toEqual([[2, 1, 3]])
  expect(fakeSequelizeModel.update.mock.calls).toEqual([[9, 8, 8]])
  expect(fakeSequelizeModel.destroy.mock.calls).toEqual([[7, 5, 4]])
})

test('fromSequelize', () => {
  const fakeSequelize = {
    models: {
      User: createFakeSequelizeModel(),
      Message: createFakeSequelizeModel()
    }
  }

  const repository = fromSequelize(fakeSequelize)

  expect(repository).toEqual({
    User: {
      create: expect.any(Function),
      findOne: expect.any(Function),
      findAll: expect.any(Function),
      update: expect.any(Function),
      destroy: expect.any(Function)
    },
    Message: {
      create: expect.any(Function),
      findOne: expect.any(Function),
      findAll: expect.any(Function),
      update: expect.any(Function),
      destroy: expect.any(Function)
    }
  })
})
