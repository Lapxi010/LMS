import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
	const result = await prisma.user.findMany();
	console.log(result);
	const result2 = await prisma.user.create({
		data: {
			name: 'Alice',
			email: 'de@ad.ada',
		}
	});
	console.log(result2);
}

main()
	.catch(e => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
