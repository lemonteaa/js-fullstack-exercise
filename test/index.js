const p = require('@prisma/client');
//console.log(Prisma);
const prisma = new p.PrismaClient();

// ESM
/*
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
*/

// CommonJs
const fastify = require('fastify')({
  logger: true
})


fastify.register(require('@fastify/cors'), { 
    // put your options here
    origin: true
  })

fastify.get('/', async (request, reply) => {
  const allUsers = await prisma.smoke.findMany()
  console.log(allUsers)
  //request.params
  return { hello: 'world', foo: 42, users: allUsers }
})

fastify.get('/smokes/:id', async (request, reply) => {
    const oneUser = await prisma.smoke.findUnique({ where: {id: parseInt(request.params.id) }})
    console.log(oneUser)
    return { hello: 'world', foo: 42, user: oneUser }
  })

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ host: "0.0.0.0", port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
start()
